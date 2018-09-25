<template>
    <div class="height-full">
        <div class="table">
            <TableTitle tableTitle="角色管理"></TableTitle>
            <div class="table-content">
                <FiltersInline :ownPage="pageName" :filterItem="filterItem" ref="filters" :configBtns="['添加角色']"></FiltersInline>
                <div class="operations" >
                    <OperateLeft :ownPage="pageName" ref="operateLeft" :handleAlltypes="['批量删除', '批量禁用']"></OperateLeft>
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
import {Columns} from './columns.js'
import PageConfig from './pageConfig.js'
  export default {
    name: "role",
    components: {
        Modalfrom: () => import('@/components/syscomponents/modalValidateForm.vue')
    },
    data () {
        let self = this;
        return {
            pageName: "role",
            urls: {
                getList: self.Path.queryAuthRole,
                getItem: self.Path.getAuthRoleItemByRoleId,
                add: self.Path.saveOrUpdateAuthRole,
                update: self.Path.saveOrUpdateAuthRole,
                delete: self.Path.deleteAuthRoleByList,
                disable: self.Path.updateAuthRoleStatusByList
            },
            filterItem: {},
            actionItems: [
                { title: '设置权限', type: 'setAuth' },
                'modify',
                { title: '启用', type: 'active', key: 'isEnabled', options: [0] },
                { title: '禁用', type: 'disable', key: 'isEnabled', options: [1] },
                'delete'
            ],
            columns: this.deepcopy(Columns),
            tabledata: [],
            dataById:[],
            PageConfig: PageConfig,
            formItems: [],
            modalTitle: '',
            modalType: ''
        }
    },
    mounted() {
        BUS.$on('tablehandle', (type, param, typeofAll, pageName) => {
            if (pageName !== this.pageName) return
            this.tableHandle(type, param, typeofAll)
        })
        setTimeout(() => {
            this.$set(this.filterItem, 'filters', this.PageConfig.filters);
            this.$set(this.filterItem, 'inline', true);
            this.$set(this.filterItem, 'noClearBtn', true);
            this.getTabeData();
        }, 1000);
    },
    methods: {
        // 处理表单内部的相关操作
        tableHandle(type, val, typeofAll) {
            switch (type) {
                case 'page':
                    this.getTabeData(val)
                    break;
                case 'all':
                    this.modifyAll(typeofAll, val)
                    break;
                case 'config':
                    this.addnew(val)
                    break;
                case 'modify':
                    this.modify(val)
                    break;
                case 'delete':
                    this.confirm({
                        visible: true,
                        html: '<p>删除后，所有用户无法进入该企业管理后台，无法继续服务该企业下的所有公众号。</p>',
                        type: 'delete',
                        data: [val.row]
                    });
                    break;
                case 'setAuth':
                    this.$router.push({name: 'setAuth', params: {role: val.row}})
                    break;
                case 'disable':
                    this.confirm({
                        visible: true,
                        html: '<p>禁用后，所有用户无法进入该企业管理后台，无法继续服务该企业下的所有公众号。</p>',
                        type: 'disable',
                        data: [val.row]
                    });
                    break;
                case 'active':
                    this.active(val)
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
                case 'delete':
                    this.delete(param)
                    break;
                case 'disable':
                    this.disable(param)
                    break;
            }
        },
        addnew (val) {
            // 添加新条目-1-打开弹窗
            this.setModal({
                visible: true,
                title: '添加角色',
                type: 'add'});
        },
        submitNewData (val) {
            // 添加新条目-2-确认提交
            this.$post(this.urls.add, val).then(res => {
                this.setModal();
                this.getTabeData();
            })
        },
        delete (args) {
            this.$post(this.urls.delete, {
                roleIds: args.map(item => item.roleId)
            }).then(res => {
                this.confirm();
                this.getTabeData();
            })
        },
        disable(args) {
            this.$post(this.urls.disable, {
                roleIds: args.map(item => item.roleId)
            }).then(res => {
                this.confirm()
                this.getTabeData();
            })
        },
        active(args) {
            let data = args.row;
            data.subSystem = this.subSystem(data.subSystem)
            data.isEnabled = 1
            this.updateModify(data)
        },
        // 单行修改
        modify (args) {
            let data = args.row;
            data.subSystem = this.subSystem(data.subSystem)
            this.setModal({
                visible: true,
                title: '修改',
                type: 'update',
                data: data});
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
        // 多行修改
        modifyAll (type, params) {
            let confirmType = '';
            let pragh = '';
            if (params.length <= 0) {
                this.$Message.info('请选择要修改的行')
                return
            }
            switch (type) {
                case 0:
                    confirmType = 'delete';
                    pragh = '<p>删除后，所有用户无法进入该企业管理后台，无法继续服务该企业下的所有公众号。</p>'
                    break;
                case 1:
                    confirmType = 'disable';
                    pragh = '<p>禁用后，所有用户无法进入该企业管理后台，无法继续服务该企业下的所有公众号。</p>'
                    break;
                default:
                    break;
            }
            this.confirm({
                visible: true,
                html: pragh,
                type: confirmType,
                data: params
            });
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
                authRoleOrder: "authRoleOrder",
                busiType: "busiType",
                createId: "createId",
                createTime: "createTime",
                groupName: "groupName",
                isEnabled: "isEnabled",
                roleDesc: "roleDesc",
                roleId: "roleId",
                roleName: "roleName",
                subSystem: "subSystem",
                updateId: "updateId",
                updateTime: "updateTime"
            }
            let data = this._transformData(item, _rules, reverse, 'null')
            return data
        },
        subSystem(value) {
            if (value === 1) return 'PC_WEB_CHAT'
            if (value === 2) return 'PC_DESKTOP_CHAT'
            if (value === 3) return 'PC_WEB_ADMIN'
            if (value === 4) return 'PC_WEB_MANAGE'
            if (value === 5) return 'IOS'
            if (value === 6) return 'ANDROID'
        },
        busiType(value) {
            if (value === 0) return 'MGR'
        }
    }
}
</script>
<style lang="stylus">
</style>
