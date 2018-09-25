<template>
<div class="page-template">
    <p class="page-template-title">概况</p>
    <div class="page-template-content">
        <p class="overview-blcok-title">实时数据</p>
        <div class="overview-blcok-content overview-table">
            <Row class="overview-table-line">
                <Col span="4" offset="4">新增粉丝数</Col>
                <Col span="4">用户数</Col>
                <Col span="4">企业数</Col>
                <Col span="4">公众号</Col>
                <Col span="4">坐席</Col>
            </Row>
            <Row class="overview-table-line" v-for="(item, index) of realTimeData" :key="index">
                <Col span="4">
                    <span v-if="index === 0">今日数据</span>
                    <span v-if="index === 1">昨日数据</span>
                </Col>
                <Col span="4" :class="{today: !index}">{{item.newFans}}</Col>
                <Col span="4" :class="{today: !index}">{{item.customer}}</Col>
                <Col span="4" :class="{today: !index}">{{item.company}}</Col>
                <Col span="4" :class="{today: !index}">{{item.publicNum}}</Col>
                <Col span="4" :class="{today: !index}">{{item.sets}}</Col>
            </Row>
        </div>
        <p class="overview-blcok-title">趋势图</p>
        <div class="overview-blcok-content">
            <ul class="echarts-nav">
                <li @click="getSparkData(0)" :class="{actived: navIndex === 0}">今日</li>
                <li @click="getSparkData(1)" :class="{actived: navIndex === 1}">昨日</li>
                <li @click="getSparkData(2)" :class="{actived: navIndex === 2}">近7日</li>
                <li @click="getSparkData(3)" :class="{actived: navIndex === 3}">近15日</li>
                <li @click="getSparkData(5)" :class="{actived: navIndex === 5}">近30日</li>
            </ul>
            <Select  class="select-item" style="width:200px" v-model="selectedItem" @on-change="refreshEcharts">
                <Option v-for="(item, index) in dataItem" :key="index"
                    :value="item.val">{{item.title}}</Option>
            </Select>
            <Echarts :echartsData="sparkLineData"></Echarts>
        </div>
    </div>
</div>
</template>

<script>
  import Echarts from './echarts'
  export default {
    name: "overview",
    components: {Echarts},
    data() {
        let self = this;
        return {
            urls: {
                realTimeData: self.Path.queryAuthRoleByBusiType,
                trend: self.Path.queryTItemValueByPager
            },
            realTimeData: [
                {
                    newFans: 11,
                    customer: 11,
                    company: 11,
                    publicNum: 11,
                    sets: 11
                },
                {
                    newFans: 11,
                    customer: 11,
                    company: 11,
                    publicNum: 11,
                    sets: 11
                }
            ],
            rules: {},
            dataItem: [
                {val: '新增粉丝数', title: '新增粉丝数'},
                {val: '用户数', title: '用户数'},
                {val: '企业数', title: '企业数'},
                {val: '公众号数', title: '公众号数'},
                {val: '坐席数', title: '坐席数'}
            ],
            selectedItem: '新增粉丝数',
            navIndex: 0,
            sparkLineData: null
        }
    },
    mounted() {
        setInterval(() => {
            this.sparkLineData = {
                name: 'owly',
                xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                seriesData: [10, 52, 200, 334, 390, 330, 220]
            }
        }, 2000)
    },
    methods: {
        getRealTimeData() {
            // this.$post(this.urls.realTimeData).then(res => {
            //     this.realTimeData = res.data
            // })
        },
        refreshEcharts() {
            // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            // [10, 52, 200, 334, 390, 330, 220]
        //     {
        //     name: 'owly',
        //     xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        //     seriesData: [10, 52, 200, 334, 390, 330, 220]
        // }
        },
        getSparkData(index) {
            this.navIndex = index
        }
    }
  }
</script>

<style lang="stylus">
nav_height = 42px
.overview-blcok-title
    margin 15px 0
    height 15px
    line-height 15px
    text-indent 5px
    font-size 14px
    font-weight 700
    border-left 2px solid rgb(13, 143, 218)
.overview-blcok-content
    background #fff
    border 1px solid #dddee1
    .select-item
        margin-left 25px
.overview-table
    font-size 14px
    padding 20px
    .overview-table-line
        height 42px
        line-height 42px
        .today
            font-size 24px
            font-weight 700
.echarts-nav
    height nav_height
    background rgba(242, 242, 242, 0.4)
    border-bottom 1px solid #dddee1
    margin-bottom 10px
    li
        float left
        margin-top -2px
        width 90px
        height 44px
        line-height 44px
        text-align center
        border-right 1px solid #dddee1
        border-top 2px solid rgba(242, 242, 242, 0)
        &.actived
            background #fff
            border-top 2px solid #12aeef
</style>
