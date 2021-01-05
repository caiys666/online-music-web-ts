<template>
  <div v-show="isEmptySongLists" class="play">播放条</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import "./index.less";

@Component
export default class Play extends Vue {
  // 设置当前歌曲数组是否有值
  isEmptySongLists = false;
  @Watch("$store.state.songLists", { immediate: true, deep: true })
  setPlay(newValue: any) {
    if (newValue.length > 0) {
      this.isEmptySongLists = true;
    }
  }
}
</script>

<style scoped></style>
