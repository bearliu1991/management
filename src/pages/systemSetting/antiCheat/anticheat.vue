<template>
    <div>
        <filterTable
            ref='filtertable'
            tableTitle="防作弊刷票"
            btnName="防作弊刷票"
            :columns = 'columns'
            :filterItem= 'filterItem'
            :urls = 'urls'
            :data = 'tabledata'
            :handleAlltypes= handleAlltypes
            @tableHandle = "tableHandle"
            ></filterTable>
        <Modalfrom ref="modal"
        :labelWidth= "120"
        :formItems= "formItems"
        @success= "submitData"
        :title= "modalTitle"
        :type= "modalType"></Modalfrom>
    </div>
</template>
<script>
import Columns from './columns.js'
import PageConfig from './pageConfig.js'
import filterTable from '@/components/syscomponents/filterTable.vue'
import Modalfrom from '@/components/syscomponents/modalValidateForm.vue'
  export default {
    name: "roleSetting",
    components: {
        filterTable,
        Modalfrom,
        Modalpopup: () => import('@/components/syscomponents/popupModal.vue')
    },
    data () {
        let self = this;
        return {
            urls: {
                getList: self.Path.queryAntiCheatCfgByPager,
                add: self.Path.addAntiCheatCfg,
                update: self.Path.modAntiCheatCfg,
                delete: self.Path.delAntiCheatCfg,
                getItem: self.Path.queryAntiCheatCfg
            },
            filterItem: {},
            columns: Columns,
            tabledata: [],
            information: {},
            handleAlltypes: [],
            PageConfig: PageConfig,
            formItems: [],
            modalTitle: '',
            modalType: ''
        }
    },
    mounted() {
        setTimeout(() => {
            this.$set(this.filterItem, 'keywords', this.PageConfig.keywords);
            this.$set(this.filterItem, 'selctors', this.PageConfig.selctors);
            this.getTabeData();
        }, 1000);
        // Promise.all([promise1, promise2, promise3]).then((values) => {
        //    this.$set(this.filterItem, 'selctors', val)
        //    this.opitons
        //    this.getTabeData();
        // });
    },
    methods: {
        //  处理表单内部的相关操作
        tableHandle (type, val, typeofAll) {
            switch (type) {
                case 'all':
                    this.modifyAll(typeofAll, val)
                    break;
                case 'add':
                    this.addnew(val)
                    break;
                case 'show':
                    this.show(val)
                    break;
                case 'modify':
                    this.modify(val)
                    break;
                case 'delete':
                    this.delete(val)
                    break;
                case 'page':
                    this.getTabeData()
                    break;
                case 'config':
                    this.openConfigModal(val)
                    break;
                default:
                    break;
            }
        },
        submitData (param, type) {
            switch (type) {
                case 'add':
                    this.submitNewData(param)
                    break;
                case 'update':
                    this.updateModify(param)
                    break;
            }
        },
        //  添加新条目
        addnew (val) {
            this.setModal({
                visible: true,
                title: '新建',
                type: 'add'});
        },
        submitNewData (param) {
            //  添加新条目-2-确认提交
            this.$post(this.urls.add, param).then(res => {
                this.setModal()
                this.getTabeData();
            })
        },
        show (args) {
            //  查看当前条目信息-1-获取当信息
            this.$post(this.urls.getItem, {
                limitSn: args.row.limitSn
            }).then(res => {
                this.openPopup(res.data)
            })
        },
        openPopup (param) {
            //  查看当前条目信息-2-弹窗显示
            param.cheatType = this.filters(param.cheatType)
            param.cheatCycleType = this.filters(param.cheatCycleType)
            this.setModal({
                visible: true,
                title: '详情信息',
                type: 'popup',
                data: param});
        },
        // 删除当前条目
        delete(args) {
            // 删除当前条目
            this.$post(this.urls.delete, {
                limitSn: args.row.limitSn
            }).then(res => {
                this.getTabeData();
            })
        },
        //  单行修改
        modify(param) {
             let data = param.row;
            this.setModal({
                visible: true,
                title: '修改',
                type: 'update',
                data: data});
        },
        //  多行修改
        modifyAll (type, params) {
            console.log(type, params)
            //  多行修改-1-打开弹窗
            if (params.length <= 0) {
                this.$Message.info('请选择要修改的行')
                return
            }
            switch (type) {
                //   具体情况根据当前页面情况而定
                case 0:
                    this.modifyAllForm.sensitiveIds = params.map(item => item.sensitiveId)
                    this.$refs['modifyAll'].modal = true
                    //  do something
                    break;
                default:
                    break;
            }
        },
        //  修改后相关的提交处理，具体情况根据当前页面情况而定
        updateModify (param) {
            this.$post(this.urls.update, param).then(res => {
                if (res.code === 1) {
                    this.setModal();
                    this.getTabeData();
                }
            }).catch(err => {
                console.log(err)
            })
        },
        updateModifyAll (params) {
            this.$post(this.urls.update, {
                sensitiveIds: params.sensitiveIds,
                sensitiveUses: params.sensitiveUses
            }).then(res => {
                this.$Message.info('修改成功！');
                this.$refs['modifyAll'].modal = false
                this.getTabeData();
            })
        },
        openConfigModal(val) {
            this.setModal({
                visible: true,
                title: '选择配置SN',
                type: 'getConfig',
                newFormItems: true,
                extItems: [
                    { label: '配置SN', prop: 'limitSn' }
                ]});
        },
        filters(value) {
            let text = null
            if (value === 'DAY') text = "日";
            if (value === 'WEEK') text = "周";
            if (value === 'MONTH') text = "月";
            if (value === 'IP') text = "设备号码(IP)";
            if (value === 'MAC') text = "设备号码(MAC)";
            if (value === 'ACCOUNT') text = "用户号";
            return text
        },
        getTabeData () {
            //  获取列表
            let api = this.urls.getList;
            if (!api) return;
            let child = this.$refs['filtertable'];
            child.isLoading = true
            let param = child.getParams();
            this.$post(api, param).then(res => {
                this.tabledata = res.data.records ? res.data.records : [];
                //  子组件
                child.isLoading = false
                child.pageTotal = res.data.totalCount;
                child.currPage = parseInt(res.data.offset / res.data.limit) + 1;
                child.pageSize = res.data.limit;
            })
        }
    }
}
</script>
