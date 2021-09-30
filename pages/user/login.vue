<template>
  <div class="page">
    <div class="login-box">
      <p data-v-032893be class="title">欢迎登录粤剧院</p>
      <el-tabs v-model="activeName">
        <el-tab-pane label="密码登录" name="first">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="0"
            class="demo-ruleForm"
          >
            <el-form-item prop="account">
              <el-input
                v-model="ruleForm.account"
                type="text"
                prefix-icon="el-icon-user-solid"
                auto-complete="off"
                placeholder="请输入账号"
              />
            </el-form-item>
            <el-form-item v-if="visible" prop="pass">
              <el-input
                v-model="ruleForm.pass"
                type="password"
                prefix-icon="el-icon-lock"
                auto-complete="off"
                placeholder="请输入密码"
              >
                <i
                  slot="suffix"
                  title="显示密码"
                  style="cursor:pointer;"
                  class="iconfont iconyanjing_kai"
                  @click="changePass('show')"
                />
              </el-input>
            </el-form-item>
            <el-form-item v-else prop="pass">
              <el-input v-model="ruleForm.pass" type="text" auto-complete="off" placeholder="请输入密码">
                <i
                  slot="suffix"
                  title="隐藏密码"
                  style="cursor:pointer;"
                  class="iconfont iconyanjing_bi"
                  @click="changePass('hide')"
                />
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                v-if="!isLog"
                :loading="logining"
                :disabled="true"
                style="width:100%;"
                @click="submitForm('ruleForm')"
              >登录</el-button>
              <el-button
                v-else-if="isLog"
                type="primary"
                :loading="logining"
                style="width:100%;"
                @click="submitForm('ruleForm')"
              >登录</el-button>
              <!-- <p class="login" @click="gotoLogin">已有账号？立即登录</p> -->
            </el-form-item>
            <el-form-item class="login">
              <label id="showPasswordToggle">
                <el-checkbox id="showPasswordCheck" v-model="checked">已阅读并同意《服务协议》</el-checkbox>
              </label>
              <div class="gotoRight">
                <span @click="gotoLoginForget">忘记密码</span>
                <el-divider direction="vertical" />
                <span @click="gotoLoginReg">免费注册</span>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="验证码登录" name="second">
          <el-form
            ref="ruleForm2"
            :model="ruleForm2"
            status-icon
            :rules="rules"
            label-width="0"
            class="demo-ruleForm"
          >
            <el-form-item prop="tel">
              <el-input v-model="ruleForm2.tel" auto-complete="off" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item prop="smscode" class="code">
              <el-input v-model="ruleForm2.smscode" placeholder="短信验证码" />
              <el-button v-if="disabled== 0" :disabled="true" @click="sendCode">{{ buttonText }}</el-button>
              <el-button
                v-else-if="disabled== 1"
                type="primary"
                :disabled="isDisabled"
                class="btn-color"
                @click="sendCode"
              >{{ buttonText }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                v-if="!isLogin"
                :loading="logining"
                :disabled="true"
                style="width:100%;"
                @click="submitForm('ruleForm2')"
              >登录</el-button>
              <el-button
                v-else-if="isLogin"
                type="primary"
                :loading="logining"
                style="width:100%;"
                @click="submitForm('ruleForm2')"
              >登录</el-button>
            </el-form-item>
            <el-form-item class="login">
              <label id="showPasswordToggle">
                <el-checkbox id="showPasswordCheck" v-model="checked">已阅读并同意《服务协议》</el-checkbox>
              </label>
              <div class="gotoRight">
                <span @click="gotoLoginForget">忘记密码</span>
                <el-divider direction="vertical" />
                <span @click="gotoLoginReg">免费注册</span>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { login } from '~/utils/request'
import { setToken } from '~/utils/auth'

export default {
  name: 'Login',
  layout: 'frame',
  data() {
    // <!--验证账号-->
    const account = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    // <!--验证密码-->
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    // <!--验证手机号是否合法-->
    const checkTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!this.checkMobile(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    //  <!--验证码是否为空-->
    const checkSmscode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机验证码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        account: '',
        pass: ''
      },
      ruleForm2: {
        tel: '',
        smscode: ''
      },
      rules: {
        // account: [
        //   { required: true, message: '请输入账号', trigger: 'blur' },
        //   {
        //     pattern: /^(?!(\d+)$)[a-zA-Z\d_]{4,20}$/,
        //     message: '账号长度4-20，可包括数字、字母、下划线',
        //     trigger: 'blur'
        //   },
        //   { validator: account, trigger: 'blur' }
        // ],
        // pass: [
        //   { required: true, message: '请输入密码', trigger: 'blur' },
        //   {
        //     pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
        //     message: '密码长度为6-20位，可以为数字、字母',
        //     trigger: 'blur'
        //   },
        //   { validator: validatePass, trigger: 'blur' }
        // ],
        // tel: [
        //   { required: true, message: '请输入手机号', trigger: 'blur' },
        //   {
        //     pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
        //     message: '请输入正确的11位手机号码',
        //     trigger: 'blur'
        //   },
        //   { validator: checkTel, trigger: 'blur' }
        // ],
        // smscode: [
        //   { required: true, message: '请输入短信验证码', trigger: 'blur' },
        //   {
        //     pattern: /^[0-9]{6}$/,
        //     message: '请输入正确的六位数字验证码',
        //     trigger: 'blur'
        //   },
        //   { validator: checkSmscode, trigger: 'blur' }
        // ]
      },
      activeName: 'first',
      buttonText: '获取短信验证码',
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true,
      visible: true,
      checked: true,
      disabled: 0,
      isLog: false,
      isLogin: false,
      logining: false
    }
  },
  watch: {
    // 账号验证btn按钮显示高亮
    ruleForm: {
      handler() {
        if (this.ruleForm.account !== '' && this.ruleForm.pass !== '') {
          this.isLog = true
        } else {
          this.isLog = false
        }
      },
      deep: true
    },
    // 账手机验证btn按钮显示高亮
    'ruleForm2.tel'() {
      if (this.ruleForm2.tel !== '') {
        this.disabled = 1
      } else {
        this.disabled = 0
      }
    },
    ruleForm2: {
      handler(val, oldval) {
        if (val.tel !== '' && val.smscode !== '') {
          this.isLogin = true
        } else {
          this.isLogin = false
        }
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
  },
  methods: {
    // 密码判断渲染，true:暗文显示，false:明文显示
    changePass(value) {
      this.visible = !(value === 'show')
    },
    // <!--发送验证码-->
    sendCode() {
      const tel = this.ruleForm2.tel
      if (this.checkMobile(tel)) {
        console.log(tel)
        let time = 60
        this.buttonText = '已发送'
        this.isDisabled = true
        if (this.flag) {
          this.flag = false
          const timer = setInterval(() => {
            time--
            this.buttonText = time + ' s'
            if (time === 0) {
              clearInterval(timer)
              this.buttonText = '重新获取'
              this.isDisabled = false
              this.flag = true
            }
          }, 1000)
        }
      }
    },
    // <!--提交登录-->
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.logining = true

          setTimeout(() => {
            this.$router.push({
              path: '/'
            })
            this.$message({
              message: '登录成功！',
              type: 'success'
            })
          }, 400)
        } else {
          console.log('error submit!!')
          this.$router.push({
            path: '/'
          })
          return false
        }
      })
      // login('/login', {
      //   username: 'sys2',
      //   password: 'WjJScFpVQXhNak0wTlRZPQ==',
      //   byMobile: false
      // }).then((res) => {
      //   console.log(res, '++')
      //   if (res.code === '0000') {
      //     setToken(res.data.token)
      //     setToken(res.data.expireTime, 'expire')
      //     window.sessionStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
      //     this.$store.dispatch('changeUserInfo', res.data.userInfo)
      //   }
      // }).catch((err) => {
      //   console.log(err)
      // })
    },
    // <!--免费注册页-->
    gotoLoginReg() {
      this.$router.push({
        path: '/user/register'
      })
    },
    // <!--忘记密码页-->
    gotoLoginForget() {
      this.$router.replace({
        path: '/user/password'
      })
    },
    // 验证手机号
    checkMobile(str) {
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (reg.test(str)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$white-bg-color: #ffffff;
$bg-color: #f7f7f7;
$btn-color: #409eff;
.page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("~/assets/img/login-background.jpg");
  background-size: cover;
  font-size: 16px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  .login-box {
    position: absolute;
    top: 45%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    display: block;
    width: 100%;
    max-width: 400px;
    background-color: $white-bg-color;
    margin: 0;
    padding: 15px 35px;
    box-sizing: border-box;
    // border: solid 1px #ddd;
    border-radius: 0.5em;
    font-family: "Source Sans Pro", sans-serif;
    .title {
      font-size: 20px;
      line-height: 50px;
      font-weight: bold;
      margin: 10px;
      text-align: center;
    }
    /deep/ .el-tabs__header {
      margin: 0 0 30px 0;
    }
    // /deep/ .el-tabs__item {
    //   font-size: 20px;
    //   text-align: center;
    // }
    /deep/ .el-tabs__nav-wrap::after {
      height: 0;
    }
    /deep/ #tab-first::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      width: 1px;
      height: 20px;
      background-color: #dcdfe6;
      margin: 8px 0;
      vertical-align: middle;
    }
    .code /deep/ .el-form-item__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .code button {
      margin-left: 20px;
      width: 140px;
      text-align: center;
    }
    .el-form-item:last-child {
      margin-bottom: 6px;
    }
    .el-button--primary:focus {
      background: $btn-color;
      border-color: $btn-color;
      color: $white-bg-color;
    }
    /deep/ .el-input__suffix-inner {
      margin-right: 6px;
    }
  }
  .login {
    margin-top: -15px;
    font-size: 12px;
    cursor: pointer;
    text-align: left;
    .gotoRight {
      float: right;
      color: #999999;
      &:hover {
        color: $btn-color;
      }
    }
  }
}
</style>
