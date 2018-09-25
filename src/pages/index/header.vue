<template>
  <div id="header" v-show="showHeader">
    <div class="logo">
      <span class="logo-font">迎客通运营系统</span>
    </div>
    <div class="right_p">
      <div v-if="isLogin">
        <a href="javascript:void(0)" class="avatar" >
            <img src="../../assets/16.png" alt="">
        </a>
        <a href="javascript:void(0)"><span class="nickname">{{nickName}}</span></a>
        <a href="javascript:void(0)" @click="submit"><Icon type="log-out"></Icon></a>
        <a href="javascript:void(0)" @click="setting"><Icon type="ios-gear-outline"></Icon></a>
        <a href="javascript:void(0)"><Icon type="ios-help-outline"></Icon></a>
      </div>
      <div v-else>
        <router-link to="/login" class="go_login" >登陆</router-link>
        <router-link to="/register" class="go_reg">注册</router-link>
      </div>
    </div>
    <Infosetting
        :formValidate='formValidate'
        v-model="modal"
        title="账户信息">
            <FormItem label="用户名" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="旧密码" prop="oldPassword">
                <Input v-model="formValidate.oldPassword" placeholder="请输入旧密码" type="password"></Input>
            </FormItem>
            <FormItem label="新密码" prop="password">
                <Input v-model="formValidate.password" placeholder="请输入新密码" type="password"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="confirmPassword">
                <Input v-model="formValidate.confirmPassword" placeholder="请输入确认密码" type="password"></Input>
            </FormItem>
    </Infosetting>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  let noHeaderArr = ['/login', '/register']
  // 需要隐藏url的路由
  function testUrl(href) {
    // 判断当前url是否需要隐藏header
    return noHeaderArr.some((item, index) => { return href.indexOf(item) > -1 });
  }
  export default {
    name: "topHeader",
    components: {
        Infosetting: () => import('@/components/syscomponents/modalValidateForm.vue')
    },
    data() {
      return {
        showHeader : true,
        modal: false,
        refName:'',
        formValidate: {
            name: '',
            oldPassword: '',
            password: '',
            confirmPassword: ''
        }
      }
    },
    created () {
      this.showHeader = !testUrl(location.href)
    },
    watch: {
      '$route' (to, from) {
        this.showHeader = !testUrl(to.path)
      }
    },
    computed: {
      ...mapState({
        nickName : state => { return state.public.userInfo.nickName },
        isLogin : state => { return state.public.isLogin }
      })
    },
    methods: {
        async submit () {
            await this.logout()
            this.$router.push('/login')
        },
        setting () {
            this.modal = true
        }
    }
  }
</script>

<style lang="stylus">
@import '~@/assets/css/customerVar.styl'
  #header
    height ykt_header_height
    background-color ykt_color1
    .logo
      float left
      height ykt_header_height
      line-height ykt_header_height
      .logo-font
        padding-left 35px
        color #ffffff
        font-size 20px
        font-weight 700
      img
        max-height ykt_header_height
    .right_p
      float right
      height:ykt_header_height
      display:flex
      justify-content: flex-end
      align-items center
      font-size 16px
      a
        margin-right 10px
        img
          vertical-align bottom
        .nickname
          display table-cell
          color #fff
      i
        font-size 1.2em
        color #fff
</style>
