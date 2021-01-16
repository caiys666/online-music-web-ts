<template>
  <div class="simple">
    <div class="grid-entry">
      <div
        class="grid-entry__item"
        v-for="(item, index) in mvList"
        :key="index"
      >
        <div class="item">
          <div class="item-img">
            <div
              class="mvimg"
              :style="[
                {
                  background: `url(${item.cover})`
                }
              ]"
              @click="handleGoDetail(item)"
            >
              <i class="iconfont iconicon_play"></i>
            </div>
            <span class="mvduration">{{ item.duration }}</span>
          </div>
          <div class="item-desc">
            <div class="item-title">
              {{ item.name }}---{{ item.artistName }}
            </div>
            <div class="info">
              <i class="iconfont iconuser-01"></i>
              <span
                class="author"
                v-for="(sitem, sindex) in item.artists"
                :key="sindex"
                >{{ sitem.name }}</span
              >
            </div>
            <div class="item-info">
              <div class="info">
                <i class="iconfont iconicon_play"></i>
                <span>{{ item.playCount }}</span>
              </div>
              <div class="info">
                <i class="iconfont iconshi_jian"></i>
                <span>2020-12-12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import music from '@/api/music'
import './index.less'

@Component
export default class SimpleMvList extends Vue {
  @Prop() private mvid!: number
  mvList: any = []

  mounted() {
    console.log(this.mvid)
    this.getSimpleMv(this.mvid)
  }
  /**
   * @note: 获取相似mv
   * @return {*}
   * @param {number} mvid
   */
  getSimpleMv(mvid: number) {
    music.getSimpleMv({ mvid }).then(res => {
      this.mvList = res.data.mvs
    })
  }
  /**
   * @note: mv详情页
   * @return {*}
   * @param {*} item
   */
  handleGoDetail(item: any) {
    this.$router.push({
      name: 'MvDetail',
      query: {
        id: item.id
      }
    })
  }
}
</script>

<style scoped></style>
