<template>
    <div class="height-full">
        <div class="table">
            <TableTitle tableTitle="套餐管理"></TableTitle>
            <div class="table-content">
                <div class="table-slot-top" slot="top">
                    <Button type="primary" size="large" @click="createPackage">添加套餐</Button>
                </div>
                <TableWrapper :ownPage="pageName" ref="tableCont" :actionItems="actionItems" :tabledata="tabledata" :columns="columns"></TableWrapper>
            </div>
        </div>
        <Confirm ref="confirm" @success="submitData"></Confirm>
    </div>
</template>
<script>
import Columns from './columns.js'
import PageConfig from './pageConfig.js'
  export default {
    name: "package",
    data () {
        let self = this;
        return {
            pageName: "package",
            urls: {
                getList: self.Path.getTPackageListByPage,
                add: self.Path.addOrUpdateTPackage,
                update: self.Path.addOrUpdateTPackage,
                delete: self.Path.deleteTPackageById,
                getItem: self.Path.getTPackageById,
                updateStatus: self.Path.updateTPackageStatusById
            },
            filterItem: {},
            columns: Columns,
            tabledata: [],
            actionItems: [
                'show',
                { title: '启用', type: 'active' },
                { title: '禁用', type: 'disable' },
                { title: '删除', type: 'delete' }
                ],
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
        setTimeout(() => {
            this.getTabeData();
        }, 1000)
    },
    methods: {
        //  处理表单内部的相关操作
        tableHandle (type, val, typeofAll) {
            switch (type) {
                case 'show':
                    this.show(val);
                    break;
                case 'active':
                    this.confirmSure(val.row.id, 1);
                    break;
                case 'stop':
                    this.confirmSure(val.row.id, 2);
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
            }
        },
        submitData (param, type) {
            switch (type) {
                case 'showAndModify':
                    this.updateModify(param);
                    break;
                case 'disable':
                    this.confirmSure(param, 0);
                    break;
                case 'delete':
                    this.confirmSure(param, 3);
                    break;
            }
        },
        createPackage() {
            let params = {
                    title: '套餐详情',
                    api: this.urls.update
                }
            this.$router.push({name: 'createPackage', params: params})
        },
        show (args) {
            this.$post(this.urls.getItem, {
                id: args.row.id
            }).then(res => {
                console.log(res.data)
                let params = {
                    title: '套餐详情',
                    type: 'show',
                    api: this.urls.update,
                    pageDate: res.data
                }
                this.$router.push({name: 'createPackage', params: params})
            })
        },
        disable(param) {
            let _data = param.row.id
            this.confirm({
                visible: true,
                type: 'disable',
                html: '<p>禁用后，所有用户无法进入该企业管理后台，无法继续服务该企业下的所有公众号。</p>',
                data: _data
            });
        },
        delete (param) {
            let _data = param.row.id
            this.confirm({
                visible: true,
                type: 'delete',
                html: '<p>删除后，所有用户无法进入该企业管理后台，无法继续服务该企业下的所有公众号。</p>',
                data: _data
            });
        },
        confirmSure(param, type) {
            let id = param
            this.$post(this.urls.updateStatus, {
                id: id,
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
        transformData(item, rules) {
            let _rules = rules || {
                id : "id",
                name : "name",
                officialAccountsNum : "publicCodeNUm",
                employeeNum : "employees",
                seatNum : "seats",
                validDay : "validityPeriod",
                status : "status",
                createId : "createName",
                createTime : "createTime",
                updateTime : "lastModifyTime"
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
