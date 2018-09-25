<template>
    <Modal
        class="confirm-modal"
        v-model="modal"
        :title="title"
        :width="width"
        :mask-closable="false"
        @on-cancel="modalCancel">
            <div v-if="this.html" v-html="html"></div>
            <slot></slot>
        <div slot="footer">
            <Button type="primary" size="large" @click="modalOk" :disabled="enable">确定</Button>
            <Button size="large" @click="modalCancel">取消</Button>
        </div>
     </Modal>
</template>

<script>
  export default {
    name: "modalValidateForm",
    data () {
      return {
          modal: false,
          width: '500',
          title: '操作提示',
          type: 'confirm',
          html: '',
          data: null,
          enable: false
      }
    },
    methods: {
        modalOk () {
            this.$emit('success', this.data, this.type)
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
    .confirm-modal
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
            text-indent 5px
            font-size 14px
            &:nth-child(2n)
                font-weight 600
            &:nth-child(2n+1)
                text-align  center
</style>
