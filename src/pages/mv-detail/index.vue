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
      <MvVideo :currentMv="currentMv" :mvItem="mvItem" />
    </div>
    <div class="mv-detail__right"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getMusicInfo } from "@/api/getMusic";
import MvVideo from "@/components/mv-video/index.vue";
import "./index.less";

@Component({
  components: { MvVideo },
})
export default class MvDetail extends Vue {
  mvid: any = "";
  // 对应mvid的信息数组
  mvItem: any = "";
  // 当前mv
  currentMv: any = "";
  // 获取mv地址参数对象
  mvUrlParams: any = {
    id: "",
    r: 1080,
  };
  created() {
    /** 获取跳转页面传过来的mvid */
    this.mvid = this.$route.query.id;
    this.getInfoById(this.mvid);
    this.getUrlById(this.mvid);
  }

  /** 根据mvid进行请求mv信息详细数据 */
  getInfoById(id: any) {
    getMusicInfo("/cloud/mv/detail", { params: { mvid: id } }).then((res) => {
      this.mvItem = res.data.data;
    });
  }
  /** 获取mv地址 */
  getUrlById(id: any) {
    this.mvUrlParams.id = id;
    getMusicInfo("/cloud/mv/url", { params: this.mvUrlParams }).then((res) => {
      this.currentMv = res.data.data;
    });
  }
}
</script>

<style scoped></style>
