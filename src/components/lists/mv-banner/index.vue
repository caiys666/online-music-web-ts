<template>
  <div class="mv__banner">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="(item, index) in bannerList" :key="index">
        <div
          class="item-img"
          :style="[
            {
              background: `url(${item.picUrl}) no-repeat`
            }
          ]"
        >
          <div class="item-name">{{ item.name }}-{{ item.artistName }}</div>
        </div>
        <div class="item-name">{{ item.name }}</div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import './index.less'

@Component
export default class MvBanner extends Vue {
  @Prop() private bannerList!: Array<Object>
}
</script>

<style scoped></style>
