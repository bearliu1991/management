<template>
    <div class="height-full">
        <div class="table">
            <TableTitle tableTitle="权限管理"></TableTitle>
            <div class="table-content">
                <FiltersInline :ownPage="pageName" :filterItem="filterItem" ref="filters" :configBtns="['创建新权限']"></FiltersInline>
                <div class="operations" >
                    <OperateLeft :ownPage="pageName" ref="operateLeft" :handleAlltypes="['批量删除']"></OperateLeft>
                </div>
                <TableWrapper :ownPage="pageName" ref="tableCont" :actionItems="actionItems" :tabledata="tabledata" :columns="columns"></TableWrapper>
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
    name: "authSetting",
    components: {
        Modalfrom: () => import('@/components/syscomponents/modalValidateForm.vue')
    },
    data () {
        let self = this;
        return {
            pageName: 'authSetting',
            urls: {
                getList: self.Path.queryAuthItem,
                add: self.Path.saveOrUpdateAuthItem,
                update: self.Path.saveOrUpdateAuthItem,
                delete: self.Path.deleteAuthItemList
            },
            actionItems: [
                { title: '编辑', type: 'modify' },
                'delete'
            ],
            filterItem: {},
            columns: Columns,
            tabledata: [],
            PageConfig: PageConfig,
            formItems: [],
            modalTitle: '',
            modalType: ''
        }
    },
    mounted () {
        BUS.$on('tablehandle', (type, param, typeofAll) => {
            this.tableHandle(type, param, typeofAll)
        })
        this.$set(this.filterItem, 'filters', this.PageConfig.filters);
        this.$set(this.filterItem, 'inline', true);
        this.$set(this.filterItem, 'noClearBtn', true);
        this.getTabeData();
    },
    methods: {
        // 处理表单内部的相关操作
        tableHandle(type, val, subType) {
            switch (type) {
                case 'all':
                    this.modifyAll(subType, val)
                    break;
                case 'config':
                    this.addnew(val)
                    break;
                case 'modify':
                    this.modify(val)
                    break;
                case 'delete':
                    let data = [val.row]
                    this.confirm({
                        visible: true,
                        type: 'delete',
                        html: '<p>确定删除吗？</p>',
                        data: data
                    });
                    break;
                case 'page':
                    this.getTabeData(val)
                    break;
            }
        },
        submitData (param, type) {
            switch (type) {
                case 'delete':
                    this.delete(param)
                    break;
                case 'add':
                    this.submitNewAuth(param)
                    break;
                case 'modify':
                    this.submitNewAuth(param)
                    break;
            }
        },
        // 添加新条目
        addnew (val) {
            // 添加新条目-1-打开弹窗
            this.setModal({
                visible: true,
                title: '创建新权限',
                type: 'add'});
        },
        submitNewAuth (val) {
            // 添加新条目-2-确认提交
            this.$post(this.urls.add, val).then(res => {
                this.setModal();
                this.getTabeData();
            })
        },
        // 删除当前条目
        delete (args) {
            // 删除当前条目
            let itemIds = args.map(item => item.itemId)
            this.$post(this.urls.delete, {
                itemIds: itemIds
            }).then(res => {
                this.confirm();
                this.getTabeData();
            })
        },
        // 单行修改
        modify (args) {
            let data = args.row;
            data.subSystem = this.subSystem(data.subSystem)
            this.setModal({
                visible: true,
                title: '修改权限',
                type: 'modify',
                data: data});
        },
        // 多行修改
        modifyAll (type, params) {
            // 多行修改-1-打开弹窗
            if (params.length <= 0) {
                this.$Message.info('请选择要修改的行')
                return
            }
            switch (type) {
                // 具体情况根据当前页面情况而定
                case 0:
                    this.confirm({
                        visible: true,
                        type: 'delete',
                        html: '<p>确定删除吗？</p>',
                        data: params
                    });
                    break;
            }
        },
        // 修改后相关的提交处理，具体情况根据当前页面情况而定
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
        subSystem(value) {
            if (value === 1) return 'PC_WEB_CHAT'
            if (value === 2) return 'PC_DESKTOP_CHAT'
            if (value === 3) return 'PC_WEB_ADMIN'
            if (value === 4) return 'PC_WEB_MANAGE'
            if (value === 5) return 'IOS'
            if (value === 6) return 'ANDROID'
        },
        transformData(item, reverse, rules) {
            let _rules = rules || {
                itemId: "itemId",
                itemName: "itemName",
                uri: "uri",
                subSystem: "subSystem",
                itemDesc: "itemDesc",
                showUri: "showUri",
                showInMenu: "showInMenu",
                itemOrder: "itemOrder",
                itemPosition: "itemPosition"
            }
            let data = this._transformData(item, _rules, reverse, 'null')
            return data
        }
    }
}
</script>
