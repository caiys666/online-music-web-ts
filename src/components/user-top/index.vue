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
      okText="编辑"
      cancelText="取消"
      title="查看并修改个人信息"
      :dialogStyle="dialogStyle"
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
        <input v-if="!visible" type="text" :placeholder="userObj.userName" />
        <br />
        <label class="modal-desc" for="">昵称:</label>
        <span>{{ userObj.nickname }}</span>
        <input v-if="!visible" type="text" :placeholder="userObj.userName" />
        <br />
        <label class="modal-desc" for="">省份:</label>
        <span>{{ userObj.province }}</span>
        <input v-if="!visible" type="text" :placeholder="userObj.userName" />
        <br />
        <label class="modal-desc" for="">城市:</label>
        <span>{{ userObj.city }}</span
        ><input
          v-if="!visible"
          type="text"
          :placeholder="userObj.userName"
        /><br />
        <label class="modal-desc" for="">生日:</label>
        <span>{{ userObj.birthday }}</span>
        <input v-if="!visible" type="text" :placeholder="userObj.userName" />
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Modal } from 'ant-design-vue'
import './index.less'

@Component({
  components: { Modal }
})
export default class UserTop extends Vue {
  userObj: Object = {}
  visible: boolean = false
  dialogStyle = {
    // color: 'red',
    backgroundImage: 'linear-gradient(to right, red)'
  }
  mounted() {
    this.userObj = this.$store.state.userObj
    console.log(this.userObj)
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
    this.visible = false
  }
  /**
   * 修改头像方法
   */
  handleChangeImg() {}
}
</script>

<style scoped></style>
