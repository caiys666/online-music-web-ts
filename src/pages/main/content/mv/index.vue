<template>
  <a-spin :spinning="spinning">
    <div class="mv">
      <!-- <mv-banner :bannerList="bannerList" /> -->
      <div class="mv__search">
        <img
          class="mv__search__logo"
          src="../../../../assets/images/girl@2x.png"
          alt=""
        />
        <el-input
          placeholder="请输入内容"
          v-model="inputValue"
          @change="handleSearch"
          @blur="handleSearch"
          clearable
        >
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
      </div>
      <div class="mv__sort">
        <div
          class="mv__sort__area item"
          v-for="(item, index) in sortList"
          :key="index"
        >
          <div class="title">{{ item.title }}</div>
          <div
            class="option"
            :class="[sitem.checked ? 'actived' : '']"
            v-for="(sitem, sindex) in item.item"
            :key="sindex"
            @click="handleCheckType(item, sitem, index, sindex)"
          >
            {{ sitem.desc }}
          </div>
        </div>
      </div>
      <mv-list :mvList="mvList" />
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="50"
        @current-change="handleChangePagination"
      >
      </el-pagination></div
  ></a-spin>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import music from '@/api/music'
import MvBanner from '@/components/lists/mv-banner/index.vue'
import MvList from '@/components/lists/mv-list/index.vue'
import './index.less'

@Component({
  components: { MvBanner, MvList }
})
export default class Mv extends Vue {
  // 输入框绑定value
  inputValue: string = ''
  // 点击分类进行样式该变
  changeIndex: any = {
    itemIndex: 0,
    sitemIndex: 0
  }
  // 搜索需要的参数对象
  searchParams: any = {
    keywords: '',
    limit: 50,
    offset: 0,
    type: 1004
  }
  // 总数量
  total: number = 0
  spinning: boolean = true
  // 选择的筛选数组
  dataParams: any = {
    area: '全部',
    type: '全部',
    order: '上升最快',
    limit: 50,
    offset: 0
  }
  // 轮播图数组
  bannerList: any = []
  // 排序数组
  sortList: any = [
    {
      title: '全部地区',
      item: [
        { desc: '全部', type: 'area', checked: true },
        { desc: '内地', type: 'area', checked: false },
        { desc: '港台', type: 'area', checked: false },
        { desc: '欧美', type: 'area', checked: false },
        { desc: '日本', type: 'area', checked: false },
        { desc: '韩国', type: 'area', checked: false }
      ]
    },
    {
      title: '全部版本',
      item: [
        { desc: '全部', type: 'type', checked: true },
        { desc: '官方版', type: 'type', checked: false },
        { desc: '原生', type: 'type', checked: false },
        { desc: '现场版', type: 'type', checked: false },
        { desc: '网易出品', type: 'type', checked: false }
      ]
    },
    {
      title: '综合排序',
      item: [
        { desc: '上升最快', type: 'order', checked: true },
        { desc: '最热', type: 'order', checked: false },
        { desc: '最新', type: 'order', checked: false }
      ]
    }
  ]
  // 传递到子组件中的mv数据数组
  mvList: any = []
  mounted() {
    /** 获取推荐mv进行轮播 */
    music.getPersonalizedMv().then(res => {
      this.bannerList = res.data.result
    })
    /** 获取默认数据 */
    this.getData()
  }

  /**
   * 设置加载
   */
  setSpin() {
    setTimeout(() => {
      this.spinning = false
    }, 2000)
  }

  /** 监听输入框的内容是否为空  为空进行默认数据展示 */
  @Watch('inputValue', { immediate: true, deep: true })
  setDefaultData(newValue: any) {
    // console.log(newValue)
    if (newValue === '') {
      /** 获取默认数据 */
      this.getData()
    }
  }
  getData() {
    this.spinning = true
    music.getMvAll(this.dataParams).then(res => {
      this.mvList = res.data.data
      // console.log(res.data)
      if (res.data.count) {
        this.total = res.data.count
      }
    })
    this.setSpin()
  }
  /** 点击搜索按钮进行搜索  搜索的结果只包含视频 */
  handleSearch() {
    if (this.inputValue) {
      this.searchParams.keywords = this.inputValue
      music.getCloudSearch(this.searchParams).then(res => {
        // console.log(res.data)
        this.mvList = res.data.result.mvs
        this.total = res.data.result.mvCount
      })
    } else {
      this.getData()
    }
  }
  /** 点击分类进行请求数据 */
  handleCheckType(item: any, sitem: any, index: number, sindex: number) {
    item.item.forEach((k: any) => {
      k.checked = false
    })
    item.item[sindex].checked = true
    // console.log(sitem)
    switch (sitem.type) {
      case 'area': {
        this.dataParams.area = sitem.desc
        break
      }
      case 'type': {
        this.dataParams.type = sitem.desc
        break
      }
      case 'order': {
        this.dataParams.order = sitem.desc
      }
    }
    this.getData()
  }
  /**
   * @note: 分页逻辑
   * @return {*}
   * @param {number} cueenrtPage 当前页
   */
  handleChangePagination(cueenrtPage: number) {
    this.dataParams.offset = cueenrtPage
    this.getData()
  }
}
</script>

<style scoped></style>
