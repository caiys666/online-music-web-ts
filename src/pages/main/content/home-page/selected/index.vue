<template>
  <div>
    <div class="selected">
      <Sheet :songSheetUrl="songSheetUrl" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getResponse } from '@/api/getMusic'
import Sheet from '@/components/sheet/index.vue'
import './index.less'

@Component({
  components: { Sheet }
})
export default class Selected extends Vue {
  @Prop() private songSheetUrl!: string

  SongSheetList = []
  collectionIndex = -1
  handleCollection(item: any, index: any) {
    this.collectionIndex = index
    this.$router.push({
      name: 'page',
      query: { page: 'playList', songSheetId: item.id }
    })
  }
  mounted() {
    const getTopList = getResponse
    getTopList(this.songSheetUrl).then((result: any) => {
      this.SongSheetList = result.playlists
    })
  }
}
</script>
