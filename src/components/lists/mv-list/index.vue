<template>
  <div class="my-list">
    <div class="my-list__switch">
      <i class="iconfont iconziyuan"></i>
      <i class="iconfont iconliebiao"></i>
    </div>
    <div class="my-list__entry">
      <div class="my-list__entry__item" v-for="(item, index) in 10" :key="item">
        <div class="item">
          <div class="item-img">
            <div
              class="mvimg"
              :style="[
                {
                  background: `url(${srcUrl})`,
                },
              ]"
            ></div>
            <span class="mvduration">05:35</span>
          </div>
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "./index.less";

@Component
export default class MvList extends Vue {
  srcUrl = require("../../../assets/images/dilireba@2x.jpg");
}
</script>

<style scoped></style>
