<template>
  <div class="sheet">
    <div class="sheet__container">
      <div
        class="sheet__container__item"
        v-for="(item, index) in SheetList"
        :key="index"
      >
        <div class="item-img">
          <div class="item-img__collect">
            <img
              :src="item.coverImgUrl"
              alt=""
              @click="handleCollection(item)"
            />
            <div
              class="item-img__collect__collection"
              @click="handleCollection(item)"
            >
              <i class="iconfont iconcollect-01"></i>
            </div>
          </div>
        </div>
        <div class="item-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import music from '@/api/music'
import PlayList from '@/pages/main/content/play-list/index.vue'
import './index.less'

@Component
export default class Album extends Vue {
  @Prop() private SheetList!: Array<any>
  // 歌曲trackids数组
  trackIds: any = []
  // 歌曲id数组
  songIds: any = []
  // 歌曲列表
  songLists: any = []
  // 歌词数组
  songLyric: any = []
  handleCollection(item: any) {
    console.log(item)
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
      console.log(res.data)
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
