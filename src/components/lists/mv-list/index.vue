<template>
  <div class="my-list">
    <div class="my-list__switch">
      <i
        :class="{ actived: isGrid }"
        class="iconfont iconziyuan"
        @click="handleSwitch(1)"
      ></i>
      <i
        :class="{ actived: !isGrid }"
        class="iconfont iconliebiao"
        @click="handleSwitch(0)"
      ></i>
    </div>
    <div :class="[isGrid ? 'layout-entry' : 'grid-entry']">
      <div
        :class="[isGrid ? 'layout-entry__item' : 'grid-entry__item']"
        v-for="(item, index) in 10"
        :key="item"
      >
        <div class="item">
          <div class="item-img">
            <div
              class="mvimg"
              :style="[
                {
                  background: `url(${srcUrl})`,
                },
              ]"
            >
              <i class="iconfont iconicon_play"></i>
            </div>
            <span class="mvduration">05:35</span>
          </div>
          <div class="item-desc">
            <div class="item-title">当时的我害怕极了</div>
            <div class="item-info">
              <div class="info">
                <i class="iconfont iconicon_play"></i>
                <span>255万</span>
              </div>
              <div class="info">
                <i class="iconfont iconshi_jian"></i>
                <span>2020-12-12</span>
              </div>
              <div class="info">
                <i class="iconfont iconuser-01"></i>
                <span class="author">cabbage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "./index.less";

@Component
export default class MvList extends Vue {
  // 选择网格布局还是线性布局标志
  isGrid: boolean = true;
  srcUrl = require("../../../assets/images/dilireba@2x.jpg");
  /** 进行切换布局  1代表网格布局  0代表线性布局 */
  handleSwitch(index: number) {
    if (index === 1) {
      this.isGrid = true;
    } else if (index === 0) {
      this.isGrid = false;
    }
  }
}
</script>

<style scoped></style>
