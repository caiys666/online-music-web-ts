<template>
  <div class="login">
    <div class="login-box">
      <h2>Login</h2>
      <h3>Welcome to Cabbage's Website</h3>
      <div class="login-box-account ipt">
        <i class="iconfont icon-icon-user" />
        <input v-model="userObj.phone" type="text" placeholder="account" />
      </div>
      <div class="login-box-password ipt">
        <i class="iconfont icon-mima" />
        <input
          v-model="userObj.password"
          type="password"
          placeholder="password"
        />
      </div>
      <button class="login-box-btn" @click="handleLogin">Login</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import user from '@/api/user'
import './index.less'

@Component
export default class Login extends Vue {
  userObj: Object = {
    phone: '',
    password: ''
  }
  created() {}
  /**
   * 用户点击进行登录
   */
  async handleLogin() {
    try {
      const res = await user.getUserLogin(this.userObj)
      if (res && res.status == 200) {
        const userObj = {
          userName: res.data.account.userName,
          nickname: res.data.profile.nickname,
          gender: res.data.profile.gender,
          avatarUrl: res.data.profile.avatarUrl,
          backgroundUrl: res.data.profile.backgroundUrl,
          province: res.data.profile.province,
          city: res.data.profile.city,
          birthday: res.data.profile.birthday,
          signature: res.data.profile.signature,
          token: res.data.token
        }
        this.$store.commit('setUserInfo', userObj)
        this.$router.push({
          name: 'Main'
        })
        console.log(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped></style>
