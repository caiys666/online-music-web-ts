<template>
  <div class="category">
    <div class="category__select">
      <div class="category__select__item">
        <el-select
          v-model="value"
          placeholder="请选择"
          @change="handelChangeSelect"
          size="medium"
        >
          <el-option
            v-for="(item, index) in selectCategory"
            :key="index"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div class="category__select__item">
        <el-select v-model="childValue" placeholder="请选择">
          <el-option
            v-for="(item, index) in currentChildCategory"
            :key="index"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <keep-alive>
      <Sheet :SheetList="sheetList" :cat="childValue" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import music from '@/api/music'
import axios from 'axios'
import Sheet from '@/components/sheet/index.vue'
import './index.less'

@Component({
  components: { Sheet }
})
export default class SongCategory extends Vue {
  // 父级选择数组
  selectCategory: any = []
  // 子级选择数组
  selectChildCategory: any = []
  // 当前子级选中下拉选项数组
  currentChildCategory: any = []
  // 歌单列表数组
  sheetList: any = []

  value = ''
  childValue = ''
  currentKey: any = 0

  @Watch('childValue', { immediate: true, deep: true })
  /** 监听当前下拉框选中的数据  进行请求 */
  getValue(newValue: any, oldValue: any) {
    // console.log(newValue)
    this.getCategorySheetInfo(newValue)
  }
  mounted() {
    this.getSelectCategory()
  }

  /** 获取下拉列表 */
  async getSelectCategory() {
    const res = await axios.get('/cloud/playlist/catlist')
    let categories = res.data.categories
    let childCategories = res.data.sub
    let categoryLength = Object.keys(categories).length
    Object.keys(categories).map(k => {
      this.selectCategory.push(categories[k])
    })
    for (let i = 0; i < categoryLength; i++) {
      let itemList: any = []
      Object.keys(childCategories).map(k => {
        if (childCategories[k].category === i) {
          itemList.push(childCategories[k])
        }
      })
      if (itemList !== []) {
        this.selectChildCategory.push(itemList)
      }
    }
    /** 初始化下拉数据显示 */
    this.value = categories[0]
    this.currentChildCategory = this.selectChildCategory[0]
    this.childValue = this.currentChildCategory[0].name
    console.log(this.selectChildCategory)
  }

  /**
   * 获取对应下拉选中数据的歌单信息
   */
  getCategorySheetInfo(value: any) {
    let data = {
      cat: value
    }
    music.getTopPlayList(data).then(res => {
      this.sheetList = res.data.playlists
    })
  }

  /**
   * 下拉进行切换childCategory
   */
  handelChangeSelect(value: any) {
    Object.keys(this.selectCategory).map(k => {
      if (this.selectCategory[k] === value) {
        this.currentKey = k
      }
    })
    this.currentChildCategory = this.selectChildCategory[this.currentKey]
    this.childValue = this.currentChildCategory[0].name
  }
}
</script>
