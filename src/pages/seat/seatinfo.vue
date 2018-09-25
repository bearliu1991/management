<template>
<div class="page-template seat-info">
    <p class="page-template-title">坐席管理 > 坐席详情</p>
    <div class="page-template-content">
        <div class="page-template-main" >
            <Menu class="menu" mode="horizontal" theme="light" :active-name="menuName" @on-select="menuSelect">
                <MenuItem name="info">基本信息</MenuItem>
                <MenuItem name="auth">坐席权限</MenuItem>
                <MenuItem name="personalise">个性化坐席</MenuItem>
            </Menu>
            <div v-if="menuName === 'info'" class="basic-info">
                <Row class="basic-info-row">
                    <Col span="3" class="public-number-avatar"><img :src="info.pubNumAvatar"/></Col>
                    <Col span="16" >
                        <div class="inner-col">公众号名称：{{info.pubName}}</div>
                        <div class="inner-col">公众号：{{info.pubNum}}</div>
                    </Col>
                </Row>
                <Row class="basic-info-row">
                    <Col span="5">坐席编号：</Col>
                    <Col span="16">{{info.code}}</Col>
                </Row>
                <Row class="basic-info-row">
                    <Col span="5">坐席分组：</Col>
                    <Col span="16">{{info.group}}</Col>
                </Row>
                <Row class="basic-info-row">
                    <Col span="5">所属企业：</Col>
                    <Col span="16">{{info.subCompany}}</Col>
                </Row>
                <Row class="basic-info-row">
                    <Col span="5">分配员工：</Col>
                    <Col span="16">{{info.distributionEmploy}}</Col>
                </Row>
                <Row class="basic-info-row">
                    <Col span="5">手机号码：</Col>
                    <Col span="16">{{info.telephoneNumber}}</Col>
                </Row>
                <Row class="basic-info-row">
                    <Col span="5">分配时间：</Col>
                    <Col span="16">{{info.distributionTime}}</Col>
                </Row>
                <Row class="basic-info-row">
                    <Col span="5">分配状态：</Col>
                    <Col span="16">{{info.distributionStatus}}</Col>
                </Row>
                <Row class="basic-info-row">
                    <Col span="5">微信头像昵称：</Col>
                    <Col span="5"><img class="wx-avatar" :src="info.avatar">{{info.nickName}}</Col>
                </Row>
                <Row class="basic-info-row">
                    <Col span="5">在线状态：</Col>
                    <Col span="16">{{info.onlineStatus}}</Col>
                </Row>
                <Row class="basic-info-row">
                    <Col span="5">最近在线时间：</Col>
                    <Col span="16">{{info.lastOnlineTime}}</Col>
                </Row>
                <Row class="basic-info-row">
                    <Col span="5">坐席状态：</Col>
                    <Col span="16">{{info.seatStatus}}</Col>
                </Row>
            </div>
            <div v-if="menuName === 'auth'" class="seat-auth">
                <CheckAll class="check-boxes" title="分配公众号" :checkItems="checkItems1"></CheckAll>
                <CheckAll class="check-boxes" title="会话管理" :checkItems="checkItems2"></CheckAll>
                <CheckAll class="check-boxes" title="粉丝管理" :checkItems="checkItems3"></CheckAll>
            </div>
            <div v-if="menuName === 'personalise'" class="seat-personalise">
                <Table :columns="columns" :data="tableData" ></Table>
            </div>
            <div class="btns">
                <Button type="ghost" @click.prevent="disable">停用</Button>
                <Button type="ghost" @click="forbidden" style="margin-left: 8px">禁用</Button>
                <Button type="ghost" style="margin-left: 8px">
                    <router-link :to="{name: 'seat'}">返回</router-link>
                </Button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {ColumnsPersonalise} from './columns.js'
  export default {
    name: "seatinfo",
    props: {
        title: {
            type: String,
            default: () => { return '坐席管理 > 坐席详情' }
        },
        type: {
            type: String,
            default: () => { return 'create' }
        },
        api: {
            type: String,
            default: () => { return '' }
        },
        pageDate: {
            type: Object,
            default: () => { return {} }
        }
    },
    data() {
        const self = this;
        return {
            menuName: 'info',
            urls: {
                information: "",
                disable: "",
                forbidden: ""
            },
            info: {
                id: 11,
                code: '123456',
                num: 4,
                group: 'aaa',
                subCompany: 'vvvvv',
                pubNumAvatar: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3088421303,208394042&fm=58',
                avatar: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3088421303,208394042&fm=58',
                nickName: 'nihao',
                seatStatus: 1,
                onlineStatus: 1,
                distributionStatus: 1,
                distributionEmploy: 123,
                telephoneNumber: 100,
                distributionTime: '2018-08-30 15:27:39',
                lastOnlineTime: '2018-09-30 15:27:39',
                pubName: '星客',
                pubNum: '未设置'
            },
            checkItems: [],
            columns: self.deepcopy(ColumnsPersonalise),
            tableData: [],
            checkItems1: [],
            checkItems2: [],
            checkItems3: []
        }
    },
    filters: {
        status(value) {
            let data = value;
            let text = '';
            if (data === "0") text = '禁用'
            if (data === "1") text = '正常'
            if (data === "2") text = '停售'
            if (data === "3") text = '逻辑删除'
            return text
        }
    },
    mounted() {
        setTimeout(() => {
            this.$set(this, 'checkItems', [
                {
                    val: 1,
                    avatar: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3088421303,208394042&fm=58',
                    title:11111
                }, {
                    val: 2, title: 2222}])
            this.$set(this, 'tableData', [
                {
                    nickName: '11',
                    pubName: '22',
                    pubStatus: 1,
                    pubAvatar: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3088421303,208394042&fm=58',
                    seatAvatar: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3088421303,208394042&fm=58',
                    seatNickName: '123'
                },
                {
                    nickName: '11',
                    pubName: '22',
                    pubStatus: 1,
                    pubAvatar: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3088421303,208394042&fm=58',
                    seatAvatar: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3088421303,208394042&fm=58',
                    seatNickName: '123'
                }
            ])
        }, 1000)
    },
    beforeCreate() {
        this.refName = "formValidate" + Date.now()
    },
    created() {},
    activated() {
        this.initTitle = this.title
        this.initType = this.type
        this.initApi = this.api
        // let data = this.transformData(this.pageDate)
        // data.actions = data.actions || []
        // data.saveTime = String(data.saveTime)
        // data.usePeriod = String(data.usePeriod)
        // this.$set(this, 'formValidate', data)
    },
    methods: {
        menuSelect(name) {
            this.menuName = name
        },
        disable() {
            if (this.menuName === 'info') {
                this.$post(this.urls.disable).then(res => {

                })
            } else {

            }
        },
        forbidden() {
            if (this.menuName === 'info') {
                this.$post(this.urls.forbidden).then(res => {

                })
            } else {

            }
        },
        getInformation() {
            this.$post(this.urls.information).then(res => {

            })
        },
        transformData(item, rules) {
            let _rules = rules || {
                id: 'id',
                code: 'code',
                pubNum: 'pubNum',
                remark: 'remark',
                subCompany: 'subCompany',
                employeeName: 'employeeName',
                telephone: 'telephone',
                group: 'group',
                seatStatus: 'seatStatus',
                onlineStatus: 'onlineStatus',
                distributionStatus: 'distributionStatus'
            }
            this._transformData(item, _rules)
        }
    }
  }
</script>

<style lang="stylus">
.seat-info .page-template-content
    font-size 14px
    .page-template-main
        padding: 0px 45px
    .menu
        height 50px
    .public-number-avatar
        img
            width 60px
    .inner-col
        padding 2px 0 10px
    .basic-info, .seat-auth
        margin-left 40px
        padding-top: 15px
    .basic-info
        width 600px
        .basic-info-row
            margin-bottom 20px
    .check-boxes
        margin-bottom 20px
    .btns
        padding 20px
        text-align center
        border-top 1px solid #dddee1
        button
            margin 0 10px
            width 120px
            height 40px
            font-size: 14px
</style>
