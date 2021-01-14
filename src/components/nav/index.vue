<template>
  <div class="main__nav">
    <div class="main__nav__logo">
      <span>{{ logoText.slice(0, 7) }}</span
      ><span>{{ logoText.slice(7) }}</span>
    </div>
    <div class="main__nav__item" v-for="(item, index) in navBar" :key="index">
      <div class="main__nav__title">{{ category[index].title }}</div>
      <el-button
        v-for="(sitem, sindex) in item.item"
        :key="sindex"
        class="button"
        :class="{
          actived: currentNavIndex === index && currentItemIndex === sindex
        }"
        plain
        :icon="sitem.icon"
        autofocus
        @click="handleCheckPage(sitem.component, index, sindex)"
        >{{ sitem.title }}</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import PlayList from '@/pages/main/content/play-list/index.vue'
import HomePage from '@/pages/main/content/home-page/index.vue'
import MyFavorite from '@/pages/main/content/my-favorite/index.vue'
import Search from '@/pages/main/content/search/index.vue'
import Mv from '@/pages/main/content/mv/index.vue'
import Radio from '@/pages/main/content/radio/index.vue'
import Web from '@/pages/main/content/web/index.vue'
import Disc from '@/pages/main/content/disc/index.vue'
import './index.less'

@Component({
  components: { PlayList, HomePage, MyFavorite, Search, Mv, Radio, Web, Disc }
})
export default class Nav extends Vue {
  // 当前选中的导航item的index
  currentNavIndex = 0
  currentItemIndex = 0
  logoText = 'CabbageMP3'
  pagesName = ''
  category = [{ title: 'Music' }, { title: 'Videos' }]
  // 导航栏数组
  navBar = [
    {
      item: [
        {
          title: '首页',
          page: 'homePage',
          icon: 'el-icon-house',
          component: HomePage
        },
        {
          title: '搜索',
          page: 'search',
          icon: 'el-icon-search',
          component: Search
        },
        {
          title: '播放列表',
          page: 'playList',
          icon: 'el-icon-headset',
          component: PlayList
        },
        {
          title: '我的喜爱',
          page: 'myFavorite',
          icon: 'el-icon-star-on',
          component: MyFavorite
        }
      ]
    },
    {
      item: [
        {
          title: 'Mv',
          page: 'mv',
          icon: 'el-icon-video-camera',
          component: Mv
        },
        {
          title: 'Radio',
          page: 'radio',
          icon: 'el-icon-s-help',
          component: Radio
        },
        {
          title: 'Disc',
          page: 'disc',
          icon: 'el-icon-s-order',
          component: Disc
        },
        {
          title: 'Web',
          page: 'web',
          icon: 'el-icon-s-promotion',
          component: Web
        }
      ]
    }
  ]
  /** 监听store中的数据变化 */
  @Watch('$store.state.current', { immediate: true, deep: true })
  setCurrentIndex(newValue: any) {
    this.currentNavIndex = newValue.currentNavIndex
    this.currentItemIndex = newValue.currentItemIndex
  }

  /**
   * @return {*}
   * @note:
   * @param {any} component 当前选中的组件
   * @param {number} index
   * @param {number} sindex
   */
  handleCheckPage(component: any, index: number, sindex: number) {
    console.log(index + ':' + sindex)
    this.currentNavIndex = index
    this.currentItemIndex = sindex
    this.$emit('checkComponent', component)
  }
}
</script>

<style scoped></style>
