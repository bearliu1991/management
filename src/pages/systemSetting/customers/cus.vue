<template>
    <div>
        <filterTable
            ref='filtertable'
            tableTitle="客户管理"
            btnName="创建客户"
            :columns = 'columns'
            :filterItem= 'filterItem'
            :urls = 'urls'
            :data = 'tabledata'
            :handleAlltypes= handleAlltypes
            :actionItems = "['show', 'modify', 'modify_1', 'delete']"
            @tableHandle = "tableHandle"
            ></filterTable>
    </div>
</template>
<script>
import Columns from './columns.js'
import PageConfig from './pageConfig.js'
import filterTable from '@/components/syscomponents/filterTable.vue'
  export default {
    name: "customer",
    components: {
        filterTable,
        Modalfrom: () => import('@/components/syscomponents/modalValidateForm.vue'),
        Modalpopup: () => import('@/components/syscomponents/popupModal.vue')
    },
    data () {
        let self = this;
        return {
            urls: {
                getList: self.Path.getCustomerListByPage,
                getItem: self.Path.selectCustomerInfo,
                add: self.Path.saveCustomer,
                update: self.Path.updateCustomerStatus,
                updataRemarkr: self.Path.updateCustomerRemarkr,
                delete: self.Path.deleteCustomer
            },
            filterItem: {},
            columns: Columns,
            tabledata: [],
            information: {},
            formValidate: {},
            modifyItemForm:{},
            handleAlltypes:[]
        }
    },
    mounted () {
        setTimeout(() => {
            this.$set(this.filterItem, 'keywords', PageConfig.keywords);
            this.$set(this.filterItem, 'selctors', PageConfig.selctors);
            this.getTabeData();
        }, 1000);
        // Promise.all([promise1, promise2, promise3]).then((values) => {
        //    this.$set(this.filterItem, 'selctors', val)
        //    this.opitons
        //    this.getTabeData();
        // });
    },
    methods: {
        // 处理表单内部的相关操作
        tableHandle(type, val, typeKind) {
            switch (type) {
                case 'all':
                    this.modifyAll(typeKind, val)
                    break;
                case 'add':
                    this.addnew(val)
                    break;
                case 'show':
                    this.show(val)
                    break;
                case 'modify':
                    this.modify(typeKind, val)
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
        // 添加新条目
        addnew (val) {
            // 添加新条目-1-打开弹窗
            // this.$refs['addnew'].modal = true;
            this.$router.push({name: 'saveCustomer', params: {id: 123, api: this.urls.add, title: '新建'}})
        },
        submitNewData (val) {
            // 添加新条目-2-确认提交
            console.log(val)
            this.$post(this.urls.add, val).then(res => {
                this.$refs['addnew'].modal = false;
                this.getTabeData();
            })
        },
        // 查看当前条目信息
        show (args) {
            // 查看当前条目信息-1-获取当信息
            this.$post(this.urls.getItem, {
                itemKey: args.row.itemKey,
                itemValue: args.row.itemValue
            }).then(res => {
                this.openPopup(res.data)
            })
        },
        openPopup (params) {
            // 查看当前条目信息-2-弹窗显示
            this.$refs['popup'].popup = true;
            this.information = params
        },
        // 删除当前条目
        delete (args) {
            // 删除当前条目
            this.$post(this.urls.delete, {
                id: args.row.id
            }).then(res => {
                this.getTabeData();
            })
        },
        // 单行修改
        modify (type, args) {
            // this.$refs['modify'].modal = true;
            let params = {}
            if (type === 0) {
                params = {id: args.row.id, api: this.urls.update, title: '修改'}
            } else if ((type === 1)) {
                params = {id: args.row.id, api: this.urls.updataRemarkr, title: '修改1'}
            }
            this.$router.push({name: 'saveCustomer', params: params})
        },
        modifyAll (type, params) {
            // 多行修改-1-打开弹窗
            if (params.length <= 0) {
                this.$Message.info('请选择要修改的行')
                return
            }
            switch (type) {
                // 具体情况根据当前页面情况而定
                case '0':
                    this.$refs['modifyAll'].modal = true
                    // do something
                    break;
                default:
                    break;
            }
        },
        // 修改后相关的提交处理，具体情况根据当前页面情况而定
        updateModify () {
            this.$post(this.urls.update, this.modifyItemForm).then(res => {
                if (res.code === 1) {
                    this.$refs['modify'].modal = false;
                    this.getTabeData();
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getTabeData () {
            // 获取列表
            let api = this.urls.getList;
            if (!api) return;
            let child = this.$refs['filtertable'];
            child.isLoading = true
            let param = child.getParams();
            this.$post(api, param).then(res => {
                this.tabledata = res.data.records ? res.data.records : [];
                // 子组件
                child.isLoading = false
                child.pageTotal = res.data.totalCount;
                child.currPage = parseInt(res.data.offset / res.data.limit) + 1;
                child.pageSize = res.data.limit;
            })
        }
    }
}
</script>
