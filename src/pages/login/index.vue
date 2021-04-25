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
  async handleLogin() {
    console.log(111)
    try {
      const res = await user.getUserLogin(this.userObj)
      if (res && res.status == 200) {
        this.$router.push({
          name: 'Main'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped></style>
