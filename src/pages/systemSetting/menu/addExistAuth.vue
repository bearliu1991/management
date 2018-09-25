<template>
    <Modal
        v-model="modal"
        title="添加权限"
        width="1000"
        :mask-closable="false"
        @on-cancel="modalCancel">
        <div class="table-no-title" style="background: #ffffff">
            <div class="table-content">
                <FiltersInline :ownPage="pageName" :filterItem="filterItem" ref="filters"></FiltersInline>
                <TableWrapper :ownPage="pageName" ref="tableCont" :tabledata="tabledata" :columns="columns" noActions></TableWrapper>
            </div>
        </div>
        <!-- <FilterTable
                class="exist-auth"
                ref='filtertable'
                hiddenTitle
                tableOperation
                noActions
                :columns ='columns'
                :filterItem='filterItem'
                :urls='urls'
                :data='tabledata'
                @tableHandle = "tableHandle"
            ></FilterTable> -->
        <div slot="footer">
            <Button type="primary" size="large" @click="modalOk">确定</Button>
            <Button type="text" size="large" @click="modalCancel">取消</Button>
        </div>
     </Modal>
</template>

<script>
import Columns from './columns.js'
import PageConfig from './pageConfig.js'
  export default {
    name: "addExistAuth",
    components: {
        FilterTable: () => import('@/components/syscomponents/filterTable.vue')
    },
    props: {
        menuId: {
            type: Number,
            default: null
        },
        type: {
            type: String,
            default: ''
        }
    },
    data () {
        let self = this;
        return {
            pageName: 'addExistAuth',
            modal: false,
            urls: {
                getList: self.Path.queryAuthItem,
                add: self.Path.saveAuthMenuItem,
                update: self.Path.saveOrUpdateAuthMenuItem
            },
            filterItem: {},
            columns: self.deepcopy(Columns),
            PageConfig: self.deepcopy(PageConfig),
            tabledata: [],
            selection: null
        }
    },
    mounted() {
        BUS.$on('tablehandle', (type, param, subType, pageName) => {
            if (pageName !== this.pageName) return
            this.tableHandle(type, param, subType)
        })
        this.$set(this.filterItem, 'filters', this.PageConfig.filtersAuthTable);
        this.$set(this.filterItem, 'inline', true);
        this.$set(this.filterItem, 'noClearBtn', true);
    },
    watch: {
        modal(newVal, oldVal) {
            newVal && this.getTabeData()
        }
    },
    methods: {
        modalOk () {
            if (this.selection.length <= 0) {
                this.$Message.info('请选择！')
                return
            }
            let param = {
                menuId: this.menuId,
                itemIds: this.selection.map(item => item.itemId)
            }
            this.$post(this.urls.add, param).then(res => {
                this.$Message.success({
                    content: '操作成功！',
                    duration: 3
                });
                this.$emit('success', 'ok', this.type)
                this.selection = []
                this.modal = false
            })
        },
        modalCancel () {
            this.modal = false
            this.selection = []
        },
        tableHandle (type, val, typeofAll) {
            switch (type) {
                case 'select':
                    this.selection = val
                    break;
                case 'page':
                    this.getTabeData(val);
                    break;
            }
        },
        getTabeData (arg) {
            //  获取列表
            let api = this.urls.getList
            let param = {
                offset: 0,
                limit: 10,
                subSystem: null
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
.exist-auth
    .table-wrapper
        min-height: 400px
    .pagination-wrapper
        bottom: -19px !important
</style>
