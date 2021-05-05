<template>
  <a-spin :spinning="spinning">
    <div class="selected">
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
              <div class="item-img__collect__collection">
                <i
                  class="iconfont iconcollect-01"
                  v-on:click.stop="handleCollect(item, index)"
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
      </el-pagination></div
  ></a-spin>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import music from '@/api/music'
import PlayList from '@/pages/main/content/play-list/index.vue'
import './index.less'
import user from '@/api/user'

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
  // spinning
  spinning: boolean = true
  // 总数量
  total: number = 0

  /**
   * @note: 点击歌单进行歌曲数组初始化  并且跳转到播放列表
   * @return {*}
   * @param {any} item
   * @param {number} index
   */
  async handleCollection(item: any, index: number) {
    const data = {
      id: item.id
    }
    let trackIds: any = []
    const songIds: any = []
    const songLists: any = []
    const songLyric: any = []
    this.$nextTick(() => {
      /** 获取歌曲trackid */
      music.getTrackIds(data).then(res => {
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
              if (res.data.data[0]) {
                songLists.push(res.data.data[0])
              } else {
                songLists.push('')
              }
              this.$store.commit('initSongLists', songLists)
            })
            /** 获取歌词信息 */
            music.getSongLyric(songUrlData).then(res => {
              if (res.data.lrc.lyric !== 'undefined') {
                songLyric.push(res.data.lrc.lyric)
              } else {
                songLyric.push(' ')
              }
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
    this.setSpin()
  }

  /**
   * 设置加载
   */
  setSpin() {
    setTimeout(() => {
      this.spinning = false
    }, 2000)
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

  /**
   * 添加到我的喜欢
   */
  async handleCollect(item: any, index: number) {
    this.collectionIndex = index
    const obj = {
      t: 1,
      id: item.id
    }
    try {
      const res = await user.subscribePlaylist(obj)
      if (res.data.code == 200) {
        alert('收藏歌单成功！')
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped></style>
