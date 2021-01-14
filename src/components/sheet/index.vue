<template>
  <div class="selected">
    <div class="selected__container">
      <div
        class="selected__container__item"
        v-for="(item, index) in SongSheetList"
        :key="index"
      >
        <div class="item-img">
          <div class="item-img__collect">
            <img
              :src="item.coverImgUrl"
              alt=""
              @click="handleCollection(item, index)"
            />
            <div
              class="item-img__collect__collection"
              @click="handleCollection(item, index)"
            >
              <i
                class="iconfont iconcollect-01"
                :class="[index == collectionIndex ? 'collectioned' : '']"
              ></i>
            </div>
          </div>
        </div>
        <div class="item-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import music from '@/api/music.ts'
import PlayList from '@/pages/main/content/play-list/index.vue'
import './index.less'
import axios from 'axios'

@Component({
  components: { PlayList }
})
export default class Sheet extends Vue {
  @Prop() private songSheetUrl!: string
  @Prop() private SheetList!: Array<any>
  @Prop() private cat!: any

  SongSheetList: any = []
  offset = 1
  collectionIndex = -1
  /** 点击歌单进行歌曲数组初始化  并且跳转到播放列表 */
  async handleCollection(item: any, index: any) {
    this.collectionIndex = index
    const data = {
      params: {
        id: item.id
      }
    }
    let trackIds: any = []
    const songIds: any = []
    const songLists: any = []
    const songLyric: any = []
    this.$nextTick(() => {
      /** 获取歌曲trackid */
      music.getTrackIds({ id: item.id }).then(res => {
        trackIds = res.data.playlist.trackIds
        getSongId()
      })
      /** 获取歌曲信息 */
      let getSongId = () => {
        trackIds.map((k: any) => {
          let songData = { ids: k.id }
          /** 获取歌曲id */
          music.getSongIds(songData).then(res => {
            songIds.push(res.data.songs[0])
            const songUrlData = { id: res.data.songs[0].id }
            /** 获取歌曲url */
            music.getSongUrl(songUrlData).then(res => {
              songLists.push(res.data.data[0])
              this.$store.commit('initSongLists', songLists)
            })
            /** 获取歌词信息 */
            music.getSongLyric(songUrlData).then(res => {
              songLyric.push(res.data.lrc.lyric)
              this.$store.commit('initSongLyric', songLyric)
            })
          })
        })
        /** 将信息存储到store中 */
        this.$store.commit('initSongIds', songIds)
      }
    })
    let currentIndex: number = Math.random()
    this.$store.commit('setCurrentComponent', {
      currentIndex: currentIndex,
      currentComponent: PlayList,
      currentNavIndex: 0,
      currentItemIndex: 2
    })
  }
  addSheetItem() {
    const url = '/top/playlist'
    const data = {
      cat: this.cat,
      offset: this.offset
    }
    if (this.offset < 26) {
      // setInterval(() => {
      music.getTopPlayList(data).then(res => {
        this.SongSheetList.push(...res.data.playlists)
        this.offset++
      })
      // }, 5000);
    }
  }
  @Watch('SheetList', { immediate: true, deep: true })
  getInfo(newValue: any, oldValue: any) {
    // console.log(newValue)
    this.SongSheetList = []
    this.addSheetItem()
  }
  mounted() {
    if (this.songSheetUrl) {
      music.getTopPlayList().then(res => {
        this.SongSheetList = res.data.playlists
      })
    }
    this.addSheetItem()
  }
}
</script>

<style scoped></style>
