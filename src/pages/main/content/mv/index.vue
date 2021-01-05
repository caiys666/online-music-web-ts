<template>
  <div class="mv">
    <!-- <mv-banner :bannerList="bannerList" /> -->
    <div class="mv__search">
      <img
        class="mv__search__logo"
        src="../../../../assets/images/girl@2x.png"
        alt=""
      />
      <el-input placeholder="请输入内容"> </el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <div class="mv__sort">
      <div
        class="mv__sort__area item"
        v-for="(item, index) in sortList"
        :key="index"
      >
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getMusicInfo } from "@/api/getMusic";
import MvBanner from "@/components/banner/mv-banner/index.vue";
import "./index.less";
// import '../../../../assets'

@Component({
  components: { MvBanner },
})
export default class Mv extends Vue {
  // 轮播图数组
  bannerList: any = [];
  // 排序数组
  sortList: any = [
    {
      title: "全部地区",
      item: [
        { desc: "全部", type: "area" },
        { desc: "内地", type: "area" },
        { desc: "港台", type: "area" },
        { desc: "欧美", type: "area" },
        { desc: "日本", type: "area" },
        { desc: "韩国", type: "area" },
      ],
    },
    {
      title: "全部版本",
      item: [
        { desc: "全部", type: "type" },
        { desc: "官方版", type: "type" },
        { desc: "原生", type: "type" },
        { desc: "现场版", type: "type" },
        { desc: "网易出品", type: "type" },
      ],
    },
    {
      title: "综合排序",
      item: [
        { desc: "上升最快", type: "order" },
        { desc: "最热", type: "order" },
        { desc: "最新", type: "order" },
      ],
    },
  ];
  mounted() {
    let getBanner = getMusicInfo;
    /** 获取推荐mv进行轮播 */
    getBanner("/cloud/personalized/mv").then((res) => {
      this.bannerList = res.data.result;
      console.log(this.bannerList);
    });
  }
}
</script>

<style scoped></style>
