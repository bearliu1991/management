<template>
  <div id="register">
    <form>
      <h1>我是注册页面</h1>
      <div class="name input_div">
        <input placeholder='请输入用户名' v-model="username">
      </div>
      <div class="name input_div">
        <input placeholder='请输入手机号' v-model="mobile">
      </div>
      <div class="psw input_div">
        <input type='password' placeholder='请输入密码' v-model="psw">
      </div>
      <div class='submit' @click="submit">注册</div>
      <div class="router">
        <a>记住密码</a>
        <router-link to="/login">登陆</router-link>
        <a>忘记密码</a>
      </div>
      <input hidden v-model="regType">
    </form>
  </div>
</template>

<script>
  // 判断账户类型
  function type (account) {
    if (account) {
      return 'ACCOUNT'
    }
    return 'ACCOUNT'
  }

  export default {
    name: 'register',
    data () {
      return {
        username: '',
        psw : '',
        mobile : '',
        regType : ''
      }
    },
    created() {},
    methods: {
      // PC_WEB_CHAT//pc端web聊天系统 PC_DESKTOP_CHAT//pc端桌面聊天系统 PC_WEB_ADMIN//pc端web管理系统 PC_WEB_MANAGE//pc端web运营管理系统
      async submit () {
        let res = await this.register({
          username : this.username,
          psw : this.psw,
          mobile : this.mobile,
          regType : type(this.username),
          platformType : 'PC_WEB_MANAGE',
          autoLogin : true // 注册完是否自动登陆
        })
        let obj = res.data || {}
        if (obj.code === 1) {
          this.$router.push('/sys')
        } else {
          location.reload()
        }
      }
    },
    components: {}
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #register
    setMiddle()
    height: 100%
    form
      width:400px
      .input_div
        margin:10px 0
        input
          width: 100%
          height:40px
          padding-left:20px
      .submit
        margin-top:20px
        vertical(40px)
        color()
        bgColor(blue)
        cursor:pointer
      .router
        margin-top:10px
        display:flex
        justify-content:space-between
</style>
