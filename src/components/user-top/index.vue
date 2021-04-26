<template>
  <div class="user-top">
    <div class="user">
      <div
        class="user__img"
        v-bind:style="{ backgroundImage: 'url(' + userObj.backgroundUrl + ')' }"
        @click="handleShowModal"
      ></div>
      <div class="user__name">{{ userObj.userName }}</div>
    </div>
    <Modal
      v-model="visible"
      :okText="editTitle"
      cancelText="取消"
      title="查看并修改个人信息"
      @ok="handleOk"
    >
      <div class="modal">
        <div
          class="modal-img"
          v-bind:style="{
            backgroundImage: 'url(' + userObj.backgroundUrl + ')'
          }"
          @click="handleChangeImg"
        ></div>
        <label class="modal-desc" for="">用户名:</label>
        <span>{{ userObj.userName }}</span>
        <br />
        <label class="modal-desc" for="">昵称:</label>
        <span v-if="!isEdit">{{ userObj.nickname }}</span>
        <input
          v-else
          type="text"
          :placeholder="userObj.nickname"
          @input="e => handleChangeInfo(e, 'nickname')"
        />
        <br />
        <label class="modal-desc" for="">性别:</label>
        <span v-if="!isEdit">{{
          userObj.gender == 0 ? '保密' : userObj.gender == 1 ? '男性' : '女性'
        }}</span>
        <span v-else>
          <input type="radio" value="0" v-model="userGender" />
          <label for="">保密</label>
          <input type="radio" value="1" v-model="userGender" />
          <label for="">男性</label>
          <input type="radio" value="2" v-model="userGender" />
          <label for="">女性</label>
        </span>
        <br />
        <label class="modal-desc" for="">省份:</label>
        <span v-if="!isEdit">{{ userObj.province }}</span>
        <input v-else type="text" :placeholder="userObj.province" />
        <br />
        <label class="modal-desc" for="">城市:</label>
        <span v-if="!isEdit">{{ userObj.city }}</span
        ><input v-else type="text" :placeholder="userObj.city" /><br />
        <label class="modal-desc" for="">生日:</label>
        <span v-if="!isEdit">{{ userObj.birthday }}</span>
        <el-date-picker
          v-else
          v-model="userObj.birthday"
          type="date"
          placeholder="选择日期"
          @change="handleChangeDate"
        >
        </el-date-picker>
        <br />
        <label class="modal-desc" for="">个性签名:</label>
        <span v-if="!isEdit">{{ userObj.signature }}</span>
        <input v-else type="text" :placeholder="userObj.signature" />
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Modal, DatePicker } from 'ant-design-vue'
import Moment from 'moment'
import user from '@/api/user'
import userFunc from '@/utils/userFunc'
import './index.less'

@Component({
  components: { Modal, DatePicker }
})
export default class UserTop extends Vue {
  userObj = {}
  visible: boolean = false
  isEdit: boolean = false
  editTitle: String = '编辑'
  userGender = 0
  updateUserInfo = {
    nickname: '',
    gender: 0,
    birthday: this.$store.state.userObj.birthday,
    province: 210000,
    city: 210100,
    signature: ''
  }
  mounted() {
    this.userObj = this.$store.state.userObj
    this.userGender = this.$store.state.userObj.gender
    this.updateUserInfo.gender = this.userGender
    this.updateUserInfo.nickname = this.$store.state.userObj.nickname
  }
  /**
   * 打开弹出框方法
   */
  handleShowModal() {
    this.visible = true
  }
  /**
   * 确定并且修改个人信息方法
   */
  handleOk() {
    if (this.isEdit) {
      this.handleUpdateUser()
      // this.visible = false
    } else {
      this.isEdit = true
      this.editTitle = '确定'
    }
  }

  /**
   * 更新用户数据
   */
  async handleUpdateUser() {
    this.updateUserInfo.gender = this.userGender
    console.log(this.updateUserInfo)
    try {
      const res = await user.updateUserInfo(this.updateUserInfo)
      if (res.data.code == 200) {
        this.handleGetUserInfo()
        this.visible = false
        this.editTitle = '编辑'
        this.isEdit = false
      }
      if (res.data.code == 400) {
        console.log(res.data.msg)
        this.visible = true
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 获取用户信息和存储
   */
  handleGetUserInfo() {
    this.$nextTick(async () => {
      const result = await user.getUserDetail()
      if (result.data) {
        this.userObj = userFunc.saveUser(result.data)
        this.$store.commit('setUserInfo', this.userObj)
        console.log(this.userObj)
      }
    })
  }

  /**
   * 修改用户信息方法
   */
  handleChangeInfo(e?: any, flag?: String) {
    const target = e.target
    if (target) {
      switch (flag) {
        case 'nickname':
          this.updateUserInfo.nickname = target.value
          break
        default:
          break
      }
    }
  }

  /**
   * 修改生日
   */
  handleChangeDate(value: any) {
    this.updateUserInfo.birthday = Moment(value).unix()
  }

  /**
   * 修改头像方法
   */
  handleChangeImg() {}
}
</script>

<style scoped></style>
