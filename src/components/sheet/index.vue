<template>
  <div class="selected" v-loading="loading">
    <div class="selected__container">
      <div
        class="selected__container__item"
        v-for="(item, index) in SongSheetList"
        :key="index"
      >
        <div class="item-img">
          <div class="item-img__collect">
            <div
              class="img"
              :style="[
                {
                  background: `url(${item.coverImgUrl})`
                }
              ]"
              @click="handleCollection(item, index)"
            ></div>
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
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="50"
      @current-change="handleChangePagination"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import music from '@/api/music.ts'
import PlayList from '@/pages/main/content/play-list/index.vue'
import './index.less'
import { PageHeader } from 'element-ui'

interface Pagination {
  pageSize: number
  offset: number
}

const pagination: Pagination = {
  pageSize: 50,
  offset: 1
}
@Component({
  components: { PlayList }
})
export default class Sheet extends Vue {
  @Prop() private songSheetUrl!: string
  @Prop() private SheetList!: Array<any>
  @Prop() private cat!: any

  SongSheetList: any = []
  collectionIndex = -1
  // loading
  loading: boolean = true
  // 总数量
  total: number = 0

  /**
   * @note: 点击歌单进行歌曲数组初始化  并且跳转到播放列表
   * @return {*}
   * @param {any} item
   * @param {number} index
   */
  async handleCollection(item: any, index: number) {
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

  /**
   * @note: 监听父组件传过来的数据
   * @return {*}
   */
  @Watch('SheetList', { immediate: true, deep: true })
  getInfo(newValue: any, oldValue: any) {
    this.SongSheetList = []
    this.getTopPlayList()
    this.loading = false
  }

  /**
   * @note: 组件挂载的时候进行请求数据
   * @return {*}
   */
  mounted() {
    if (this.songSheetUrl) {
      this.getTopPlayList()
    }
  }

  /**
   * @note: 获取歌单
   * @return {*}
   */
  getTopPlayList() {
    const data = {
      cat: this.cat,
      offset: pagination.offset
    }
    music.getTopPlayList(data).then(res => {
      console.log(res.data)
      this.total = res.data.total
      this.SongSheetList = res.data.playlists
      this.loading = false
    })
  }

  /**
   * @note: 分页逻辑
   * @return {*}
   * @param {number} cueenrtPage 当前页
   */
  handleChangePagination(cueenrtPage: number) {
    pagination.offset = cueenrtPage
    this.getTopPlayList()
  }
}
</script>

<style scoped></style>
