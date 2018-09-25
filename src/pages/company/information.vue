<template>
    <div>
        <Modal
            class="company-infor"
            v-model="modal"
            :title="title"
            :width="width"
            :mask-closable="false"
            @on-visible-change="visibleChange"
            @on-cancel="modalCancel">
            <div class="row-container">
                <Row>
                    <Col span="4">企业名称：</Col>
                    <Col span="20">{{ formValidate.companyName }}</Col>
                </Row>
                <Row>
                    <Col span="4">套餐版本：</Col>
                    <Col span="8">
                        <div v-if="!selectVersion"  class="item-width">
                            {{ formValidate.version }}
                        </div>
                        <div v-else>
                            <Select v-model="formValidate.versionValue" class="item-width" >
                                <Option
                                    @click.native='selectChange(item)'
                                    :title="item.label+'('+item.price+')'" :value='item.value' v-for="(item, index ) in cVersionList" :key= '"selctors" + index'>
                                    {{item.label}}({{item.price}})
                                </Option>
                            </Select>
                        </div>
                        <span v-show="!selectVersion" type='text' @click="modify" class="font-btn">修改</span>
                        <span v-show="selectVersion" type='text' @click="selectVersion=false" class="font-btn">取消</span>
                    </Col>
                    <Col span="4">状态：</Col>
                    <Col span="8">{{ formValidate.status | filterStatus}}</Col>
                </Row>
                <Row>
                    <Col span="4">联系人：</Col>
                    <Col span="8">{{ formValidate.contact }}</Col>
                    <Col span="4">手机号码：</Col>
                    <Col span="8">{{ formValidate.telNum }}</Col>
                </Row>
                <Row>
                    <Col span="4">销售姓名：</Col>
                    <Col span="8">{{ formValidate.saleman }}</Col>
                    <Col span="4">销售微信昵称：</Col>
                    <Col span="8">{{ formValidate.salemanWXNickName }}</Col>
                </Row>
                <Row>
                    <Col span="4">公众号数量：</Col>
                    <Col span="8">{{ formValidate.publicCodeNUm }}个</Col>
                    <Col span="4">粉丝总数：</Col>
                    <Col span="8">{{ formValidate.fans }}</Col>
                </Row>
                <Row>
                    <Col span="4">员工数量：</Col>
                    <Col span="8">{{ formValidate.employees }}名</Col>
                    <Col span="4">坐席数量：</Col>
                    <Col span="8">{{ formValidate.seats }}个</Col>
                </Row>
                <Row>
                    <Col span="4">创建时间：</Col>
                    <Col span="8">{{ formValidate.createTime | dateTimeMin}}</Col>
                    <Col span="4">订购时间：</Col>
                    <Col span="8">{{ formValidate.orderTime | dateTimeMin}}</Col>
                </Row>
                <Row>
                    <Col span="4">
                        <span v-if='formValidate.delayExpireTime'>原到期时间：</span>
                        <span v-else>到期时间：</span>
                    </Col>
                    <Col :span="formValidate.delayExpireTime ? 8 : 20">
                        {{ formValidate.expireTime | dateTime}}
                        <span type='text' @click="selectChange()" class="font-btn">延期</span></Col>
                    </Col>
                    <Col span="4" v-if='formValidate.delayExpireTime'>现到期时间：</Col>
                    <Col span="8" v-if='formValidate.delayExpireTime'>{{ formValidate.delayExpireTime | dateTime}}</Col>
                </Row>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" @click="modalOk">保存</Button>
                <Button size="large" @click="modalCancel">取消</Button>
            </div>
        </Modal>
        <SelectDate ref="innerModal"
        width="500"
        :formValidate="formValidate"
        :version='cVersionList'
        @success= "submitData"
        :title= "modalTitle"
        :type= "modalType"></SelectDate>
    </div>
</template>

<script>
  export default {
    name: "modalValidateForm",
    components: {
        SelectDate : () => import('./SelectDate.vue')
    },
    props: {
        title:{
            type: String,
            default:'ykt'
        },
        formValidate:{
            type: Object,
            default: function () { return {} }
        },
        width:{
            type: String,
            default: '500'
        },
        labelWidth:{
            type: Number,
            default: 100
        },
        type:{
            type: [String, Number],
            default: 0
        },
        version: {
            type: Array,
            default: function () { return [] }
        }
    },
    filters: {
        filterStatus(value) {
            let text = null;
            if (value === 'ACTIVE') text = '正常'
            if (value === 'EXPIRE') text = '已到期'
            if (value === 'DISABLED') text = '禁用'
            return text
        },
        dateTimeMin(value) {
            return value ? value.substring(0, 16) : ''
        },
        dateTime(value) {
            return value ? value.substring(0, 10) : ''
        }
    },
    data () {
      return {
        modal: false,
        selectVersion: false,
        selectedVersion: '标准版',
        // version: [
        //     {val: '免费版', label: '免费版' },
        //     {val: '标准版', label: '标准版' },
        //     {val: '专业版', label: '专业版' },
        //     {val: '旗舰版', label: '旗舰版' }
        // ],
        selectDate: false,
        date: '',
        modalTitle: '',
        modalType: ''
      }
    },
    computed: {
        cVersionList() {
            return this.version
        }
    },
    methods: {
        modalOk () {
            this.$emit('success', this.formValidate, this.type)
        },
        afterOk (val1, val2) {
            // this.$refs['form'].parentHandleReset()
        },
        modalCancel () {
            // this.$refs['form'].parentHandleReset()
            this.modal = false
            this.selectVersion = false
        },
        afterCancel (val) {
            console.log(val)
        },
        visibleChange(val) {
            this.$emit('visibleChange', val)
        },
        selectChange(val) {
            let expireTime = null;
            if (val) {
                if (val && val.type === 1) {
                    expireTime = val.endTime
                }
                if (val && val.type === 2) {
                    let time = Date.now();
                    time += 3600 * 1000 * 24 * parseInt(val.validDay)
                    expireTime = this.dateTimeFormat(time, 'date')
                }
                this.$set(this.formValidate, 'delayExpireTime', expireTime)
            } else {
                this.$set(this.formValidate, 'delayExpireTime', this.formValidate.expireTime)
            }
            this.setModalOpen({
                ref: 'innerModal',
                visible: true,
                title: '延期套餐时间',
                formValidate: this.formValidate,
                type: 'selectDate'
            });
        },
        submitData(val) {
            this.setModalOpen({ ref: 'innerModal' });
        },
        modify(event) {
            this.selectVersion = true;
            this.cVersionList.forEach(item => {
                if (item.label === this.formValidate.version) {
                    this.formValidate.versionValue = item.value;
                }
            })
        }
    }
  }
</script>

<style lang="stylus">
    .company-infor
        .font-btn
            margin-left: 40px
            color: #169BD5
            font-weight: 500
            cursor pointer
        .ivu-modal-header-inner
            font-size 16px
            font-weight 700
        .item-width
            width 120px
        .ivu-modal-content
            padding 10px
        .ivu-modal-header, .ivu-modal-footer
            border none
        .ivu-modal-footer
            padding-bottom 20px
        .row-container
            padding 20px 30px
        .ivu-row
            border-bottom 1px solid #dddee1
            &:first-child
                border-top 1px solid #dddee1
                background-color rgba(242, 242, 242, 1)
        .ivu-col
            display flex
            align-items center
            height 48px
            border-right 1px solid #dddee1
            text-indent 5px
            font-size 14px
            &:first-child
                border-left 1px solid #dddee1
            &:nth-child(2n)
                font-weight 600
</style>
