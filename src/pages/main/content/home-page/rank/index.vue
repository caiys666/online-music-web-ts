<template>
  <div class="rank">
    <h2 class="rank__title">排行榜</h2>
    <div class="rank__list">
      <div
        class="rank__list__item"
        v-for="(item, index) in rankList"
        :key="index"
      >
        <img :src="item.coverImgUrl" alt="" class="bgimg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import music from '@/api/music'
import './index.less'

@Component
export default class Rank extends Vue {
  rankList: any = []
  mounted() {
    this.getRankListDetail()
  }
  /**
   * @note: 获取榜单详情信息
   * @return {*}
   */
  getRankListDetail() {
    music.getRankListDetail().then(res => {
      console.log(res.data)
      this.rankList = res.data.list
    })
  }
}
</script>

<style scoped></style>
