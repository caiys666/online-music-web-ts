<template>
  <div class="search">
    <h2 style="margin-left:20px">搜索</h2>
    <div class="search__input">
      <el-input
        placeholder="请输入内容"
        @change="handleSearch('')"
        @focus="getHistoryList"
        v-model="searchText"
        clearable
        :autofocus="true"
      >
      </el-input>
      <el-button
        class="search__input__submit"
        type="primary"
        icon="el-icon-search"
        @click="handleSearch('')"
        >搜索</el-button
      >
    </div>
    <h2 style="margin:1vw 0 0 1vw">历史搜索</h2>
    <div class="search__history">
      <div
        class="search__history__item"
        v-for="(item, index) in historyList"
        :key="index"
      >
        <div v-if="item !== ''" @click="handleSearch(item)">{{ item }}</div>
      </div>
    </div>
    <h2 style="margin:1vw 0 0 1vw">热门搜索</h2>
    <div class="search__history">
      <div
        class="search__history__item"
        v-for="(item, index) in hotSearchList"
        :key="index"
      >
        <div v-if="item !== ''" @click="handleSearch(item.first)">
          {{ item.first }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Message } from 'element-ui'
import music from '@/api/music'
import PlayList from '@/pages/main/content/play-list/index.vue'
import './index.less'

@Component({
  components: { PlayList }
})
export default class Search extends Vue {
  // 输入框内容
  searchText: string = ''
  // 搜索结果
  searchResult: any = []
  // 歌曲id数组
  songIds: any = []
  // 歌曲数组
  songLists: any = []
  // 歌词数组
  songLyric: any = []
  // 历史搜索
  historyList: any = []
  // 热门搜索数组
  hotSearchList: any = []
  mounted() {
    this.getHistoryList()
    this.getHotSearch()
  }
  /**
   * @note: 获取历史搜索
   * @return {*}
   */
  getHistoryList() {
    this.historyList = JSON.parse(String(localStorage.getItem('historyList')))
    this.historyList = new Set(this.historyList)
    let tempList: any = []
    this.historyList.forEach((k: any) => {
      if (k !== '') {
        tempList.push(k)
      }
    })
    const historyList = []
    if (tempList) {
      historyList.push(...tempList)
    }
    if (this.searchText) {
      historyList.push(this.searchText)
      this.setHistoryList(historyList)
    }
  }
  /**
   * @note: 设置历史搜索
   * @return {*}
   * @param {object} historyList
   */
  setHistoryList(historyList: any) {
    localStorage.setItem('historyList', JSON.stringify(historyList))
  }
  getHotSearch() {
    music.getHotSearch().then(res => {
      console.log(res.data)
      this.hotSearchList = res.data.result.hots
    })
  }
  /**
   * @note: 搜索
   * @return {*}
   */
  handleSearch(text: string) {
    this.songIds = []
    this.songLists = []
    this.songLyric = []
    let params = {}
    if (text === '') {
      params = { keywords: this.searchText }
    } else {
      params = { keywords: text }
    }
    music.handleSearch(params).then(res => {
      this.searchResult = res.data.result.songs
      // this.songIds = res.data.result.songs
      this.$store.commit('initSongIds', res.data.result.songs)
      this.getSongUrl()
    })
    this.getHistoryList()
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
   */
  getSongUrl() {
    this.searchResult.forEach((k: any) => {
      const params = { id: k.id }
      music.getSongUrl(params).then(res => {
        console.log(res.data)
        this.songLists.push(res.data.data[0])
      })
      this.getSongLyric(params)
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
