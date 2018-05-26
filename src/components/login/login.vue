<!--
描述：用户登录组件
开发人：桑杨
开发日期：2017年7月14日
-->

<template lang="pug">
  div.login(data-logig)
    div.from-warpper
      div.form
        div.tit 欢迎使用，请登录
        el-form.loginForm(v-bind:model="loginForm" v-bind:rules="rules" ref="loginForm"
        v-bind:show-message="false")
          div.error-message(v-if="error.flag") {{error.message}}
          el-form-item.kalix-form-item(prop="name")
            el-input(v-model="loginForm.name" placeholder="账号" ref="loginFormName")
          el-form-item.kalix-form-item(prop="pass")
            el-input(type="password" v-model="loginForm.pass" ref="loginFormPass" placeholder="密码" auto-complete="off")
          el-form-item.kalix-form-item
            div.s-flex.validate-code
              div.s-flex_item
                el-input(v-model="validateCode" placeholder="验证码")
              div.img-wrapper
                <!--img(src="/static/images/validate-code.png")-->
              div.code(@click="refreshCode")
                s-identify(:identifyCode="identifyCode")
          el-form-item(label="")
            el-button.btn-submit(v-on:click="onSubmit()" size="large") 确　　　定
</template>

<script type="text/ecmascript-6">
import Login from 'api/login'
import {logoutUrl} from 'config/global.toml'

export default {
  name: 'LoginForm',
  data() {
    return {
      validateCode: '',
      loginForm: {
        name: '',
        pass: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 8, message: '用户名长度在 2 到 8 个字符', trigger: 'blur'}
        ],
        pass: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      error: {
        flag: false,
        message: ''
      },
      identifyCodes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      identifyCode: ''
    }
  },
  activated() {
    this.loginForm = {name: '', pass: ''}
    console.log('this.$KalixEventBus', this.$KalixEventBus)
  },
  mounted() {
    this.$http.get(logoutUrl).then(res => {
      console.log('res', res)
    })
    this.tabInput()
    console.log('window.config', window.config)
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    onSubmit(formName) {
      if (this._validateForm()) {
        this.login()
      }
    },
    login() {
      //  登录
      let that = this
      Login.remoteLogin({
        'username': that.loginForm.name,
        'password': that.loginForm.pass
      }).then(data => {
        if (data.success) {
          this.$KalixCatch.save('id', data.user.id)
          this.$KalixCatch.save('access_token', data.access_token)
          this.$KalixCatch.save('user_token', data.user.token)
          this.$KalixCatch.save('user_name', data.user.name)
          this.$KalixCatch.save('loginname', that.loginForm.name)
          // 在缓存中记录最后登录时间，处理单用户登录需求
          let now = new Date().getTime()
          this.$KalixCatch._saveLocal('lastLoginTime', now)
          this.$KalixCatch.save('lastLoginTime', now)
          this.$router.push({path: '/'})
        } else {
          this.$refs.loginFormName.focus()
          this.$KalixMessage.error(data.message)
        }
      }).catch(error => {
        console.log('login error ', error)
        this.$refs.loginFormName.focus()
        this.$KalixMessage.error(error.message)
      })
    },
    _validateForm() {
      //  验证表单
      for (let key in this.rules) {
        this.error.flag = false
        this.error.message = ''
        this.$refs.loginForm.validateField(key, errorMessage => {
          //  如果错误信息长度 > 0 表示验证不通过
          this.error.flag = errorMessage.length > 0
          this.error.message = errorMessage
        })
        if (this.error.flag) {
          return false
        }
      }
      return true
    },
    tabInput() {
      let ipts = document.getElementsByClassName('el-input__inner')
      for (let i = 0; i < ipts.length; i++) {
        ipts[i].addEventListener('keydown', e => {
          if (e.keyCode === 13) {
            if (ipts[i + 1]) {
              ipts[i + 1].focus()
            } else {
              document.getElementsByClassName('btn-submit')[0].focus()
            }
          }
        })
      }
    },
    listen() {
      this.error.flag = false
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
      console.log(this.identifyCode)
    }
  },
  components: {},
  computed: {},
  watch: {
    loginForm: {
      handler: 'listen',
      // 深度观察
      deep: true
    }
  }
}
</script>
<style lang="stylus" type="text/stylus">
  @import "./login.styl"
  .code
    margin 20px auto
    width 114px
    height 40px
    border 1px solid red

  h1
    font-weight normal

  h2
    font-weight normal

  ul
    list-style-type none
    padding 0px

  li
    display inline-block
    margin 0px 10px

  a
    color #42b983

  .link
    cursor pointer
    background-color #d7d7d7
</style>
