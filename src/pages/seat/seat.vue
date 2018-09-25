<template>
    <div>
        <div class="table">
            <TableTitle tableTitle="企业管理"></TableTitle>
            <div class="table-content">
                <FiltersCollapse :ownPage="pageName" :filterItem="filterItem" ref="filters"></FiltersCollapse>
                <div class="operations" >
                    <OperateLeft :ownPage="pageName" ref="operateLeft" :handleAlltypes="handleAlltypes"></OperateLeft>
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
    name: "seat",
    components: {
        Modalfrom: () => import('@/components/syscomponents/modalValidateForm.vue')
    },
    data () {
        let self = this;
        return {
            pageName: "seat",
            urls: {
                getList: self.Path.selectSeatByPagerOperate,
                getItem: self.Path.getSeatDetailByOperation,
                add: self.Path.saveOrUpdateAuthRole,
                update: self.Path.updateSeatListStatusByOperation,
                delete: self.Path.deleteAuthRoleByList,
                disable: self.Path.updateAuthRoleStatusByList
            },
            filterItem: {},
            actionItems: [
                'show',
                { title: '启用', type: 'active', key: 'seatStatus', options: [1] },
                { title: '停用', type: 'disable', key: 'seatStatus', options: [0] },
                { title: '禁用', type: 'forbidden' }
            ],
            handleAlltypes: ["批量启用", "批量禁用"],
            columns: this.deepcopy(Columns),
            tabledata: [],
            dataById:[],
            PageConfig: this.deepcopy(PageConfig),
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
        this.$set(this.filterItem, 'filters', this.PageConfig.filters);
        this.getTabeData();
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
                case 'show':
                    this.$router.push({name: 'seatinfo', params: val.row})
                    break;
                case 'delete':
                    this.confirm({
                        visible: true,
                        html: '<p>删除后，所有用户无法进入该企业管理后台，无法继续服务该企业下的所有公众号。</p>',
                        type: 'delete',
                        data: [val.row]
                    });
                    break;
                case 'disable':
                    this.confirm({
                        visible: true,
                        html: '<p>禁用后，所有用户无法进入该企业管理后台，无法继续服务该企业下的所有公众号。</p>',
                        type: 'disable',
                        data: [val.row]
                    });
                    break;
                case 'forbidden':
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
        copyAuth(val) {
            this.$Message.info('复制成功')
        },
        submitNewData (val) {
            // 添加新条目-2-确认提交
            this.$post(this.urls.add, val).then(res => {
                this.setModal();
                this.getTabeData();
            })
        },
        delete (args, confirm) {
            if (confirm) {
                this.confirm({
                        visible: true,
                        html: '<p>删除后，所有用户无法进入该企业管理后台，无法继续服务该企业下的所有公众号。</p>',
                        type: 'delete',
                        data: [val.row]
                    });
            } else {
                this.$post(this.urls.delete, {
                    roleIds: args.map(item => item.roleId)
                }).then(res => {
                    this.getTabeData();
                })
            }
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
            delete data._index
            delete data._rowKey
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
            let api = this.urls.getList
            let param = {
                offset: 0,
                limit: 10
            }
            
            let self = this
            if (!api) return
            if (arg) {
                let _param = Object.assign({}, arg,
                                    this.getPrivilegedTimeRange(arg.jionTime))
                delete _param.jionTime
                console.log(_param, arg)
                Object.assign(param, _param)
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
        transformData(item, rules) {
            let _rules = rules || {
                "id": "id",
                "seatNo": "seatNo",
                "appIdTotal": "appIdTotal",
                "remark": "remark",
                "corpName": "corpName",
                "eeName": "eeName",
                "mobile": "mobile",
                "deptName": "deptName",
                "status": "status",
                "onlineStatus": "onlineStatus"
            }
            return this._transformData(item, _rules)
        },
        getPrivilegedTimeRange(val) {
            // privilegedTime 2018-9-8 00:00:00 - 2018-10-10 23:59:59
            debugger
            let form = null
            let to = null
            if (val) {
                form = val.split(' - ')[0]
                to = val.split(' - ')[1]
            }
            return {formDistributionTime: form, toDistributionTime: to}
        }
    }
}
</script>
<style lang="stylus">
</style>
