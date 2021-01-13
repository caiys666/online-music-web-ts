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
import { getResponse, getArgaResponse, getMusicInfo } from '@/api/getMusic'
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
    const getTrackIds = getMusicInfo
    const getSongIds = getMusicInfo
    const getSongUrl = getMusicInfo
    const getSongLyric = getMusicInfo
    this.$nextTick(() => {
      /** 获取歌曲trackid */
      getTrackIds('/cloud/playlist/detail', data).then(res => {
        trackIds = res.data.playlist.trackIds
        getSongId()
      })
      /** 获取歌曲信息 */
      let getSongId = () => {
        trackIds.map((k: any) => {
          let songData = { params: { ids: k.id } }
          /** 获取歌曲id */
          getSongIds('/cloud/song/detail', songData).then(res => {
            songIds.push(res.data.songs[0])
            const songUrlData = {
              params: { id: res.data.songs[0].id }
            }
            /** 获取歌曲url */
            getSongUrl('/cloud/song/url', songUrlData).then(res => {
              songLists.push(res.data.data[0])
              this.$store.commit('initSongLists', songLists)
            })
            /** 获取歌词信息 */
            getSongLyric('/cloud/lyric', songUrlData).then(res => {
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
      let addSheet = getArgaResponse
      addSheet(url, data).then((result: any) => {
        this.SongSheetList.push(...result.playlists)
        this.offset++
        console.log(this.SongSheetList)
      })
      // }, 5000);
    }
  }
  @Watch('SheetList', { immediate: true, deep: true })
  getInfo(newValue: any, oldValue: any) {
    console.log(newValue)
    this.SongSheetList = []
    this.addSheetItem()
  }
  mounted() {
    if (this.songSheetUrl) {
      const getTopList = getResponse
      getTopList(this.songSheetUrl).then((result: any) => {
        this.SongSheetList = result.playlists
      })
    }
    this.addSheetItem()
  }
}
</script>

<style scoped></style>
