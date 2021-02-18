<template>
  <div v-show="isEmptySongLists" class="play">
    <div class="play-left">
      <div
        class="play-left-icon"
        :style="[
          {
            background: `url(${songIcon})`
          }
        ]"
      ></div>
      <div class="play-left-operation">
        <i class="iconfont iconshangyiqu" @click="handleChangeIndex(0)"></i>
        <i
          class="iconfont"
          :class="isPlay ? 'iconbofangzanting' : 'iconicon_play'"
          @click="playSong"
        ></i>
        <i class="iconfont iconxiayiqu" @click="handleChangeIndex(1)"></i>
      </div>
    </div>
    <div class="play-right">
      <div class="play-right-song">
        cabbage/你好
      </div>
      <div class="play-right-audio">
        <audio
          v-if="isEmptySongLists"
          :src="currentSong.url"
          ref="audio"
        ></audio>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
declare function require(img: string): string
import { Component, Vue, Watch, Ref } from 'vue-property-decorator'
import { message } from 'ant-design-vue'
import './index.less'

@Component
export default class Play extends Vue {
  // 设置当前歌曲数组是否有值
  isEmptySongLists = false
  // 当前播放的音乐
  currentSong = {
    url: '',
    index: 0
  }
  // 是否播放
  isPlay: boolean = false
  // 歌曲数组
  songLists: any = []
  // 音乐图片
  songIcon = require('@/assets/images/dilireba@2x.jpg')
  @Ref() private audio!: any
  @Watch('$store.state.songLists', { immediate: true, deep: true })
  setPlay(newValue: any) {
    if (newValue.length > 0) {
      this.songLists = newValue
      this.isEmptySongLists = true
      this.currentSong.url = this.$store.state.songLists[0].url
      this.playSong(1)
    }
  }
  @Watch('$store.state.currentIndex', { immediate: true, deep: true })
  setCurrentIndex(newValue: number) {
    if (newValue >= 0) {
      if (this.$store.state.songLists[newValue].url) {
        this.currentSong.url = this.$store.state.songLists[newValue].url
        this.currentSong.index = newValue
        this.playSong(1)
      } else {
        message.error('版权原因不可播放！')
        this.$nextTick(() => {
          this.audio.pause()
        })
      }
    }
  }

  playSong(index?: number) {
    if (index === 1) {
      console.log(this.songLists[this.currentSong.index].url)
      this.$nextTick(() => {
        if (this.songLists[this.currentSong.index].url) {
          this.audio.play()
        } else {
          this.audio.pause()
        }
      })
      this.isPlay = true
    } else {
      this.audio.pause()
      if (!this.isPlay) {
        this.audio.play()
        this.isPlay = true
      } else {
        this.audio.pause()
        this.isPlay = false
      }
    }
  }
  /**
   * @param{number} index
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
