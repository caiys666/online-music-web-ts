<template>
  <div class="main">
    <div class="main__nav-content">
      <Nav @checkComponent="checkComponent" />
      <div class="content">
        <UserTop />
        <keep-alive>
          <component :is="currentComponent"></component>
        </keep-alive>
      </div>
    </div>
    <Play />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Nav from "@/components/nav/index.vue";
import UserTop from "@/components/user-top/index.vue";
import Play from "@/components/play/index.vue";
import HomePage from "@/pages/main/content/home-page/index.vue";
import "./main.less";

@Component({
  components: { Nav, UserTop, Play, HomePage },
})
export default class Main extends Vue {
  currentComponent = HomePage;
  /** 监听store中的数据变化 */
  @Watch("$store.state.current", { immediate: true, deep: true })
  getCurrentComponent(newValue: any) {
    if (newValue.currentComponent) {
      this.currentComponent = newValue.currentComponent;
    }
  }

  checkComponent(component: any) {
    this.currentComponent = component;
    console.log(this.currentComponent);
  }
}
</script>

<style lang="less" scoped></style>
