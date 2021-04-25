<template>
  <div class="mv-detail">
    <div class="mv-detail__left">
      <div class="mv-info">
        <div class="mv-info__name">{{ mvItem.name }}</div>
        <div class="mv-info__introduce">
          <div class="info">
            <span>{{ mvItem.playCount }}播放</span>
          </div>
          <div class="info">
            <span>{{ mvItem.commentCount }}评论</span>
          </div>
          <div class="info">
            <span>发布时间：{{ mvItem.publishTime }}</span>
          </div>
        </div>
      </div>
      <!-- <MvVideo :currentMv="currentMv" :mvItem="mvItem" /> -->
      <div style="width:60vw">
        <video
          ref="mvVideo"
          :src="currentMv.url"
          :poster="mvItem.cover"
          muted
          controls
          style="width:100%"
        ></video>
      </div>
      <div class="mv-praise">
        <div
          class="mv-praise__item"
          v-for="(item, index) in praiseList"
          :key="index"
        >
          <i class="iconfont" :class="item.icon"></i>
          <div>{{ item.content }}</div>
        </div>
      </div>
      <MvComment :mvid="mvid" />
    </div>
    <div class="mv-detail__right">
      <MvUser :artists="artists" />
      <SimpleMvList :mvid="mvid" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import music from '@/api/music'
import MvVideo from '@/components/mv/mv-video/index.vue'
import MvComment from '@/components/mv/mv-comment/index.vue'
import MvUser from '@/components/mv/mv-user/index.vue'
import SimpleMvList from '@/components/mv/simple-mv-list/index.vue'

import './index.less'

@Component({
  components: { MvVideo, MvComment, MvUser, SimpleMvList }
})
export default class MvDetail extends Vue {
  mvid: any = ''
  // 对应mvid的信息数组
  mvItem: any = ''
  // 当前mv
  currentMv: any = ''
  artists: any = []
  // 点赞\分享等数组列表
  praiseList: any = [
    { title: '点赞', icon: 'icondianzan', content: '' },
    { title: '打赏', icon: 'icondashang', content: '' },
    { title: '收藏', icon: 'iconcollection-b', content: '' },
    { title: '转发', icon: 'iconzhuanfa', content: '' },
    { title: '不看好', icon: 'icondislike-b', content: '' }
  ]
  // 获取mv地址参数对象
  mvUrlParams: any = {
    id: '',
    r: 1080
  }

  playerOptions = {
    // videojs options
    muted: true,
    language: 'en',
    playbackRates: [0.7, 1.0, 1.5, 2.0],
    sources: [
      {
        type: 'video/mp4',
        src:
          'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
      }
    ],
    poster: '/static/images/author.jpg'
  }
  @Watch('$route.query.id', { immediate: true, deep: true })
  getMvid(newValue: any) {
    /** 获取跳转页面传过来的mvid */
    this.mvid = this.$route.query.id
    this.getInfoById(this.mvid)
    this.getUrlById(this.mvid)
  }

  /** 根据mvid进行请求mv信息详细数据 */
  getInfoById(id: any) {
    music.getMvDetail({ mvid: id }).then((res: any) => {
      const mvItem = res.data.data
      this.$set(this, 'mvItem', mvItem)
      this.artists = this.mvItem.artists
      this.praiseList.forEach((k: any) => {
        switch (k.title) {
          case '点赞': {
            k.content = this.mvItem.subCount
            break
          }
          case '打赏': {
            k.content = this.mvItem.subCount
            break
          }
          case '收藏': {
            k.content = this.mvItem.subCount
            break
          }
          case '转发': {
            k.content = this.mvItem.shareCount
            break
          }
          case '不看好': {
            k.content = this.mvItem.commentCount
            break
          }
        }
      })
      // console.log(this.praiseList)
    })
  }
  /** 获取mv地址 */
  getUrlById(id: any) {
    this.mvUrlParams.id = id
    music.getMvUrl(this.mvUrlParams).then((res: any) => {
      this.currentMv = res.data.data
    })
  }
}
</script>

<style scoped></style>
