<template>
    <Modal
        v-model="popup"
        :title="title"
        :width="width"
        @on-cancel="modalCancel">
        <slot></slot>
        <div slot="footer">
            <!-- <Button type="primary" size="large" @click="modalOk">确定</Button> -->
        </div>
     </Modal>
</template>
<script>
  export default {
    name: "Modalpopup",
    components: {},
    props: {
        title:{
            type: String,
            default:'ykt'
        },
        width:{
            type: String,
            default:'500'
        }
    },
    data() {
      return {
          popup: false
      }
    },
    methods: {
        modalOk () {
            this.popup = false;
            this.$Message.info('Clicked ok');
        },
        afterOk (val1, val2) {
            console.log(val1, val2)
        },
        modalCancel () {},
        afterCancel (val) {
            console.log(val)
        }
    }
  }
</script>
<style lang="stylus" scoped>
</style>
