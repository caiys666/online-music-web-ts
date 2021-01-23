<template>
  <div class="user">
    <div class="user__item" v-for="(item, index) in userInfo" :key="index">
      <div
        class="user__item__img"
        :style="{ background: 'url(' + item.artist.img1v1Url + ')' }"
      ></div>
      <div class="user__item__info">
        <div class="name">{{ item.artist.name }}</div>
        <div v-if="item.more" class="more">more</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Button } from 'element-ui'
import singer from '@/api/singer'
import './index.less'

@Component({
  components: { Button }
})
export default class MvUser extends Vue {
  @Prop() private artists!: any
  //  发表视频用户信息
  userInfo: any = []
  @Watch('artists', { immediate: true, deep: true })
  getArtists(newValue: any) {
    this.userInfo = []
    this.artists = newValue
    this.artists.forEach((k: any) => {
      this.getArtist(k.id)
    })
  }
  /**
   * @note: 获取发布视频的创作者
   * @return {*}
   * @param {number} id
   */
  getArtist(id: number) {
    singer.getArtist({ id }).then(res => {
      this.userInfo.push(res.data)
    })
  }
}
</script>

<style scoped></style>
