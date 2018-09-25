<template>
    <div id="contextmenu" v-show="isShow" :style="{top: position.y + 'px', left: position.x + 'px'}"> <!--:style="{top: position.y + 'px', left: position.x + 'px'}"-->
      <ul>
        <li class="copy" @click="copy">复制</li>
        <li class="go_top" @click="goTop">置顶</li>
        <li class="translate" @click="translate">翻译</li>
        <li class="transfer_to_text" @click="toText">转换成文字</li>
        <li class="add_remark" @click="remark">添加到备注</li>
        <li class="add_name" @click="addName">添加到姓名</li>
        <li class="store" @click="store">添加到收藏</li>
        <li class="add_phone" @click="addPhone">添加到手机号</li>
        <li class="del_chat" @click="delChat">删除聊天</li>
        <li class="open_new_blank" @click="newWin">在独立窗口打开</li>
      </ul>
    </div>
</template>

<script>
  export default {
    name: "contextmenu",
    model: {
      prop: 'isShow',
      event: 'close'
    },
    props: ['isShow', 'position'],
    methods: {
      copy () {
        // this.obj
      },
      goTop () {

      },
      translate () {

      },
      toText () {

      },
      remark () {

      },
      addName () {

      },
      store () {

      },
      addPhone () {

      },
      delChat () {

      },
      newWin () {

      }
    },
    created() {
      console.error(this.show)
    },
    mounted() {
      let self = this
      document.addEventListener('click', function () {
        self.$emit('close', false)
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #contextmenu
    fixed()
    width:120px
    bgColor()
    radius(5px)
    ul
      padding:10px 0
      li
        vertical(24px)
        padding:0 10px
        cursor()
        &:hover
          bgColor(#ebebeb)
</style>
