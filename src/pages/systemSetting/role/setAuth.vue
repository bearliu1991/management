<template>
    <div class="height-full set-auth">
        <div class="table">
            <TableTitle tableTitle="角色管理 > 设置权限"></TableTitle>
            <div class="table-content">
                <div slot="top" style="margin: 5px;">当前角色: <span style="font-size: 18px; color: #169BD5;">{{currRole}}</span></div>
                <FiltersInline :ownPage="pageName" :filterItem="filterItem" ref="filters"></FiltersInline>
                <TableWrapper :ownPage="pageName" ref="tableCont" :tabledata="tabledata" :columns="columns"></TableWrapper>
            </div>
        </div>
        <div class="set-auth-btns">
            <Button size="large" type="primary" @click="save">保存</Button>
            <Button size="large" @click="goback">返回</Button>
        </div>
    </div>
</template>
<script>
import {ColumnsById} from './columns.js'
import PageConfig from './pageConfig.js'
  export default {
    name: "setRoleAuth",
    props: {
        role: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data () {
        let self = this;
        return {
            pageName: "setRoleAuth",
            urls: {
                getList: self.Path.getAuthRoleItemByRoleId,
                update: self.Path.getAuthRoleItemByRoleId
            },
            filterItem: {},
            columns: this.deepcopy(ColumnsById),
            tabledata: [],
            PageConfig: PageConfig,
            selection: [],
            currRole: null,
            roleId: null
        }
    },
    mounted() {
        BUS.$on('tablehandle', (type, param, typeofAll, pageName) => {
            if (pageName !== this.pageName) return
            this.tableHandle(type, param, typeofAll)
        })
        this.$set(this.filterItem, 'filters', this.PageConfig.filtersSetAuth);
        this.$set(this.filterItem, 'inline', true);
        this.$set(this.filterItem, 'noClearBtn', true);
    },
    activated() {
        try {
            this.currRole = this.role.roleName
            this.roleId = this.role.roleId
            if (!this.roleId) this.$router.push({name: 'role'})
            this.selection = []
            this.getTabeData();
        } catch (err) {
            console.log(err)
        }
    },
    methods: {
        // 处理表单内部的相关操作
        tableHandle(type, val, typeofAll) {
            switch (type) {
                case 'select':
                    this.selection = val
                    break;
                case 'page':
                    this.getTabeData(val)
                    break;
                default:
                    break;
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
                itemName: "itemName",
                subSystem: "subSystem",
                uri: "uri",
                itemOrder: "itemOrder",
                showInMenu: "showInMenu",
                itemPosition: "itemPosition",
                itemDesc: "itemDesc"
            }
            let data = this._transformData(item, _rules, reverse, 'null')
            return data
        },
        save() {
            let param = {
                roleId: this.roleId,
                itemIds: this.selection.map(item => item.itemId)
            }
            this.$post(this.urls.update, param).then(res => {
                if (res.code === 1) {
                    this.$Message.info({
                        content: "保存成功",
                        duration: 3
                    })
                    this.$router.push({name: 'role'})
                } else {
                    this.$Message.error({
                        content: "保存失败",
                        duration: 3
                    })
                }
            })
        },
        goback() {
            this.$router.push({name: 'role'})
        }
    }
}
</script>
<style lang="stylus">
.set-auth
    position relative
    width 100%
    .table .table-content
        padding-bottom 160px
    .set-auth-btns
        position absolute
        width 100%
        bottom 60px
        text-align: center
        button
            width 100px
            margin 0 10px
</style>
