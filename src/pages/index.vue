<template>
  <div class="pages">
    <div class="pages-switch">
      <button class="pages-switch-toggle" @click="handleSwitch">
        {{ switchText }}
      </button>
    </div>
    <component :is="currentComponent"></component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Login from './login/index.vue'
import Register from './register/index.vue'

@Component({
  components: { Login, Register }
})
export default class Pages extends Vue {
  currentComponent: any = Login
  switchText = '注册'

  handleSwitch() {
    this.switchText = this.switchText == '注册' ? '登录' : '注册'
    this.currentComponent = this.currentComponent == Login ? Register : Login
  }
}
</script>

<style lang="less" scoped>
.pages {
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to right, #292a2a, #97cfbe);
  &-switch {
    position: absolute;
    right: 10px;
    top: 20px;
    &-toggle {
      outline: none;
      background: transparent;
      border: none;
      border-radius: 5px;
      font-size: 18px;
      cursor: pointer;
      background-color: #74afaf;
    }
  }
}
</style>
