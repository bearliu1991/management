 <template>
    <div class="filter-container">
        <slot name="before"></slot>
        <div :style="{float: FilterItem.filterFloat}"
        v-if="Array.isArray(FilterItem.filters)" v-for=" (item, index) in  FilterItem.filters" :key='"filters"+index' class="itemSelect">
            <span class="select-label" v-show="item.title">{{item.title}}</span>
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
        <slot name="after"></slot>
    </div>
</template>

<script>
import DateRange from "./dateRange.vue"
  export default {
    name: "filters",
    components: { DateRange },
    props: {
        filters: {
            type: Object,
            default: function () { return {} }
        }
    },
    data () {
        return {
            initFilter: {}
        }
    },
    computed: {
        FilterItem: {
            get () {
                let filter = Object.assign({
                    filters: []
                }, this.filters);
                return filter
            },
            set (val) {
                Object.assign(this.filters, val)
            }
        }
    }
}
</script>
