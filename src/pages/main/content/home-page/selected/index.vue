<template>
  <div>
    <a-spin :spinning="spinning">
      <div class="selected">
        <Sheet :songSheetUrl="songSheetUrl" />
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import music from '@/api/music.ts'
import Sheet from '@/components/sheet/index.vue'
import './index.less'

@Component({
  components: { Sheet }
})
export default class Selected extends Vue {
  @Prop() private songSheetUrl!: string

  spinning: boolean = true
  SongSheetList = []
  collectionIndex = -1

  /**
   * 跳转到播放列表页面
   */
  handleCollection(item: any, index: any) {
    this.collectionIndex = index
    this.$router.push({
      name: 'page',
      query: { page: 'playList', songSheetId: item.id }
    })
  }
  mounted() {
    music.getTopPlayList().then((res: any) => {
      this.SongSheetList = res.data.playlists
    })
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
}
</script>
