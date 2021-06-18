<template>
  <div class="item" v-loading="loading">
    <div v-if="DjRadios" class="item__recommend">
      <div
        class="item__recommend__item"
        v-for="(item, index) in DjRadios"
        :key="index"
      >
        <div class="coverimg">
          <img :src="item.picUrl || item.avatarUrl || item.picWebUrl" alt="" />
        </div>
        <div class="category">{{ item.category }}</div>
        <div class="desc">{{ item.desc }}</div>
        <div class="desc">{{ item.name || item.nickName }}</div>
        <div class="rcmdText">{{ item.rcmdText }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import './index.less'

@Component
export default class RadioList extends Vue {
  @Prop() private DjRadios!: Array<any>
  // loading
  loading: boolean = true
  mounted() {
    if (this.DjRadios) {
      this.loading = false
    }
  }
}
</script>

<style scoped></style>
