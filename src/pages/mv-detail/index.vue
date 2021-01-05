<template>
  <div class="mv-detail">
    <div class="mv-detail__left">
      <div class="mv-info">
        <div class="mv-info__name">{{ mvItem.name }}</div>
        <div class="mv-info__introduce">
          <div class="info">
            <span>{{ mvItem.playCount }}播放</span>
          </div>
          <div class="info">
            <span>{{ mvItem.commentCount }}评论</span>
          </div>
          <div class="info">
            <span>发布时间：{{ mvItem.publishTime }}</span>
          </div>
        </div>
      </div>
      <div class="mv-video">
        <video ref="video" src="../../assets/video/bilibili.mp4"></video>
      </div>
    </div>
    <div class="mv-detail__right"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getMusicInfo } from "@/api/getMusic";
import "./index.less";

@Component
export default class MvDetail extends Vue {
  mvid: any = "";
  //   对应mvid的信息数组
  mvItem: any = "";
  created() {
    this.mvid = this.$route.query.id;
    console.log(typeof this.mvid);
    this.getInfoById(this.mvid);
  }
  /** 根据mvid进行请求数据 */
  getInfoById(id: any) {
    getMusicInfo("/cloud/mv/detail", { params: { mvid: id } }).then((res) => {
      console.log(res.data.data);
      this.mvItem = res.data.data;
    });
  }
}
</script>

<style scoped></style>
