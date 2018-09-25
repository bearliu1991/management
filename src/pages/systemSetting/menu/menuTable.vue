<template>
    <div class="height-full">
        <div class="table-no-title">
            <div class="table-content">
                <FiltersInline :ownPage="pageName" right :filterItem="filterItem" :configBtns="['添加权限', '创建新权限']"></FiltersInline>
                <div class="operations" >
                    <OperateLeft :ownPage="pageName" :handleAlltypes="handleAlltypes"></OperateLeft>
                </div>
                <TableWrapper :ownPage="pageName" :actionItems="actionItems" :tabledata="tabledata" :columns="columns"></TableWrapper>
            </div>
        </div>
        <AddExistAuth ref="existAuth" :menuId="menuId" @success="submitData" type="addAuthSuccess"></AddExistAuth>
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
import AddExistAuth from './addExistAuth.vue'
  export default {
    name: "menuTable",
    components: {
        AddExistAuth,
        Modalfrom: () => import('@/components/syscomponents/modalValidateForm.vue')
    },
    data () {
        let self = this;
        return {
            pageName: "menuTable",
            menuId: null,
            urls: {
                getList: self.Path.getAuthMenuItemByMenuId,
                add: self.Path.saveMenuAuthItem,
                update: self.Path.saveOrUpdateAuthMenu,
                delete: self.Path.deleteAuthMenuItem
            },
            filterItem: {},
            columns: this.deepcopy(Columns),
            PageConfig: this.deepcopy(PageConfig),
            tabledata: [],
            actionItems: ['delete'],
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
        BUS.$on('treeNodeId', (menuId) => {
            this.menuId = menuId
            this.getTabeData()
        })
        this.$set(this.filterItem, 'filters', this.PageConfig.filtersTable);
    },
    methods: {
        tableHandle (type, val, subType) {
            if (!this.menuId) {
                this.$Message.success({
                        content: '选择菜单！',
                        duration: 3
                    });
                return
            }
            switch (type) {
                case 'page':
                    this.getTabeData(val);
                    break;
                case 'all':
                    this.deleteConfirm(val)
                    break;
                case 'config':
                    if (subType === 0) {
                        this.$refs['existAuth'].modal = true
                    } else if (subType === 1) {
                        this.add()
                    }
                    break;
                case 'delete':
                    this.deleteConfirm([val.row])
                    break;
            }
        },
        submitData (param, type) {
            switch (type) {
                case 'delete':
                    this.delete(param)
                    break;
                case 'add':
                    this.addAuth(param);
                    break;
                case 'addAuthSuccess':
                    this.getTabeData()
                    break;
            }
        },
        add() {
            this.setModal({
                visible: true,
                title: '创建新权限',
                type: 'add',
                initFormItems: this.PageConfig.formItemsAuth
            });
        },
        addAuth(arg) {
            let param = arg
            param.menuId = this.menuId
            this.$post(this.urls.add, param).then(res => {
                if (res.code === 1) {
                    this.$Message.success({
                        content: '添加成功！',
                        duration: 3
                    });
                    this.setModal()
                    this.getTabeData();
                }
            }).catch(err => {
                this.$Message.error({
                    content: '添加失败！',
                    duration: 3
                })
                console.log(err)
            })
        },
        deleteConfirm(param) {
            let _data = param.map(item => item.itemId);
            this.confirm({
                visible: true,
                type: 'delete',
                html: '<p>删除后，所有用户无法进入该企业管理后台，无法继续服务该企业下的所有公众号。</p>',
                data: _data
            });
        },
        delete (data) {
            let param = {
                itemIds: data,
                menuId: this.menuId
            }
            this.$post(this.urls.delete, param).then(res => {
                if (res.code === 1) {
                    this.$Message.success({
                        content: '删除成功！',
                        duration: 3
                    });
                    this.confirm()
                    this.getTabeData();
                }
            }).catch(() => {
                this.$Message.error({
                    content: '删除失败！',
                    duration: 3
                });
            })
        },
        getTabeData (arg) {
            //  获取列表
            let api = this.urls.getList
            let param = {
                offset: 0,
                limit: 10,
                menuId: this.menuId
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
<style lang="stylus">
    a.company-item-link
        color: #333
        &:hover
            text-decoration underline
</style>
