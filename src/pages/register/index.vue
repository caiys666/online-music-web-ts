<template>
  <div class="register">
    <div class="register-box">
      <h2>register</h2>
      <h3>Welcome to Cabbage's Website</h3>
      <div class="register-box-account ipt">
        <label class="common">电话</label>
        <i class="iconfont icon-icon-user" />
        <input v-model="userObj.phone" type="text" placeholder="account" />
      </div>
      <div class="register-box-password ipt">
        <label class="common">密码</label>
        <i class="iconfont icon-mima" />
        <input
          v-model="userObj.password"
          type="password"
          placeholder="password"
        />
      </div>
      <div class="register-box-captcha ipt">
        <label class="common">验证码</label>
        <i class="iconfont icon-mima" />
        <input v-model="userObj.captcha" type="text" />
        <button @click="handleGetCaptcha">获取验证码</button>
      </div>
      <div class="register-box-password ipt">
        <label class="common">昵称</label>
        <i class="iconfont icon-mima" />
        <input v-model="userObj.nickname" type="text" />
      </div>
      <button class="register-box-btn" @click="handleregister">register</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import user from '@/api/user'
import './index.less'

@Component
export default class Register extends Vue {
  userObj: any = {
    phone: '',
    password: '',
    captcha: '',
    nickname: ''
  }

  /**
   * 获取验证码
   */
  async handleGetCaptcha() {
    const obj = {
      phone: this.userObj.phone
    }
    try {
      const res = await user.getCaptcha(obj)
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 注册账号
   */
  async handleregister() {
    const obj = {
      phone: this.userObj.phone,
      captcha: this.userObj.captcha
    }
    try {
      const res = await user.validCaptcha(obj)
      if (res.data.code == 200) {
        this.register()
      }
    } catch (error) {}
  }

  async register() {
    try {
      const result = await user.registerUser(this.userObj)
      if (result.data.code == 200) {
        alert('注册成功！请登录')
      }
    } catch (error) {
      console.log(error.msg)
    }
  }
}
</script>

<style scoped></style>
