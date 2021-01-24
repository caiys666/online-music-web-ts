<template>
  <div class="radio">
    <div class="radio__category">
      <div
        class="radio__category__item"
        v-for="(item, index) in categoryList"
        :key="index"
      >
        <img :src="item.backImg" alt="" @click="handleSelected(item)" />
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
    <div v-if="!selectText">
      <h2>电台个性推荐</h2>
      <RadioList :DjRadios="recommendDjRadios" />
    </div>
    <div v-else>
      <h2>{{ selectText }}</h2>
      <RadioList :DjRadios="DjRadios" />
    </div>
    <!-- <h2>热门电台</h2>
    <RadioList :DjRadios="hotDjRadios" />
    <h2>24小时电台节目</h2>
    <RadioList :DjRadios="hoursDjRadios" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import radio from '@/api/radio'
import RadioList from '@/components/lists/radio-list/index.vue'
import categoryList from './radioCategory'
import './index.less'

@Component({
  components: { RadioList }
})
export default class Radio extends Vue {
  // 获取store中的djRadios
  storeDjRadios: any = []
  // 不同分类下的DjRadios
  DjRadios: any = []
  // 推荐电台
  recommendDjRadios: any = []
  // 热门电台
  hotDjRadios: any = []
  // 24小时电台
  hoursDjRadios: any = []
  // 分类数组
  categoryList: any = []
  // 选择分类之后的文字
  selectText: string = ''
  @Watch('$store.state.djRadios', { immediate: true, deep: true })
  getDjRadios(newValue: any) {
    // console.log(newValue)
    this.storeDjRadios = newValue
  }
  mounted() {
    if (!this.storeDjRadios.length) {
      this.getRadioPersonalize()
      this.getHotRadio()
      this.getHoursRadio()
    }
    this.categoryList = categoryList
  }
  /**
   * @note: 选择相应的分类标签
   * @return {*}
   * @param {any} item
   */
  handleSelected(item: any) {
    this.DjRadios = []
    this.selectText = item.title
    switch (item.type) {
      case '1': {
        this.getRadioPersonalize()
        break
      }
      case '2': {
        this.getHotRadio()
        break
      }
      case '3': {
        this.getTopListRadio()
        break
      }
      case '4': {
        this.getTopListPay()
        break
      }
      case '5': {
        this.getHoursRadio()
        break
      }
      case '6': {
        this.getHoursAnchor()
        break
      }
      case '7': {
        this.getNewAnchor()
        break
      }
      case '8': {
        this.getHotAnchor()
        break
      }
      case '9': {
        this.getNewRadioList()
        break
      }
      case '10': {
        this.getCategoryRadio()
        break
      }
      case '11': {
        this.getCommend()
        break
      }
      case '12': {
        this.getCategory()
        break
      }
      case '13': {
        this.getRecommendCategory()
        break
      }
      case '14': {
        this.getSubscribe()
        break
      }
      case '15': {
        this.getPaygift()
        break
      }
      case '16': {
        this.getExcludehot()
        break
      }
      case '17': {
        this.getRecommendType()
        break
      }
      case '18': {
        this.getTodayPrfered()
        break
      }
    }
  }
  /**
   * @note: 电台个性推荐
   * @return {*}
   */
  getRadioPersonalize() {
    radio.getRadioPersonalize().then(res => {
      this.recommendDjRadios = res.data.data
      this.DjRadios = res.data.data
    })
  }
  /**
   * @note: 热门电台
   * @return {*}
   */
  getHotRadio() {
    radio.getHotRadio().then(res => {
      // this.hotDjRadios = res.data.djRadios
      this.DjRadios = res.data.djRadios
    })
  }
  /**
   * @note: 电台节目榜
   * @return {*}
   */
  getTopListRadio() {
    radio.getTopListRadio().then(res => {
      const list = res.data.toplist
      list.forEach((k: any) => {
        this.DjRadios.push(k.program.radio)
      })
    })
  }
  /**
   * @note: 付费精品
   * @return {*}
   */
  getTopListPay() {
    radio.getTopListPay().then(res => {
      this.DjRadios = res.data.data.list
    })
  }
  /**
   * @note: 24小时节目榜
   * @return {*}
   */
  getHoursRadio() {
    radio.getHoursRadio().then(res => {
      const list = res.data.data.list
      list.forEach((k: any) => {
        this.DjRadios.push(k.program.radio)
      })
    })
  }
  /**
   * @note: 24小时主播榜
   * @return {*}
   */
  getHoursAnchor() {
    radio.getHoursAnchor().then(res => {
      this.DjRadios = res.data.data.list
    })
  }
  /**
   * @note: 主播新人榜
   * @return {*}
   */
  getNewAnchor() {
    radio.getNewAnchor().then(res => {
      this.DjRadios = res.data.data.list
    })
  }
  /**
   * @note: 最热主播榜
   * @return {*}
   */
  getHotAnchor() {
    radio.getHotAnchor().then(res => {
      this.DjRadios = res.data.data.list
    })
  }
  /**
   * @note: 新晋电台榜
   * @return {*}
   */
  getNewRadioList() {
    radio.getNewRadioList().then(res => {
      this.DjRadios = res.data.toplist
    })
  }
  /**
   * @note: 类别热门电台
   * @return {*}
   */
  getCategoryRadio() {
    radio.getCategoryRadio().then(res => {
      console.log(res.data)
    })
  }
  /**
   * @note: 推荐
   * @return {*}
   */
  getCommend() {
    radio.getCommend().then(res => {
      console.log(res.data)
      this.DjRadios = res.data.djRadios
    })
  }
  /**
   * @note: 电台分类
   * @return {*}
   */
  getCategory() {
    radio.getCategory().then(res => {
      console.log(res.data)
    })
  }
  /**
   * @note: 分类推荐
   * @return {*}
   */
  getRecommendCategory() {
    radio.getRecommendCategory().then(res => {
      console.log(res.data)
    })
  }
  /**
   * @note: 电台 - 订阅
   * @return {*}
   */
  getSubscribe() {
    radio.getSubscribe().then(res => {
      console.log(res.data)
    })
  }
  /**
   * @note: 电台的订阅列表
   * @return {*}
   */
  getSubscribeList() {
    radio.getSubscribeList().then(res => {
      console.log(res.data)
    })
  }
  /**
   * @note: 电台 - 付费精选
   * @return {*}
   */
  getPaygift() {
    radio.getPaygift().then(res => {
      console.log(res.data)
      this.DjRadios = res.data.data.list
    })
  }
  /**
   * @note: 电台 - 非热门类型
   * @return {*}
   */
  getExcludehot() {
    radio.getExcludehot().then(res => {
      console.log(res.data)
      this.DjRadios = res.data.data
    })
  }
  /**
   * @note: 电台 - 推荐类型
   * @return {*}
   */
  getRecommendType() {
    radio.getRecommendType().then(res => {
      console.log(res.data)
    })
  }
  /**
   * @note: 电台 - 今日优选
   * @return {*}
   */
  getTodayPrfered() {
    radio.getTodayPrfered().then(res => {
      console.log(res.data)
      this.DjRadios = res.data.data
    })
  }
  /**
   * @note: 电台 - 详情
   * @return {*}
   */
  getRadioDetail() {
    radio.getRadioDetail().then(res => {
      console.log(res.data)
    })
  }
  /**
   * @note: 电台 - 节目
   * @return {*}
   */
  getRadioProgram() {
    radio.getRadioProgram().then(res => {
      console.log(res.data)
    })
  }
  /**
   * @note: 电台 - 节目详情
   * @return {*}
   */
  getProgramDetail() {
    radio.getProgramDetail().then(res => {
      console.log(res.data)
    })
  }
}
</script>

<style scoped></style>
