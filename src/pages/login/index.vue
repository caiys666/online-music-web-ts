<template>
  <div class="login">
    <div class="login-box">
      <h2>Login</h2>
      <h3>Welcome to Cabbage's Website</h3>
      <div class="login-box-account ipt">
        <label class="common" for="">电话</label>
        <i class="iconfont icon-icon-user" />
        <input v-model="userObj.phone" type="text" placeholder="account" />
      </div>
      <div class="login-box-password ipt">
        <label class="common" for="">密码</label>
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
import { Component, Vue, Watch } from 'vue-property-decorator'
import user from '@/api/user'
import Moment from 'moment'
import './index.less'

@Component
export default class Login extends Vue {
  userObj: Object = {
    phone: '',
    password: ''
  }

  // @Watch('$route', { immediate: true, deep: true })
  // reloadLogin(newValue: any, oldValue: any) {
  //   if (newValue.name !== oldValue.name) {
  //     if (newValue.name === 'Login') {
  //       location.reload()
  //     }
  //   }
  // }

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
          birthday: Moment(res.data.profile.birthday),
          signature: res.data.profile.signature
        }
        localStorage.setItem('userInfo', JSON.stringify(userObj))
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
