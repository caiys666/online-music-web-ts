<template>
  <div class="rank">
    <h2 class="rank__title">排行榜</h2>
    <div class="rank__list">
      <div
        class="rank__list__item"
        v-for="(item, index) in rankList"
        :key="index"
        @click="handleClick(item)"
      >
        <img :src="item.coverImgUrl" alt="" class="bgimg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import music from '@/api/music'
import PlayList from '@/pages/main/content/play-list/index.vue'
import './index.less'

@Component({
  components: { PlayList }
})
export default class Rank extends Vue {
  // 排行榜数组
  rankList: any = []
  // 歌曲trackids数组
  trackIds: any = []
  // 歌曲id数组
  songIds: any = []
  // 歌曲列表
  songLists: any = []
  // 歌词数组
  songLyric: any = []
  mounted() {
    this.getRankListDetail()
  }
  /**
   * @note: 获取榜单详情信息
   * @return {*}
   */
  getRankListDetail() {
    music.getRankListDetail().then(res => {
      this.rankList = res.data.list
    })
  }
  handleClick(item: any) {
    this.getTrackIds({ id: item.id })
  }
  /**
   * @note: 获取歌曲trackids
   * @return {*}
   * @param {any} params
   */
  getTrackIds(params: any) {
    this.songIds = []
    this.songLists = []
    this.songLyric = []
    music.getTrackIds(params).then(res => {
      this.trackIds = res.data.playlist.trackIds
      this.getSongId(this.trackIds)
    })
  }
  /**
   * @note: 获取歌曲ids
   * @return {*}
   * @param {any} trackIds
   */
  getSongId(trackIds: any) {
    trackIds.map((k: any) => {
      music.getSongIds({ ids: k.id }).then(res => {
        this.songIds.push(res.data.songs[0])
        let params = { id: res.data.songs[0].id }
        this.getSongUrl(params)
        this.getSongLyric(params)
      })
    })
    this.$store.commit('initSongIds', this.songIds)
    this.$store.commit('initSongLists', this.songLists)
    this.$store.commit('initSongLyric', this.songLyric)
    let currentIndex: number = Math.random()
    this.$store.commit('setCurrentComponent', {
      currentIndex: currentIndex,
      currentComponent: PlayList,
      currentNavIndex: 0,
      currentItemIndex: 2
    })
  }
  /**
   * @note: 获取歌曲url
   * @return {*}
   * @param {any} params
   */
  getSongUrl(params: any) {
    music.getSongUrl(params).then(res => {
      this.songLists.push(res.data.data[0])
    })
  }
  /**
   * @note: 获取歌词信息
   * @return {*}
   * @param {any} params
   */
  getSongLyric(params: any) {
    music.getSongLyric(params).then(res => {
      if (res.data.nolyric || res.data.uncollected) {
        return
      } else {
        this.songLyric.push(res.data.lrc.lyric)
      }
    })
  }
}
</script>

<style scoped></style>
