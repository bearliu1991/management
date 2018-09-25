<template>
    <div class="height-full">
        <div class="table">
            <TableTitle :tableTitle="tableTitle"></TableTitle>
            <div class="table-content">
                <FiltersInline :ownPage="pageName" right :filterItem="filterItem" :configBtns="['添加数据字典']"></FiltersInline>
                <div class="operations" >
                    <OperateLeft :ownPage="pageName" :handleAlltypes="handleAlltypes"></OperateLeft>
                </div>
                <TableWrapper :ownPage="pageName" :actionItems="actionItems" :tabledata="tabledata" :columns="columns"></TableWrapper>
            </div>
        </div>
        
        <Modalfrom ref="modal"
        :formItems= "formItems"
        @success= "submitData"
        :title= "modalTitle"
        :type= "modalType"></Modalfrom>
        <Confirm ref="confirm" @success="submitData"></Confirm>
    </div>
</template>
<script>
import Columns from './columns.js'
import PageConfig from './pageConfig.js'
  export default {
    name: "libTable",
    components: {
        Modalfrom: () => import('@/components/syscomponents/modalValidateForm.vue')
    },
    data () {
        let self = this;
        return {
            pageName: "libtable",
            tableTitle: '没有选中字典',
            currLib: null,
            urls: {
                getList: self.Path.queryTItemValueByPager,
                getItem: self.Path.queryTItemValue,
                add: self.Path.addTItemValue,
                update: self.Path.updateTItemValue,
                delete: self.Path.deleteTItemValue
            },
            filterItem: {},
            columns: this.deepcopy(Columns),
            PageConfig: this.deepcopy(PageConfig),
            tabledata: [],
            actionItems: ['modify','delete'],
            formValidate: {},
            formItems: [],
            modalTitle: '',
            modalType: '',
            handleAlltypes: ['批量删除']
        }
    },
    mounted() {
        BUS.$on('tablehandle', (type, param, subType, pageName) => {
            if (pageName !== this.pageName) return
            this.tableHandle(type, param, subType)
        })
        BUS.$on('dataLibTree', (param) => {
            this.currLib = param
            this.tableTitle = param.title
            this.getTabeData()
        })
        this.getTabeData()
        this.$set(this.filterItem, 'filters', this.PageConfig.filters)
    },
    methods: {
        tableHandle (type, val, subType) {
            if (!this.currLib) {
                this.$Message.success({
                        content: '选择字典！',
                        duration: 3
                    });
                return
            }
            switch (type) {
                case 'page':
                    this.getTabeData(val);
                    break;
                case 'all':
                    // this.delete([val.row], true)
                    break;
                case 'config':
                       this.add(val, true)
                    break;
                case 'modify':
                    this.modify([val.row], true)
                    break;
                case 'delete':
                    this.delete([val.row], true)
                    break;
            }
        },
        submitData (param, type) {
            switch (type) {
                case 'delete':
                    this.delete(param)
                    break;
                case 'add':
                    this.add(param);
                    break;
                case 'modify':
                    this.modify(param);
                    break;
                case 'addAuthSuccess':
                    this.getTabeData()
                    break;
            }
        },            
        add(param, confirm) {
            if (confirm) {
                let title = '添加数据字典';
                this.setModalOpen({
                    visible: true,
                    title: title,
                    type: 'add',
                    initFormItems: this.PageConfig.formItems
                    });
            } else {
                val.menuName = val.title
                delete val.title
                delete val.menuId
                this.$post(this.urls.add, val).then(res => {
                    this.setModalOpen();
                    this.getTabeData();
                })
            }
        },
        modify(param, confirm) {
            if (confirm) {
                let title = '修改数据字典';
                this.setModalOpen({
                    visible: true,
                    title: title,
                    type: 'modify',
                    initFormItems: this.PageConfig.formItems
                    });
            } else {
                val.menuName = val.title
                delete val.title
                delete val.menuId
                this.$post(this.urls.add, val).then(res => {
                    this.setModalOpen();
                    this.getTabeData();
                })
            }
        },
        delete(param, confirm) {
            let _data = param.map(item => item.itemId);
            if (confirm) {
                this.confirm({
                    visible: true,
                    type: 'delete',
                    html: '<p>删除后，所有用户无法进入该企业管理后台，无法继续服务该企业下的所有公众号。</p>',
                    data: _data
                })
            } else {
                val.menuName = val.title
                debugger
                delete val.title
                delete val.menuId
                this.$post(this.urls.delete, val).then(res => {
                    this.setModalOpen();
                    this.getTabeData();
                })
            }
        },
        getTabeData (arg) {
            //  获取列表
            let api = this.urls.getList
            let param = {
                offset: 0,
                limit: 10
            }
            let self = this
            if (!api) return
            if (arg) {
                Object.assign(param, arg)
            }
            this.$post(api, param).then(res => {
                try {
                    self.tabledata = self.transformData(res.data.records)
                } catch (err) {
                    self.tabledata = []
                    console.log(err)
                }
                //  子组件
                BUS.$emit('changePagenation', {
                    isLoading: false,
                    pageTotal: res.data.totalCount,
                    currPage: parseInt(res.data.offset / res.data.limit) + 1,
                    pageSize: res.data.limit
                }, this.pageName)
            })
        },
        transformData(item, reverse, rules) {
            let _rules = rules || {
                itemValue: 'itemValue',
                itemKey: 'itemKey',
                itemPv: 'itemPv',
                itemName: 'itemName',
                itemIdx: 'itemIdx',
                itemJson: 'itemJson',
                itemHtml: 'itemHtml'
            }
            let data = this._transformData(item, _rules, reverse, 'null')
            return data
        }
    }
}
</script>
<style lang="stylus">
    a.company-item-link
        color: #333
        &:hover
            text-decoration underline
</style>
