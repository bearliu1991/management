<template>
    <div class="height-full">
        <div class="table">
            <TableTitle tableTitle="公众号管理"></TableTitle>
            <div class="table-content">
                <FiltersCollapse :ownPage="pageName" :filterItem="filterItem" ref="filters"></FiltersCollapse>
                <div class="operations" >
                    <OperateLeft :ownPage="pageName" ref="operateLeft" :handleAlltypes="handleAlltypes"></OperateLeft>
                </div>
                <TableWrapper :ownPage="pageName" ref="tableCont" :actionItems="actionItems" :tabledata="tabledata" :columns="columns"></TableWrapper>
            </div>
        </div>
        <!-- <filterTable
            ref='filtertable'
            tableTitle="公众号管理"
            :addItemBtn='false'
            :columns ='columns'
            :filterItem='filterItem'
            :urls='urls'
            :data='tabledata'
            :actionItems="actionItems"
            :handleAlltypes=handleAlltypes
            @tableHandle = "tableHandle"
            ></filterTable> -->
        <Confirm ref="confirm" @success="submitData"></Confirm>
    </div>
</template>
<script>
import Columns from './columns.js'
import PageConfig from './pageConfig.js'
import filterTable from '@/components/syscomponents/filterTable.vue'
  export default {
    name: "publicNum",
    components: {
        filterTable
    },
    data () {
        let self = this;
        return {
            pageName: "wxPublicAccount",
            urls: {
                getList: self.Path.getPublicAccountListByPage,
                unAuthorization: self.Path.updatePublicAccountToUnAuthorization,
                active: self.Path.updatePublicAccountToActive,
                stop: self.Path.updatePublicAccountToBlockUp,
                disable: self.Path.updatePublicAccountListToDisabled,
                delete: self.Path.updatePublicAccountListStatusToDelete
            },
            filterItem: {},
            columns: Columns,
            tabledata: [],
            actionItems: [
                // { title: '解除授权', type: 'unAuthorization', key: 'status', options: [1,2] },
                // { title: '启动', type: 'active', key: 'status', options: [0,2,4] },
                // { title: '停用', type: 'stop', key: 'status', options: [1,4] },
                // { title: '禁用', type: 'disable', key: 'status', options: [1,3,4] },
                // { title: '删除', type: 'delete' }
                { title: '解除授权', type: 'unAuthorization' },
                { title: '启动', type: 'active' },
                { title: '停用', type: 'stop' },
                { title: '禁用', type: 'disable' },
                { title: '删除', type: 'delete' }
            ],
            handleAlltypes: ['批量删除', '批量禁用'],
            formValidate: {},
            PageConfig: PageConfig
        }
    },
    mounted() {
        BUS.$on('tablehandle', (type, param, typeofAll, pageName) => {
            if (pageName !== this.pageName) return
            this.tableHandle(type, param, typeofAll)
        })
        this.$set(this.filterItem, 'filters', this.PageConfig.filters)
        this.getTabeData();
    },
    methods: {
        //  处理表单内部的相关操作
        tableHandle (type, val, typeofAll) {
            switch (type) {
                case 'page':
                    this.getTabeData(val);
                    break;
                case 'unAuthorization':
                    this.unAuthorization(val, true)
                    break;
                case 'active':
                    this.active(val)
                    break;
                case 'stop':
                    this.stop(val, true)
                    break;
                case 'disable':
                    this.disable(val, true)
                    break;
                case 'delete':
                    this.delete(val, true)
                    break;
                case 'all':
                    if (typeofAll === 0) {
                        this.delete(val, true)
                    } else if (typeofAll === 1) {
                        this.disable(val, true)
                    }
                    break;
            }
        },
        submitData (param, type) {
            switch (type) {
                case 'unAuthorization':
                    this.submitNewData(param);
                    break;
                case 'stop':
                    this.stop(param);
                    break;
                case 'disable':
                    this.disable(param);
                    break;
                case 'delete':
                    this.delete(param);
                    break;
            }
        },
        unAuthorization(param, confirm) {
            if (confirm) {
                let _data = param.row.appid
                this.confirm({
                    visible: true,
                    type: 'unAuthorization',
                    html: '<p>解除授权后该账号将无法使用在迎客通系统设置的所有功能，但数据会被妥善保存，再次重新授权后可继续使用。</p>',
                    data: _data
                });
            } else {
               this.$post(this.urls.unAuthorization, {
                    appId: param
                }).then(res => {
                    this.$Message.info('解除授权成功！')
                    this.getTabeData();
                }).catch(e => {
                    this.$Message.error('解除授权失败！')
                })
            }
        },
        active(param) {
            this.$post(this.urls.active, {
                appId: param.row.appid
            }).then(res => {
                this.$Message.info('启用成功！')
                this.getTabeData();
            }).catch(e => {
                this.$Message.error('启用失败！')
            })
        },
        stop(param, confirm) {
            if (confirm) {
                let _data = param.row.appid
                this.confirm({
                    visible: true,
                    type: 'stop',
                    html: '<p>您正在停用公众号，停用后，该公众号的所有操作无法使用，您确定要停用吗？</p>',
                    data: _data
                });
            } else {
               this.$post(this.urls.stop, {
                    appId: param
                }).then(res => {
                    this.$Message.info('停用成功！')
                    this.getTabeData();
                }).catch(e => {
                    this.$Message.error('停用失败！')
                })
            }
        },
        disable(param, confirm) {
            if (confirm) {
                let _data = []
                if (Array.isArray(param)) {
                    _data = param.map(item => item.appid)
                } else {
                    _data = [param.row.appid]
                }
                this.confirm({
                    visible: true,
                    type: 'disable',
                    html: '<p>您正在禁用公众号，禁用后，该公众号的所有操作无法使用，必须由运营系统重新启用后才能使用，您确定要停用吗？</p>',
                    data: _data
                });
            } else {
               this.$post(this.urls.disable, {
                    appIdList: param
                }).then(res => {
                    this.$Message.info('禁用成功！')
                    this.getTabeData();
                }).catch(e => {
                    this.$Message.error('禁用失败！')
                })
            }
        },
        delete(param, confirm) {
            if (confirm) {
                let _data = []
                if (Array.isArray(param)) {
                    _data = param.map(item => item.appid)
                } else {
                    _data = [param.row.appid]
                }
                this.confirm({
                    visible: true,
                    type: 'delete',
                    html: '<p>您正在删除公众号，删除后，该公众号的所有操作无法使用，必须由运营系统重新启用后才能使用，您确定要停用吗？</p>',
                    data: _data
                });
            } else {
                this.$post(this.urls.delete, {
                    appIdList: param
                }).then(res => {
                    this.$Message.info('删除成功！')
                    this.getTabeData();
                }).catch(e => {
                    this.$Message.error('删除失败！')
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
                let _param = Object.assign({},
                                    this.getfunNumRange(arg.fansNum),
                                    this.getPrivilegedTimeRange(arg.authTime))
                delete arg.fansNum
                arg = this.transformData(arg, {
                    authStatus: "verify",
                    affiliatedCopr: "corpName",
                    limit: "limit",
                    offset: "offset",
                    status: "status",
                    type: "serviceTypeInfo"
                })
                Object.assign(param, arg, _param)
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
                "appid": "appid",
                "corpId": "corpId",
                "headImg": "avatar",
                "nickName": "pubName",
                "serviceTypeInfo": "type",
                "verifyTypeInfo": "authStatus",
                "corpName": "affiliatedCopr",
                "userCount": "fansNum",
                "privilegedEeName": "authEmployee",
                "privilegedEeId": "privilegedEeId",
                "privilegedTime": "authTime",
                "status": "status"
            }
            return this._transformData(item, _rules)
        },
        getfunNumRange(val) {
            return val === 1 ? {fromCount: 0, toCount: 500}
                    : val === 2 ? {fromCount: 501, toCount: 1000}
                    : val === 3 ? {fromCount: 1001, toCount: 5000}
                    : val === 4 ? {fromCount: 5001, toCount: 10000}
                    : val === 5 ? {fromCount: 10000, toCount: 100000}
                    : val === 6 ? {fromCount: 100001, toCount: null}
                    : {fromCount: null, toCount: null}
        },
        getPrivilegedTimeRange(val) {
            // privilegedTime 2018-9-8 00:00:00 - 2018-10-10 23:59:59
            let form = null
            let to = null
            if (val) {
                form = val.split(' - ')[0]
                to = val.split(' - ')[1]
            }
            return {formPrivilegedTime: form, toPrivilegedTime: to}
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
