<template>
    <div class="height-full">
        <div class="table">
            <TableTitle tableTitle="企业管理"></TableTitle>
            <div class="table-content">
                <FiltersCollapse :ownPage="pageName" :filterItem="filterItem" ref="filters"></FiltersCollapse>
                <div class="operations" >
                    <OperateLeft :ownPage="pageName" ref="operateLeft" :handleAlltypes="handleAlltypes"></OperateLeft>
                    <OperateRight :ownPage="pageName" :columns="columns" ref="operateRight" :handleAlltypes="handleAlltypes"></OperateRight>
                </div>
                <TableWrapper :ownPage="pageName" ref="tableCont" :actionItems="actionItems" :tabledata="tabledata" :columns="columns"></TableWrapper>
            </div>
        </div>
        <Modalfrom ref="modal"
        width="875"
        :formValidate="formValidate"
        @success="submitData"
        :version="version"
        :title="modalTitle"
        :type="modalType"></Modalfrom>
        <Confirm ref="confirm" @success="submitData"></Confirm>
    </div>
</template>
<script>
import Columns from './columns.js'
import PageConfig from './pageConfig.js'
import filterTable from '@/components/syscomponents/filterTable.vue'
import Modalfrom from './information.vue'
  export default {
    name: "company",
    components: {
        filterTable,
        Modalfrom
    },
    data () {
        let self = this;
        return {
            pageName: "company",
            urls: {
                getList: self.Path.getCorpListMultiByPager,
                update: self.Path.updateCorpStatusByCorpId,
                getItem: self.Path.getCorpInfoMulti,
                updateCorpPackName: self.Path.updateCorpPackName,
                getTPackageListByPage: self.Path.getTPackageListByPage
            },
            filterItem: {},
            columns: Columns,
            tabledata: [],
            actionItems: [
                'show',
                { title: '启用', type: 'active' },
                { title: '禁用', type: 'disable' },
                'delete'
                ],
            handleAlltypes: ['批量删除', '批量禁用'],
            formValidate: {},
            PageConfig: PageConfig,
            modalTitle: '',
            modalType: '',
            version: []
        }
    },
    mounted() {
        BUS.$on('tablehandle', (type, param, typeofAll, pageName) => {
            if (pageName !== this.pageName) return
            this.tableHandle(type, param, typeofAll)
        })
        this.getPackageList()
    },
    methods: {
        //  处理表单内部的相关操作
        tableHandle (type, val, typeofAll) {
            switch (type) {
                case 'all':
                    this.modifyAll(typeofAll, val);
                    break;
                case 'show':
                    this.show(val);
                    break;
                case 'active':
                    let idList = [val.row.corpId]
                    this.confirmSure(idList, 'ACTIVE');
                    break;
                case 'disable':
                    this.disable(val);
                    break;
                case 'delete':
                    this.delete(val);
                    break;
                case 'page':
                    this.getTabeData(val);
                    break;
                case 'sort':
                    this.sortChange(val)
                    break;
            }
        },
        submitData (param, type) {
            switch (type) {
                case 'showAndModify':
                    this.updateModify(param);
                    break;
                case 'disable':
                    this.confirmSure(param, 'DISABLE');
                    break;
                case 'delete':
                    this.confirmSure(param, 'DELETE');
                    break;
            }
        },
        getPackageList (args) {
            //  查看当前条目信息-1-获取当信息
            return this.$post(this.urls.getTPackageListByPage, {
                offset: 0,
                limit: 99
            }).then(res => {
                let Package = res.data.records.map((item) => {
                    return {
                        value: item.id,
                        label: item.name,
                        price: item.price,
                        type: item.authType,
                        startTime: item.startTime,
                        endTime: item.endTime,
                        validDay: item.validDay
                    }
                })
                this.PageConfig.filters.forEach(item => {
                    if (item.key === 'version') {
                        item.sub.options = Package
                    }
                });
                this.$set(this, 'version', Package);
                this.$set(this.filterItem, 'filters', this.PageConfig.filters);
                this.getTabeData();
            })
        },
        show (args) {
            //  查看当前条目信息-1-获取当信息
            this.$post(this.urls.getItem, {
                corpPackId: args.row.packId
            }).then(res => {
                this.openPopup(res.data)
            })
        },
        openPopup (param) {
            //  查看当前条目信息-2-弹窗显示
            let formValidate = this.transformData(param);
            this.setModalOpen({
                visible: true,
                title: '企业详情',
                formValidate: formValidate,
                type: 'showAndModify'
            })
        },
        disable(param) {
            let _data = [param.row.corpId]
            this.confirm({
                visible: true,
                type: 'disable',
                html: '<p>禁用后，所有用户无法进入该企业管理后台，无法继续服务该企业下的所有公众号。</p>',
                data: _data
            })
        },
        delete (param) {
            let _data = [param.row.corpId]
            this.confirm({
                visible: true,
                type: 'delete',
                html: '<p>删除后，所有用户无法进入该企业管理后台，无法继续服务该企业下的所有公众号。</p>',
                data: _data
            })
        },
        confirmSure(param, type) {
            let idlist = this.deepcopy(param)
            this.$post(this.urls.update, {
                corpIdList: idlist,
                status: type
            }).then(res => {
                this.confirm();
                this.$Message.success({
                    content: '操作成功！',
                    duration: 3
                });
                this.getTabeData();
            })
        },
        // 修改后相关的提交处理，具体情况根据当前页面情况而定
        updateModify (param) {
            let args = {
                id: param.corpId,
                packageId: param.packageId,
                endTime: param.delayExpireTime ? (param.delayExpireTime + ' 23:59:59') : param.expireTime
            }
            this.$post(this.urls.updateCorpPackName, args).then(res => {
                if (res.code === 1) {
                    this.$Message.success({
                        content: '保存成功！',
                        duration: 3
                    });
                    this.setModalOpen();
                    this.getTabeData();
                }
            }).catch(err => {
                console.log(err)
            })
        },
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
            let _data = params.map(item => item.corpId)
            this.confirm({
                visible: true,
                html: pragh,
                type: confirmType,
                data: _data
            })
        },
        updateModifyAll (params) {
            this.$post(this.urls.update, {
                corpIdList: params.corpIdList,
                status: params.status
            }).then(res => {
                this.getTabeData();
            })
        },
        sortChange(param) {
            let columnName = ''
            if (param.columnName === 'publicCodeNUm') columnName = 'appid_num'
            if (param.columnName === 'fans') columnName = 'fans_num'
            if (param.columnName === 'employees') columnName = 'ee_num'
            if (param.columnName === 'seats') columnName = 'seat_num'
            if (param.columnName === 'createTime') columnName = 'create_time'
            if (param.columnName === 'expireTime') columnName = 'end_time'
            if (!columnName) return
            param.columnName = columnName
            this.getTabeData(param)
        },
        getTabeData (arg) {
            //  获取列表
            let api = this.urls.getList
            let param = {
                offset: 0,
                limit: 10,
                order: 'DESC',
                columnName: 'create_time'
            }
            let self = this
            if (!api) return
            if (arg) {
                Object.assign(param, arg)
                param.packType = param.version
                param.packageId = param.subversion
                delete param.version
                delete param.subversion
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
                corpId: "corpId",
                packId: "packId",
                packageId: "packageId",
                corpName: "companyName",
                packageName: "version",
                status: "status",
                contactName: "contact",
                telephone: "telNum",
                salerName: "saleman",
                salerNickname: "salemanWXNickName",
                appidNum: "publicCodeNUm",
                fansNumStatus: "fans",
                eeNum: "employees",
                seatNum: "seats",
                createTime: "createTime",
                payTime: "orderTime",
                endTime: "expireTime"
            }
            return this._transformData(item, _rules)
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
