<template>
    <div class="table-wrapper">
        <slot name='top'></slot>
        <Table ref="selection"
        :loading="isLoading"
        :columns="Columns"
        :data="tabledata"
        @on-sort-change="changeOrder"
        @on-selection-change="selectionChange"></Table>
        <div class="pagination-wrapper">
            <Page
                show-elevator
                v-if="pagination"
                :page-size = 'pageSize'
                :total="pageTotal"
                :current="currPage"
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"
                ></Page>
        </div>
        <slot name='footer'></slot>
    </div>
</template>
<script>
import actions from "@/utils/tableActions.js"
    export default {
        name: 'table-wrapper',
        props: {
            ownPage: {
                type: String,
                default: 'none'
            },
            actionItems: {
                type: Array,
                default: function () { return ['show', 'modify', 'delete'] }
            },
            columns: {
                type: Array,
                default: function () { return [] }
            },
            tabledata: {
                type: Array,
                default: function () { return [] }
            },
            noActions: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                pageName: this.ownPage,
                isLoading: true,
                columnsNoAction: this.deepcopy(this.columns),
                noActionsStatus: this.noActions,
                pageTotal: 0,
                currPage: 1,
                pagination: true,
                selectedRows: [],
                pageSize: 10,
                savefilter: {}
            }
        },
        created() {
            BUS.$on('setColumn', (data) => {
                this.$set(this, 'columnsNoAction', data)
            })
            BUS.$on('filter', (param, pageName) => {
                if (pageName !== this.pageName) return
                console.log(param, pageName, this.pageName)
                param.offset = 0
                param.limit = this.pageSize
                this.savefilter = param
                this.handle('page', param, pageName)
            })
            BUS.$on('configOprations', (param, pageName) => {
                if (pageName !== this.pageName) return
                this.handle('config', param, pageName)
            })
            BUS.$on('operationSelect', (type, param, pageName) => {
                if (pageName !== this.pageName) return
                this.handle(type, param, pageName)
            })
            BUS.$on('allSelect', (data, pageName) => {
                if (pageName !== this.pageName) return
                this.$refs['selection'].selectAll(data)
            })
            BUS.$on('exportCsv', (data, pageName) => {
                if (pageName !== this.pageName) return
                this.$refs['selection'].exportCsv(data)
            })
            BUS.$on('changePagenation', (data, pageName) => {
                if (pageName !== this.pageName) return
                this.isLoading = data.isLoading
                this.pageTotal = data.pageTotal
                this.currPage = data.currPage
                this.pageSize = data.pageSize
            })
        },
        computed: {
            Columns() {
                let columns = this.columnsNoAction
                if (!this.noActionsStatus) columns.push(actions(this.handle, this.actionItems, this.pageName))
                return columns
            }
        },
        methods: {
            pageChange (page) {
                if (page !== this.currPage) {
                    this.currPage = page;
                    this.savefilter.offset = (this.currPage - 1) * this.pageSize
                    this.savefilter.limit = this.pageSize
                    this.handle('page', this.savefilter, this.pageName)
                    BUS.$emit('isAllSelected', false)
                }
            },
            pageSizeChange (pageSize) {
                this.pageSize = pageSize
                this.savefilter.offset = (this.currPage - 1) * this.pageSize
                this.savefilter.limit = this.pageSize
                this.handle('page', this.savefilter, this.pageName)
            },
            changeOrder(param) {
                if (param.order === 'normal' || param.key === "action") return
                this.savefilter.order = param.order.toUpperCase()
                this.savefilter.columnName = param.key
                this.handle('sort', this.savefilter, this.pageName)
            },
            selectionChange (selection) {
                let isAllChoosed = selection.length === this.pageSize
                BUS.$emit('isAllSelected', isAllChoosed, this.pageName)
                this.selectedRows = selection
                this.handle('select', selection, this.pageName)
            },
            handle (type, param, pageName) {
                if (pageName !== this.pageName) return
                let val = null;
                let subType = '0';
                switch (type) {
                    case 'page':
                        val = param
                        break;
                    case 'sort':
                        val = param
                        break;
                    case 'all':
                        val = this.selectedRows;
                        subType = param;
                        break;
                    case 'config':
                        val = this.selectedRows;
                        subType = param;
                        break;
                    default:
                        val = param
                        break;
                }
                BUS.$emit('tablehandle', type, val, subType, pageName)
                this.bodyClick()
            }
        }
    }
</script>
