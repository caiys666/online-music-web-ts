<template>
  <Spin :spinning="spinning">
    <div class="play-list" v-loading="loading">
      <div class="play-list__left" v-if="songLists.length">
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
      <div v-else>
        <img
          class="null"
          src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2341334709,216974654&fm=26&gp=0.jpg"
          alt=""
        />
      </div>
      <div class="play-list__right">
        <div class="current" v-if="songLists.length">
          <img :src="currentSongInfo.picture" alt="" class="current__img" />
          <div class="current__sname">{{ currentSongInfo.sname }}</div>
          <div>{{ currentSongInfo.author }}</div>
          <div class="current__lyric">
            <p v-if="currentSongInfo.lyric" class="lyric">
              {{ currentSongInfo.lyric }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Spin } from 'ant-design-vue'
import './index.less'

@Component({
  components: { Spin }
})
export default class PlayList extends Vue {
  // 当前选中item的索引index
  currentIndex = 0
  // 歌曲id数组
  songIds: any = []
  // 歌曲列表数组
  songLists: any = []
  // 歌词列表
  songLyric: any = []
  countListen: any = [0, 0, 0, 0, 0, 0, 0]
  // 歌词正则表达式
  regex = /\[(.+?)\]/g
  // 加载状态
  spinning: boolean = true
  // 当前播放的歌曲信息
  currentSongInfo: any = {
    picture: '',
    sname: '',
    author: '',
    lyric: ''
  }
  // loading
  loading: boolean = true
  /** 监听歌曲url数组的变化 */
  @Watch('$store.state.songLists', { immediate: true, deep: true })
  getSongLists(newValue: any) {
    if (newValue) {
      this.songLists = newValue
      setTimeout(() => {
        this.spinning = false
      }, 5000)
      this.currentIndex = 0
    }
  }
  @Watch('$store.state.currentIndex', { immediate: true, deep: true })
  setCurrentIndex(newValue: number) {
    this.currentIndex = newValue
    const item = this.songIds[newValue]
    this.handleSwichSong(item, newValue)
    this.setCountListen()
  }
  /** 监听歌曲id数组的变化啊 */
  @Watch('$store.state.songIds', { immediate: true, deep: true })
  getSongIds(newValue: any) {
    this.songIds = newValue
    this.songIds.forEach((k: any) => {
      if (typeof k === 'object') {
        setTimeout(() => {
          if (this.songIds[0]) {
            this.currentSongInfo.picture = this.songIds[0].al.picUrl
            this.currentSongInfo.sname = this.songIds[0].name
            this.currentSongInfo.author = ''
            this.songIds[0].ar.forEach((k: any) => {
              this.currentSongInfo.author += k.name
            })
          }
        }, 500)
      }
    })
    this.loading = false
  }
  /** 监听歌词数组的变化啊 */
  @Watch('$store.state.songLyric', { immediate: true, deep: true })
  getSongLyric(newValue: any) {
    this.songLyric = newValue
    let str = String(this.songLyric[0])
    if (str) {
      this.currentSongInfo.lyric = str.replace(this.regex, '')
    }
  }
  /**
   * @note: 点击切换歌曲 更改当前歌曲信息
   * @return {*}
   * @param {any} item
   * @param {number} index
   */
  handleSwichSong(item: any, index: number) {
    this.currentIndex = index
    if (item) {
      this.currentSongInfo.picture = item.al.picUrl
      this.currentSongInfo.sname = item.name
      this.currentSongInfo.author = ''
      item.ar.forEach((k: any) => {
        this.currentSongInfo.author += k.name
      })
    }

    if (this.songLyric[index]) {
      this.currentSongInfo.lyric = this.songLyric[index].replace(this.regex, '')
    }
    this.$store.commit('setIndex', index)
  }

  /**
   * 点击一次记录一次听歌记录
   */
  setCountListen() {
    const date = new Date().getDay()
    let countListen: any = this.replaceStr(
      localStorage.getItem('countListen') || ''
    )
    let count = 0
    if (countListen) {
      count = countListen[date]
    }
    count++
    this.countListen[date] = count
    // console.log(count)
    localStorage.setItem('countListen', this.countListen)
  }

  replaceStr(str: String) {
    return str.split(',')
  }
  /**
   * @note: 获取vuex中歌曲相关数据的初始值
   * @return {*}
   */
  created() {
    const songIds = this.$store.state.songIds
    if (this.$store.state.songLists) {
      const songLists = this.$store.state.songLists
      const songLyric = this.$store.state.songLyric
      if (songIds && songLists) {
        this.songLists = songLists
        if (this.songLyric[0]) {
          this.currentSongInfo.lyric = this.songLyric[0].replace(this.regex, '')
        }
        this.getSongIds(songIds)
      }
    }
  }
}
</script>

<style scoped></style>
