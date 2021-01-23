<template>
  <div class="search">
    <h2 style="margin-left:20px">搜索</h2>
    <div class="search__input">
      <el-select
        @change="handleSelect"
        v-model="value"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>
      <el-input
        class="search__input__submit"
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
    <div v-if="searchParams.type === '10'" class="search__album">
      <h2 style="margin:1vw 0 0 0" class="search__album__title">专辑</h2>
      <div class="search__album__list">
        <div class="item" v-for="(item, index) in albumList" :key="index">
          <div class="item__img">
            <img :src="item.picUrl" alt="" @click="handleGetAlbums(item)" />
          </div>
          <div class="item__author desc">
            <div v-for="(aitem, aindex) in item.artists" :key="aindex">
              <span style="margin-right:1vw" v-if="aitem.name">{{
                aitem.name
              }}</span>
            </div>
          </div>
          <div class="item__album desc">{{ item.type }}:{{ item.name }}</div>
        </div>
      </div>
      <Album />
    </div>
    <div v-if="searchParams.type === '1000'">
      <h2 style="margin-left:2vw">歌单</h2>
      <Sheet :SheetList="SheetList" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Message } from 'element-ui'
import music from '@/api/music'
import PlayList from '@/pages/main/content/play-list/index.vue'
import Sheet from '@/components/lists/sheet/index.vue'
// import Sheet from '@/components/sheet/index.vue'
import './index.less'

@Component({
  components: { PlayList, Sheet }
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
  // 筛选的当前参数
  selectValue: any = ''
  // 专辑数组
  albumList: any = []
  // 歌单数组
  SheetList: any = []
  // 搜索需要的参数
  searchParams = {
    keywords: '',
    limit: 100,
    offset: 0,
    type: '1'
  }
  options = [
    {
      value: '1',
      label: '单曲',
      disabled: false
    },
    {
      value: '10',
      label: '专辑'
    },
    {
      value: '100',
      label: '歌手'
    },
    {
      value: '1000',
      label: '歌单'
    },
    {
      value: '1002',
      label: '用户'
    },
    {
      value: '1004',
      label: 'MV'
    },
    {
      value: '1006',
      label: '歌词'
    },
    {
      value: '1009',
      label: '电台'
    },
    {
      value: '1014',
      label: '视频'
    },
    {
      value: '1018',
      label: '综合'
    }
  ]
  value = ''
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
  /**
   * @note: 获取热门搜索
   * @return {*}
   */
  getHotSearch() {
    music.getHotSearch().then(res => {
      // console.log(res.data)
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
    if (text === '') {
      this.searchParams.keywords = this.searchText
    } else {
      this.searchParams.keywords = text
      this.searchText = text
    }
    music.handleSearch(this.searchParams).then(res => {
      // console.log(res.data)
      switch (this.searchParams.type) {
        case '1': {
          this.searchResult = res.data.result.songs
          this.$store.commit('initSongIds', res.data.result.songs)
          this.getSongUrl()
          this.$store.commit('initSongLists', this.songLists)
          this.$store.commit('initSongLyric', this.songLyric)
          this.handleSwitchComponent()
          break
        }
        case '10': {
          this.albumList = res.data.result.albums
          break
        }
        case '100': {
          break
        }
        case '1000': {
          console.log(res.data.result.playlists)
          this.SheetList = res.data.result.playlists
          break
        }
      }
    })
    if (this.searchParams.type === '1') {
      this.getHistoryList()
    }
  }
  /**
   * @note: 获取专辑歌曲
   * @return {*}
   * @param {any} item
   */
  handleGetAlbums(item: any) {
    music.handleGetAlbum({ id: item.id }).then(res => {
      console.log(res.data)
      this.searchResult = res.data.songs
      this.$store.commit('initSongIds', res.data.songs)
      this.getSongUrl()
      this.handleSwitchComponent()
    })
  }
  /**
   * @note: 进行页面切换
   * @return {*}
   */
  handleSwitchComponent() {
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
        // console.log(res.data)
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
  /**
   * @note: 下拉选择
   * @return {*}
   * @param {any} value
   */
  handleSelect(value: any) {
    // alert(value)
    this.searchParams.type = value
  }
}
</script>

<style scoped></style>
