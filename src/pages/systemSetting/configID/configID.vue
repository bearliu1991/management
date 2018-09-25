as<template>
    <div>
        <filterTable
            ref='filtertable'
            tableTitle="身份定义"
            btnName="创建身份"
            :columns = 'columns'
            :filterItem= 'filterItem'
            :urls = 'urls'
            :data = 'tabledata'
            :handleAlltypes= handleAlltypes
            @tableHandle = "tableHandle"
            ></filterTable>
        <Modalfrom ref="modal"
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
  export default {
    name: "roleSetting",
    components: {
        filterTable,
        Modalfrom: () => import('@/components/syscomponents/modalValidateForm.vue'),
        Modalpopup: () => import('@/components/syscomponents/popupModal.vue')
    },
    data () {
        let self = this;
        return {
            urls: {
                getList: self.Path.queryIdentityByPager,
                getItem: self.Path.queryTIdentity,
                add: self.Path.addTIdentity,
                update: self.Path.updateTIdentity,
                delete: self.Path.deleteTIdentity
            },
            filterItem: {},
            columns: Columns,
            tabledata: [],
            information: {},
            modalTitle: '',
            modalType: '',
            PageConfig: PageConfig,
            formItems: [],
            handleAlltypes:[],
            modifyAllForm:{
                sensitiveIds:[],
                sensitiveUses: []
            },
            modifyItemForm:{}
        }
    },
    mounted () {
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
        addnew (val) {
            //  添加新条目-1-打开弹窗
             this.setModal({
                visible: true,
                title: '新建',
                type: 'add' });
        },
        submitNewData (param) {
            //  添加新条目-2-确认提交
            this.$post(this.urls.add, param).then(res => {
                this.setModal()
                this.getTabeData();
            })
        },
        // 查看当前条目信息
        show (args) {
            //  查看当前条目信息-1-获取当信息
            this.$post(this.urls.getItem, {
                identityCode: args.row.identityCode
            }).then(res => {
                this.openPopup(res.data)
            })
        },
        openPopup (param) {
            //  查看当前条目信息-2-弹窗显示
            let data = param;
            data.subSystem = this.filterSubSystem(data.subSystem);
            data.busiType = 'MGR';
            let extraItems = [
                {
                    label: '身份代码',
                    prop: 'identityCode'
                },
                {
                    label: '身份图标',
                    prop: 'identityPicId'
                },
                {
                    label: '身份描述',
                    prop: 'dentityDesc'
                }
            ];
            this.setModal({
                visible: true,
                title: '详细信息',
                type: 'popup',
                data: data,
                extItems: extraItems });
        },
        // 删除当前条目
        delete (args) {
            // 删除当前条目
            this.$post(this.urls.delete, {
                identityCode: args.row.identityCode
            }).then(res => {
                this.getTabeData();
            })
        },
        //  单行修改
        modify (param) {
            let data = param.row;
            this.setModal({
                visible: true,
                title: '修改',
                type: 'updatep',
                data: data });
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
