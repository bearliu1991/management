<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart">
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    className: {
      type: String,
      default: 'yourClassName'
    },
    id: {
      type: String,
      default: 'yourID'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    echartsData: {
        type: [Array, Object],
        default:() => {
            return []
        }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    // this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
        echartsData: {
            handler(curVal, oldVal) {
                this.initChart(curVal)
            },
            deep:true
        }
  },
  methods: {
    setOption(param) {
        let colors = [];
        let xAxisData = [];
        let seriesData = [];
        if (Array.isArray(param)) {
            param.forEach(item => {
                colors.push(item.color || '#12aeef');
                xAxisData.push({
                        type: 'category',
                        data: item.xAxisData || [],
                        axisTick: {
                            alignWithLabel: true
                        }
                    });
                seriesData.push({
                    name: item.name || '你好，欢迎！',
                    type: 'line',
                    data: item.seriesData
                    })
            })
        } else if (param !== null && typeof param === 'object') {
            colors.push(param.color || '#12aeef');
            xAxisData.push({
                        type: 'category',
                        data: param.xAxisData || [],
                        axisTick: {
                            alignWithLabel: true
                        }
                    });
            seriesData.push({
                name: param.name || '你好，欢迎！',
                type: 'line',
                data: param.seriesData
            })
        } else {
            return;
        }
        return {
            color: colors,
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'cross' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: xAxisData,
            yAxis: [{
                type: 'value'
            }],
            series: seriesData
        }
    },
    initChart(param) {
        let option = this.setOption(param);
        this.chart = echarts.init(this.$refs.myEchart);
        // 把配置和数据放这里
        this.chart.setOption(option)
    }
  }
}
</script>
