<template>
  <div class="homepage">
    <div class="homepage__category">
      <div
        class="homepage__category__selected"
        v-for="(item, index) in categoryList"
        :key="index"
        :class="[item.selected ? 'selected' : '']"
        @click="handleClickCategory(item)"
      >
        {{ item.title }}
      </div>
    </div>
    <component :is="currentComponent" :songSheetUrl="songSheetUrl" />
  </div>
</template>

<script lang="ts">
import { getBanner, getTest } from "@/api/getMusic.ts";
import { Component, Vue, Watch } from "vue-property-decorator";
import Selected from "./selected/index.vue";
import Rank from "./rank/index.vue";
import SongCategory from "./song-category/index.vue";
import "./index.less";

@Component({
  components: { Selected, Rank, SongCategory },
})
export default class HomePage extends Vue {
  list = [];
  bannerList = [];
  songSheetUrl = "/top/playlist";
  currentComponent = Selected;
  categoryList = [
    {
      title: "精选",
      selected: true,
      url: "/top/playlist",
      component: Selected,
    },
    {
      title: "歌单分类",
      selected: false,
      url: "/playlist/catlist",
      component: SongCategory,
    },
    {
      title: "排行榜",
      selected: false,
      url: "/toplist/detail",
      component: Rank,
    },
  ];
  mounted() {
    let list = getBanner();
    list.then((response: any) => {
      this.list = response;
    });
  }
  /** 点击切换歌单 */
  handleClickCategory(item: any) {
    this.categoryList.map((k) => {
      k.selected = false;
    });
    item.selected = true;
    this.currentComponent = item.component;
    this.songSheetUrl = item.url;
  }
}
</script>

<style scoped></style>
