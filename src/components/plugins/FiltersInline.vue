<template>
    <div class="filter filter-one-line" v-if='FilterItem.filters.length > 0'>
        <div slot="content">
            <Button class="configbtn"
                style="margin-right:10px"
                type="primary"
                v-if="configBtns.length"
                v-for="(item, index) in configBtns"
                :key="'config'+ index"
                @click="configOperation(index)">{{item}}</Button>
            <div class="filter-container" :class="{'aligin-right': right}">
                <div v-if="Array.isArray(FilterItem.filters)"  v-for=" (item, index) in  FilterItem.filters" :key='"filters"+index'
                class="itemSelect">
                    <span class="select-label" v-if="item.title">{{item.title}}</span>
                    <InputNumber
                        size="large"
                        v-if="item.type === 'number'"
                        v-model="item.value"
                        :placeholder="item.placeholder || '请输入...'"
                        :style="{width: item.width + 'px'}"
                        icon="ios-search" class="filter-item"></InputNumber>
                    <DatePicker
                        size="large"
                        v-else-if="item.type === 'date'"
                        v-model="item.value"
                        @on-change="item.value=$event"
                        format="yyyy-MM-dd"
                        :placeholder="item.placeholder || '请输入...'"
                        :style="{width: item.width + 'px'}"
                        icon="ios-search" class="filter-item"></DatePicker>
                    <DateRange
                        v-else-if="item.type === 'dateRange'"
                        :placeholder="item.placeholder || '请输入...'"
                        :style="{width: item.width + 'px'}"
                        v-model="item.value"></DateRange>
                    <div v-else-if="item.type === 'select'" style="display: inline-block">
                        <Select
                                size="large"
                                v-model="item.value"
                                :placeholder="item.placeholder || '请输入...'"
                                :style="{width: item.width + 'px'}"
                                class="filter-item">
                            <Option v-for="(_item, _index ) in item.options"
                                :value="_item.value" :key= '"selctors" + index + _index'>
                                {{_item.label}}
                            </Option>
                        </Select>
                        <Select
                                v-if='item.sub'
                                v-show='item.value === item.sub.show'
                                size="large"
                                v-model="item.sub.value"
                                :placeholder="item.placeholder || '请输入...'"
                                :style="{width: item.width + 'px'}"
                                class="filter-item">
                            <Option v-for="(_item, _index ) in item.sub.options"
                                :value="_item.value" :key= '"selctors" + index + _index'>
                                {{_item.label}}
                            </Option>
                        </Select>
                    </div>
                    <Input
                        v-else
                        size="large"
                        v-model="item.value"
                        :placeholder="item.placeholder || '请输入...'"
                        :style="{width: item.width + 'px'}"
                        icon="ios-search" class="filter-item"></Input>
                </div>
                <Button type="primary" @click="confirmFilter">筛选</Button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FiltersInline',
    data() {
        return {
            initFilter: {},
            pageName: this.ownPage
        }
    },
    props:{
        ownPage: {
            type: String,
            default: 'none'
        },
        filterItem: {
            type: Object,
            default: function () { return {} }
        },
        configBtns: {
            type: Array,
            default: function () { return [] }
        },
        right: {
            type: Boolean,
            default: false
        }
    },
    computed: {
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
    methods: {
        resetFilter () {
            this.FilterItem = this.deepcopy(this.initFilter);
            BUS.$emit('clearDateRange')
            this.confirmFilter()
        },
        getParams () {
            let params = {};
            if (Array.isArray(this.FilterItem.keywords)) {
                this.FilterItem.filters.forEach((item, index) => {
                    if (item['value'] === '-1') {
                        params[item['key']] = null;
                    } else if (item['value'] === -1) {
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
        confirmFilter () {
            let param = this.getParams()
            BUS.$emit('filter', param, this.pageName)
        },
        configOperation(index) {
            BUS.$emit('configOprations', index, this.pageName)
        }
    }
}
</script>

<style lang="stylus">
.filter-one-line
    .filter-container
        display inline
        padding-right 10px
    .aligin-right
        float right
</style>
