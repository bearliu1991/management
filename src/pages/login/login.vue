<template>
  <div id="login">
    <Form class="login-form" ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="60">
        <!-- <h1>欢迎登录运营管理平台</h1> -->
        <FormItem label="账号" prop="username">
            <Input type="text" v-model="formCustom.username"  placeholder='请输入用户名' @keyup.native.enter="handleSubmit('formCustom')"></Input>
        </FormItem>
        <FormItem label="密码" prop="psw">
            <Input type="password" v-model="formCustom.psw"  placeholder='请输入密码' @keyup.native.enter="handleSubmit('formCustom')"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click.prevent="handleSubmit('formCustom')">登录</Button>
            <router-link :to="{name: 'register'}">注册</router-link>
            <!-- <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button> -->
        </FormItem>
        <!-- <Button type="primary" @click="getIp">getIp</Button> -->
    </Form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'login',
    data () {
      const validateName = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请输入用户名'));
          } else {
              callback();
          }
      };
      const validatePass = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请输入密码'));
          } else {
            callback();
          }
      };
      return {
        activeEl: null,
        SELECTION: null,
        logining: false,
        formCustom: {
            username: '13156521719',
            psw: '111111'
        },
        ruleCustom: {
            username: [
                { validator: validateName, trigger: 'blur' }
            ],
            psw: [
                { validator: validatePass, trigger: 'blur' }
            ]
        }
      }
    },
    computed : {
      ...mapGetters(['public/user'])
    },
    methods: {
      submit () {
        //   this.$router.addRoutes(this.menuitems)
        console.log('login')
        if (!this.logining) {
            this.logining = true
            this.login(this.formCustom)
                .then(res => {
                    this.logining = false
                    if (res.code === 1) {
                    // this.$store.dispatch('public/getRouteMap')
                    // this.$router.push('/sys/sensitive')
                    // this.$router.push('/sys/dataLib')sys/authority

                    // if (this.ieVersion < 10) {
                    //     this.setCookie('sessionId', res.data.sessionId, 1)
                    // }
                        // this.setCookie('sessionId', res.data.sessionId, 1)
                        this.$router.push({name: 'company'})
                    } else {
                        this.$router.push({name: 'login'})
                    }
                }).catch(() => {
                    this.$router.push({name: 'login'})
                })
        }
        setTimeout(() => {
            this.logining = false
        }, 5000);
      },
      handleSubmit (name) {
        this.$refs[name].validate(valid => {
            if (valid) {
                this.submit()
            } else {
                this.$Message.error('Fail!');
            }
        })
      },
      handleReset (name) {
          this.$refs[name].resetFields();
      },
      getIp() {
          this.$post('/clientip').then((res) => {
              console.log(res.data)
              alert(res.data)
          })
      }
    }
  }
</script>

<style lang="stylus">
  @import '~@/assets/css/index.styl'
  body
    padding-top: 0
  #login
    background #c3bbbb
    setMiddle()
    height 100%
    .form
      width 400px
      .input_div
        margin 10px 0
        input
          width 100%
          height 40px
          padding-left 20px
      .submit
        margin-top 20px
        vertical(40px)
        color()
        bgColor(blue)
        cursor pointer
      .router
        margin-top 10px
        display flex
        justify-content space-between
  .login-form
    width 400px;
    height 226px;
    border-radius 5px;
    border 1px solid #999;
    background #fff;
    padding 20px;
  .ivu-form .ivu-form-item-label
    font-size 15px
</style>
