<template>
    <DatePicker type="daterange"
    class="date-range"
    v-model='date'
    :options="options"
    @on-change="change"
    format="yyyy-MM-dd"
    :placeholder="placeholder" style="{width: width + 'px'}"></DatePicker>
</template>

<script>
  export default {
    name: "dateRange",
    props: {
        value: {
            default: ''
        },
        placeholder: {
            default: '请选择时间'
        },
        width: {
            default: 200
        }
    },
    data() {
      return {
        date:'',
        options: {
            shortcuts: [
                {
                    text: '近7天',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        return [start, end];
                    }
                },
                {
                    text: '近15天',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        return [start, end];
                    }
                },
                {
                    text: '近30天',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        return [start, end];
                    }
                },
                {
                    text: '近90天',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        return [start, end];
                    }
                }
            ]
        }
      }
    },
    methods: {
        change() {
            let dateStr = ''
            this.date.forEach((item, index) => {
                dateStr += this.dateTimeFormat(item, 'date')
                if (index === 0) {
                    dateStr += ' 00:00:00 - '
                } else if (index === 1) {
                    dateStr += ' 23:59:59'
                }
            })
            this.dateTimeFormat()
            this.$emit('input', dateStr)
        }
    }
  }
</script>

<style lang="stylus">
.date-range
    .ivu-date-picker-cells-cell-range:before
        color: #ffffff
        background: #2d8cf0
    .ivu-picker-panel-content-right
        .ivu-date-picker-cells-cell-today em
            color: #bbbec4
            &:after
                background: none
        .ivu-date-picker-cells-focused em
            box-shadow: none
</style>
