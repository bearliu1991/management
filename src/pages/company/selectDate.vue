<template>
    <Modal
        class="select-date"
        v-model="modal"
        :title="title"
        :width="width"
        :mask-closable="false"
        @on-cancel="modalCancel">
        <div v-if="$slots.length > 0">
            <slot></slot>
        </div>
        <div v-else>
            <Row>
                <Col span="8">当前套餐：</Col>
                <Col span="16">{{cVersion}}</Col>
            </Row>
            <Row>
                <Col span="8" >原到期时间：</Col>
                <Col span="16">{{ formValidate.expireTime | dateTime}}</Col>
            </Row>
            <Row>
                <Col span="8">选择延期时间：</Col>
                <Col span="16">
                    <DatePicker
                        :value="cDate"
                        @on-change="formValidate.delayExpireTime=$event"
                        ></DatePicker>
                </Col>
            </Row>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" @click="modalOk">确定</Button>
            <Button size="large" @click="modalCancel">取消</Button>
        </div>
     </Modal>
</template>

<script>
  export default {
    name: "modalValidateForm",
    model: {
        prop: 'innerModal',
        event: 'change'
    },
    filters:{
        dateTime(value) {
           return value ? value.substring(0, 10) : ''
        }
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
        innerModal: {
            type: Boolean,
            default: false
        },
        version: {
            type: Array,
            default: function () { return [] }
        }
    },
    data () {
      return {
          modal: false,
          formData: {},
          date: ''
      }
    },
    computed: {
        cVersion() {
            return this.formValidate.version
        },
        cDate() {
            console.log(this.formValidate.delayExpireTime)
            return this.formValidate.delayExpireTime
        }
    },
    watch: {
        modal(val) {
            !val && this.$emit('change', false)
        },
        innerModal(val) {
            val && (this.modal = true)
        }
    },
    methods: {
        modalOk () {
            this.$emit('success', this.formValidate)
        },
        afterOk (val1, val2) {
            if (val1) {
                this.$emit('success', JSON.parse(JSON.stringify(val2)), this.type)
            }
        },
        modalCancel () {
           this.modal = false;
        },
        visibleModal() {
            this.$emit('change', false)
        }
    }
  }
</script>

<style lang="stylus">
    .select-date
        .ivu-date-picker-cells
            width: 204px
        .ivu-modal-header-inner
            font-size 16px
            font-weight 700
        .item-width
            width 200px
        .ivu-modal-content
            padding 10px
        .ivu-modal-footer
            border none
        .ivu-modal-footer
            padding-bottom 20px
        .row-container
            padding 20px 30px
        .ivu-row:last-child
            margin-bottom 100px
        .ivu-col
            display flex
            align-items center
            height 36px
            font-size 14px
            &:nth-child(2n)
                font-weight 600
            &:nth-child(2n+1)
                text-align  center
</style>
