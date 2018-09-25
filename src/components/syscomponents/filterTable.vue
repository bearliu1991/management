 <template>
    <div class="table" :class="{ paddingTop: hiddenTitle }">
        <p class="table-title" v-if="!hiddenTitle">
            {{tableTitle}}
            <Button class="addNewBtn" v-if="btnName" type="success" @click="handle('add')" ><Icon type="plus-round"></Icon>
            {{btnName}}</Button>
        </p>
        <div class="table-content">
            <slot name="top"></slot>
            <div class="filter" v-if='FilterItem.filters.length > 0'>
                <Filters :filters="filterItem">
                    <div slot="before" :class="{inline: FilterItem.inline}">
                        <Button class="addNewBtn"
                        type="primary"
                        v-if="configBtns.length"
                        v-for="(item, index) in configBtns"
                        :key="'config'+ index"
                        @click="handle('config', index)">{{item}}</Button>
                    </div>
                    <div slot="after" :class="{inline: FilterItem.inline}">
                        <Button type="primary" @click="handle('page')">筛选</Button>
                        <span @click="resetFilter" v-if="!FilterItem.noClearBtn">清空筛选条件</span>
                    </div>
                </Filters>
            </div>
            <div class="operations" v-if="!tableOperation">
                <Checkbox v-model="selectAll" v-if="handleAlltypes.length > 0">全选</Checkbox>
                <Button v-for=" (item, index) in  handleAlltypes" class="batch-operation-btn"
                        :key = '"handleAlltypes"+index' @click.native="handle('all', index)">{{item}}</Button>
                <div class="right">
                    <Dropdown trigger="custom" :visible="visible" placement="bottom-end">
                        <Icon @click="openDropdown" type="ios-gear-outline"></Icon>
                        <DropdownMenu slot="list" @mouseleave.native="closeDropdown">
                            <DropdownItem>选择项目</DropdownItem>
                            <DropdownItem v-for="(item, index) in columns" v-if="item.title" :key="index">
                                <Checkbox v-model="item.show" @on-change="setting">{{item.title}}</Checkbox>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="right"><Icon type="share"></Icon></div>
                <div class="right"><Icon @click="exportData(1)" type="ios-printer-outline"></Icon></div>
            </div>
            <div class="table-wrapper">
                <Table ref="selection"
                :loading="isLoading"
                :columns="Columns"
                :data="Data"
                :size="tableSize"
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
            </div>
        </div>
    </div>
</template>

