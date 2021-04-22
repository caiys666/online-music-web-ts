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
        {{
          currentSong.name
        }}&nbsp;&nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp;&nbsp;{{
          currentSong.author
        }}
      </div>
      <div class="play-right-progress">
        <span style="margin:0 10px 0">{{ currentSong.currentTime }}</span>
        <Slider
          class="slider"
          :default-value="currentSong.defaultValue"
          :value="currentSong.defaultValue"
          @change="handleChangeProgress"
        />
        <span style="margin-left:10px">{{ currentSong.countTime }}</span>

        <i style="margin-left:10px" class="iconfont iconshengyin"></i
        ><Slider
          class="volume"
          :default-value="currentSong.volume"
          :value="currentSong.volume"
          @change="handleChangeVolume"
        />
      </div>
      <div class="play-right-audio">
        <audio
          v-if="isEmptySongLists"
          :src="currentSong.url || ''"
          ref="audio"
        ></audio>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
declare function require(img: string): string
import { Component, Vue, Watch, Ref } from 'vue-property-decorator'
import { message, Slider } from 'ant-design-vue'
import './index.less'

@Component({
  components: { Slider }
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
  // 是否播放
  isPlay: boolean = false
  // 歌曲数组
  songLists: any = []
  songIds: any = []
  // 音乐图片
  songIcon = require('@/assets/images/dilireba@2x.jpg')
  @Ref() private audio!: any
  @Watch('$store.state.songLists', { immediate: true, deep: true })
  setPlay(newValue: any) {
    if (newValue.length > 0) {
      this.songLists = newValue
      this.isEmptySongLists = true
      this.currentSong.url = this.$store.state.songLists[0].url
      // console.log(this.audio.currentTime)
      this.playSong(1)
    }
  }
  @Watch('$store.state.songIds', { immediate: true, deep: true })
  setSongInfo(newValue: any) {
    if (newValue.length > 0) {
      this.songIds = newValue
      this.currentSong.author = newValue[0].ar[0].name
      this.currentSong.name = newValue[0].name
      this.songIcon = newValue[0].al.picUrl
    }
  }
  @Watch('$store.state.currentIndex', { immediate: true, deep: true })
  setCurrentIndex(newValue: number) {
    if (newValue >= 0) {
      if (this.$store.state.songLists[newValue].url !== undefined) {
        this.currentSong.url = this.$store.state.songLists[newValue].url
        this.currentSong.index = newValue
        this.currentSong.author = this.songIds[newValue].ar[0].name
        this.currentSong.name = this.songIds[newValue].name
        this.songIcon = this.songIds[newValue].al.picUrl
        this.playSong(1)
      } else {
        message.error('版权原因不可播放！')
        this.$nextTick(() => {
          this.audio.pause()
        })
      }
    }
  }
  // @Watch('this.audio.currentTime', { immediate: true, deep: true })
  // autoAddTime(newValue: any) {
  //   console.log(newValue)
  // }
  playSong(index?: number) {
    this.audio.volume = this.currentSong.volume / 100
    this.setCountTime()
    if (index === 1) {
      this.currentSong.currentTime = '0:00'
      this.currentSong.defaultValue = 0
      // console.log(this.songLists[this.currentSong.index].url)
      this.$nextTick(() => {
        if (this.songLists[this.currentSong.index].url) {
          this.audio.play()
          this.isPlay = true
        } else {
          this.audio.pause()
        }
      })
      setTimeout(() => {
        this.setCountTime()
      }, 500)
      // this.autoAddTime()
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
  autoAddTime() {
    const timer = setInterval(() => {
      let i = 0
      const distance = i * (this.audio.duration / 600)
      this.currentSong.defaultValue = distance
      if (i >= 100) {
        clearInterval(timer)
      }
      i++
    }, 1000)
  }
  setCountTime() {
    const time = String((this.audio.duration / 60).toFixed(2))
    const t1 = time.slice(0, 1)
    let t2: any = Number(time.slice(2, 3)) * 6
    if (t2 == 0) {
      t2 = '00'
    } else if (t2 < 10) {
      t2 = String('0' + t2)
    }
    this.currentSong.countTime = String(t1 + ':' + t2)
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
  handleChangeProgress(value: any) {
    this.setCountTime()
    // console.log(value)
    this.currentSong.defaultValue = value
    const currentTime = (this.audio.duration / 100) * value
    // console.log(currentTime)
    this.audio.currentTime = currentTime
    const time = String((this.audio.currentTime / 60).toFixed(2))
    const t1 = time.slice(0, 1)
    let t2: any = Number(time.slice(2, 3)) * 6
    if (t2 == 0) {
      t2 = '00'
    } else if (t2 < 10) {
      t2 = String('0' + t2)
    }
    this.currentSong.currentTime = String(t1 + ':' + t2)
    console.log(this.currentSong.currentTime)
  }
  /**
   * @param{any} value
   * @description 音量修改
   */
  handleChangeVolume(value: any) {
    this.currentSong.volume = value
    this.audio.volume = value / 100
  }
}
</script>

<style scoped></style>
