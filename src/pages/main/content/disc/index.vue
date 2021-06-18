<template>
  <a-spin :spinning="spinning">
    <div class="disc">
      <h2 style="margin:1vw">全部新碟</h2>
      <div class="disc-albums">
        <div
          class="disc-albums-item"
          v-for="(item, index) in albums"
          :key="index"
        >
          <div
            class="ddai-img"
            :style="[
              {
                background: `url(${item.picUrl})`
              }
            ]"
          ></div>
          <div class="commend">{{ item.name }}</div>
          <div class="ddai-artists">
            <div
              class="commend"
              v-for="(aitem, aindex) in item.artists"
              :key="aindex"
            >
              {{ aitem.name }}
            </div>
          </div>
          <div class="commend company">{{ item.company }}</div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleChangePagination"
      >
      </el-pagination></div
  ></a-spin>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import album from '@/api/album'
import './index.less'
import { Dialog } from 'node_modules/element-ui/types'

interface Pagination {
  pageSize: number
  total: number
  offset: number
}

// 分页的数据
const pagination: Pagination = {
  pageSize: 50,
  total: 0,
  offset: 0
}
@Component
export default class Disc extends Vue {
  albums: Array<Object> = []
  // 总数量
  total: number = 0

  spinning: boolean = true
  mounted() {
    this.getAlbumNew()
    this.setSpin()
  }

  /**
   * 设置加载
   */
  setSpin() {
    setTimeout(() => {
      this.spinning = false
    }, 2000)
  }
  /**
   * @note: 获取新碟
   * @return {*}
   */
  getAlbumNew() {
    const data = {
      limit: pagination.pageSize,
      offset: pagination.offset
    }
    album.getAlbumNew(data).then(res => {
      this.albums = res.data.albums
      this.total = res.data.total
    })
  }
  handleChangePagination(currentPage: number) {
    pagination.offset = currentPage
    this.getAlbumNew()
  }
}
</script>

<style scoped></style>
