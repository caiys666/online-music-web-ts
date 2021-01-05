<template>
  <div class="play-list">
    <div class="play-list__left">
      <div v-if="songLists && songIds">
        <div
          class="songs"
          v-for="(item, index) in songIds"
          :key="index"
          :class="{ active: currentIndex === index }"
          @click="handleSwichSong(item, index)"
        >
          <div class="songs__index sitem">{{ index + 1 }}</div>
          <div class="songs__sname sitem">{{ songIds[index].name }}</div>
          <div class="songs__author ">
            <span v-for="(aitem, aindex) in songIds[index].ar" :key="aindex"
              >{{ aitem.name }},</span
            >
          </div>
          <div class="songs__time sitem">4:35</div>
        </div>
      </div>
      <div class="next" style="margin-bottom:60px">下一页</div>
    </div>
    <div class="play-list__right">
      <div class="current">
        <img :src="currentSongInfo.picture" alt="" class="current__img" />
        <div class="current__sname">{{ currentSongInfo.sname }}</div>
        <div class="current__sname">{{ currentSongInfo.author }}</div>
        <div class="current__lyric">
          <p>{{ currentSongInfo.lyric }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import "./index.less";

@Component
export default class PlayList extends Vue {
  // 当前选中item的索引index
  currentIndex = 0;
  // 歌曲id数组
  songIds: any = [];
  // 歌曲列表数组
  songLists: any = [];
  // 歌词列表
  songLyric: any = [];
  // 当前播放的歌曲信息
  currentSongInfo: any = {
    picture: "",
    sname: "",
    author: "",
    lyric: "",
  };
  /** 监听歌曲url数组的变化 */
  @Watch("$store.state.songLists", { immediate: true, deep: true })
  getSongLists(newValue: any) {
    this.songLists = newValue;
  }
  /** 监听歌曲id数组的变化啊 */
  @Watch("$store.state.songIds", { immediate: true, deep: true })
  getSongIds(newValue: any) {
    this.songIds = newValue;
    this.currentSongInfo.picture = this.songIds[0].al.picUrl;
    this.currentSongInfo.sname = this.songIds[0].name;
    this.currentSongInfo.author = "";
    this.songIds[0].ar.forEach((k: any) => {
      this.currentSongInfo.author += k.name;
    });
  }
  /** 监听歌词数组的变化啊 */
  @Watch("$store.state.songLyric", { immediate: true, deep: true })
  getSongLyric(newValue: any) {
    this.songLyric = newValue;
    this.currentSongInfo.lyric = this.songLyric[0];
  }
  /** 点击切换歌曲 更改当前歌曲信息 */
  handleSwichSong(item: any, index: number) {
    this.currentIndex = index;
    this.currentSongInfo.picture = item.al.picUrl;
    this.currentSongInfo.sname = item.name;
    this.currentSongInfo.author = "";
    item.ar.forEach((k: any) => {
      this.currentSongInfo.author += k.name;
    });
    this.currentSongInfo.lyric = this.songLyric[index];
  }
  /** 获取vuex中歌曲相关数据的初始值 */
  created() {
    const songIds = this.$store.state.songIds;
    const songLists = this.$store.state.songLists;
    const songLyric = this.$store.state.songLyric;
    if (songIds && songLists) {
      this.songLists = songLists;
      this.currentSongInfo.lyric = this.songLyric[0];
      this.getSongIds(songIds);
    }
  }
}
</script>

<style scoped></style>