<script>
import actions from "@/utils/tableActions.js"
import DateRange from "./dateRange.vue"
import Filters from "./filters.vue"
  export default {
    name: "roleSetting",
    components: { DateRange, Filters },
    props: {
        tableTitle: {
            type: String,
            default: "列表管理"
        },
        tableSize: {
            type: String,
            default: "default"
        },
        pagination: {
            type: Boolean,
            default: true
        },
        addItemBtn: {
            type: Boolean,
            default: function () { return true }
        },
        tableOperation: {
            type: Boolean,
            default: false
        },
        hiddenTitle: {
            type: Boolean,
            default: false
        },
        noActions: {
            type: Boolean,
            default: false
        },
        btnName: {
            type: String,
            default: ""
        },
        configBtns: {
            type: Array,
            default: function () { return [] }
        },
        columns: {
            type: Array,
            default: function () { return [] }
        },
        actionItems: {
            type: Array,
            default: function () { return ['show', 'modify', 'delete'] }
        },
        data: {
            type: Array,
            default: function () { return [] }
        },
        filterItem: {
            type: Object,
            default: function () { return {} }
        },
        urls: {
            type: Object,
            default: function () { return {} }
        },
        handleAlltypes: {
            type: Array,
            default: function () { return [] }
        }
    },
    data () {
        let self = this
        return {
            action: actions(self),
            isLoading: true,
            refName: '',
            pageTotal: 0,
            currPage: 1,
            pageSize: 10,
            visible: false,
            Columns: [],
            Urls: {},
            selectedRows: [],
            initFilter: {},
            selectAll: false
        }
    },
    created() {
        this.extendPropsItem();
        this.refName = "table" + Date.now();
    },
    computed: {
        Data: {
            get () {
                return this.data
            }
        },
        FilterItem: {
            get () {
                let filter = Object.assign({
                    filters: [],
                    keywords: [],
                    selctors: []
                }, this.filterItem);
                if (Object.keys(this.initFilter).length === 0) {
                    this.$set(this, 'initFilter', this.deepcopy(this.filterItem))
                }
                return filter
            },
            set (val) {
                Object.assign(this.filterItem, val)
            }
        }
    },
    watch: {
        selectAll(val) {
            this.handleSelectAll(val)
        }
    },
    methods: {
        extendPropsItem () {
            // 处理非动态参数
            let columns = this.columns
            if (columns[columns.length - 1].key !== 'action') {
                if (!this.noActions) columns.push(this.action)
                columns.forEach(item => {
                    item.show = true
                })
            }
            this.$set(this, 'Columns', columns)
        },
        selectionChange (selection) {
            this.selectedRows = selection;
            this.handle('select', selection)
        },
        handle (type, param) {
            let val = null;
            let typeOfAll = '0';
            switch (type) {
                case 'select':
                    val = param
                    break;
                case 'all':
                    val = this.selectedRows;
                    typeOfAll = param;
                    break;
                case 'add':
                    val = true;
                    break;
                case 'show':
                    val = param
                    break;
                case 'delete':
                    val = param
                    break;
                case 'page':
                    break;
                case 'modify':
                    val = param
                    break;
                case 'config':
                    val = param
                    break;
                default:
                    val = param
                    break;
            }
            this.$emit('tableHandle', type, val, typeOfAll)
            this.bodyClick()
        },
        resetFilter () {
            this.FilterItem = this.deepcopy(this.initFilter);
        },
        getParams () {
            let params = {};
            if (this.pagination) {
                params = {
                    offset: (this.currPage - 1) * this.pageSize,
                    limit: this.pageSize
                }
            };
            if (Array.isArray(this.FilterItem.keywords)) {
                this.FilterItem.filters.forEach((item, index) => {
                    if (item['value'] === '-1') {
                        params[item['key']] = null;
                    } else if (item['value'] === -1) {
                        params[item['key']] = null;
                    } else if (item['value'] === "") {
                        params[item['key']] = null;
                    } else {
                        params[item['key']] = item['value'];
                    }
                    if (item['sub']) {
                        params[item.sub['key']] = item.sub['value']
                    }
                })
            }
            return params
        },
        pageChange (page) {
            this.currPage = page;
            this.handle('page')
        },
        pageSizeChange (pageSize) {
            this.pageSize = pageSize;
            this.handle('page')
        },
        openDropdown () {
            this.visible = !this.visible
        },
        closeDropdown ($event) {
            this.visible = false
        },
        setting () {
            // 配置要列选项
            this.Columns = []
            this.columns.forEach(item => {
                item.show && this.Columns.push(item)
            })
        },
        handleSelectAll (status) {
            this.$refs['selection'].selectAll(status);
        },
        selectDate(event, item) {
            item.value = event.toString()
            let index = 0;
            item.options.forEach((item, _index) => {
                if (item.value === 'defined') {
                    index = _index;
                }
            })
            item.options[index + 1] = {
                value: item.value,
                label: item.value
            }
            let options = item.options
            this.$set(item, "options", options)
            console.log(event, item)
        },
        exportData (type) {
            // 导出表单数据
            if (type === 1) {
                this.$refs['selection'].exportCsv({
                    filename: 'The original data'
                });
            } else if (type === 2) {
                this.$refs['selection'].exportCsv({
                    filename: 'Sorting and filtering data',
                    original: false
                });
            } else if (type === 3) {
                this.$refs['selection'].exportCsv({
                    filename: 'Custom data',
                    columns: this.columns8.filter((col, index) => index < 4),
                    data: this.data7.filter((data, index) => index < 4)
                });
            }
        },
        changeOrder(param) {
            let arg = {
                key : param.key,
                order : param.order
            }
            this.$emit('sort', arg)
        }
    }
}
</script>
<style lang="stylus">
    .inline
        display inline-block !important
        button
            margin-right 10px
    .paddingTop
        padding-top 0 !important
        .table-content
            border-top: none;
            padding: 0 0;
</style>
