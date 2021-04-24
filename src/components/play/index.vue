<template>
  <div v-show="isEmptySongLists" class="play">
    <aplayer
      :autoplay="autoplay"
      style="margin-bottom:0px;width:100%"
      :music="currentMusic"
    />
  </div>
</template>

<script lang="ts">
// declare function require(img: string): string
import { Component, Vue, Watch, Ref } from 'vue-property-decorator'
import { message, Slider } from 'ant-design-vue'
import aplayer from 'vue-aplayer'
import './index.less'

@Component({
  components: { Slider, aplayer }
})
export default class Play extends Vue {
  // 设置当前歌曲数组是否有值
  isEmptySongLists = false
  // 当前播放的音乐
  currentSong = {
    url: '',
    index: 0,
    author: '',
    name: '',
    countTime: '',
    currentTime: '',
    defaultValue: 0,
    volume: 50
  }
  currentMusic = {
    title: '',
    artist: '',
    src: '',
    pic: ''
  }
  // 是否播放
  autoplay: boolean = true
  // 歌曲数组
  songLists: any = []
  songIds: any = []
  /**
   * 监听歌曲数组是否发生改变
   */
  @Watch('$store.state.songLists', { immediate: true, deep: true })
  setPlay(newValue: any) {
    if (newValue.length > 0) {
      this.songLists = newValue
      this.isEmptySongLists = true
      this.autoplay = false
      this.currentMusic = {
        title: '',
        artist: '',
        src: '',
        pic: ''
      }
      this.currentMusic.src = this.$store.state.songLists[0].url
      this.autoplay = true
      this.playSong(1)
    }
  }
  /**
   * 监听歌曲Id数组是否发生改变
   */
  @Watch('$store.state.songIds', { immediate: true, deep: true })
  setSongInfo(newValue: any) {
    if (newValue.length > 0) {
      this.songIds = newValue
      this.autoplay = false
      this.currentMusic = {
        title: '',
        artist: '',
        src: '',
        pic: ''
      }
      this.currentMusic.artist = newValue[0].ar[0].name
      this.currentMusic.pic = newValue[0].al.picUrl
      this.currentMusic.title = newValue[0].name
      this.autoplay = true
    }
  }
  /**
   * 监听当前歌曲的Index是否发生改变
   */
  @Watch('$store.state.currentIndex', { immediate: true, deep: true })
  setCurrentIndex(newValue: number) {
    if (newValue >= 0) {
      if (this.$store.state.songLists[newValue].url !== undefined) {
        this.autoplay = false
        this.currentMusic = {
          title: '',
          artist: '',
          src: '',
          pic: ''
        }
        this.currentMusic.src = this.$store.state.songLists[newValue].url
        this.currentMusic.artist = this.songIds[newValue].ar[0].name
        this.currentMusic.pic = this.songIds[newValue].al.picUrl
        this.currentMusic.title = this.songIds[newValue].name
        this.autoplay = true
        this.playSong(1)
      } else {
        message.error('版权原因不可播放！')
        this.$nextTick(() => {
          this.autoplay = false
        })
      }
    }
  }
  /**
   * @param{number} index
   * @description 进行音乐播放与暂停
   */
  playSong(index?: number) {
    if (index === 1) {
      this.autoplay = true
    } else {
      this.autoplay = false
    }
  }

  /**
   * @param{number} index
   * @description 切换歌曲index
   */
  handleChangeIndex(index: number) {
    if (index === 1) {
      this.$store.commit('addIndex', this.currentSong.index)
    } else {
      this.$store.commit('reduceIndex', this.currentSong.index)
    }
  }
}
</script>

<style scoped></style>
