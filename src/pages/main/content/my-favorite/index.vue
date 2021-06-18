<template>
  <a-spin :spinning="spinning">
    <div class="myfavorite">
      <button class="reload" @click="getUserPlayList">重新加载</button>
      <div class="selected__container">
        <div
          class="selected__container__item"
          v-for="(item, index) in playlist"
          :key="index"
        >
          <div class="item-img">
            <div class="item-img__collect">
              <div
                class="img"
                :style="[
                  {
                    background: `url(${item.coverImgUrl})`
                  }
                ]"
                @click="handleCollection(item, index)"
              ></div>
            </div>
          </div>
          <div class="item-name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import user from '@/api/user'
import music from '@/api/music'
import PlayList from '@/pages/main/content/play-list/index.vue'
import './index.less'

@Component
export default class MyFavorite extends Vue {
  playlist: Array<any> = []
  spinning: boolean = true
  mounted() {
    this.getUserPlayList()
    this.setSpin()
  }

  setSpin() {
    setTimeout(() => {
      this.spinning = false
    }, 2000)
  }

  async getUserPlayList() {
    const obj = {
      uid: '283358410'
    }
    try {
      const res = await user.getUserPlayList(obj)
      if (res.data.code == 200) {
        this.playlist = res.data.playlist
      }
      console.log(this.playlist)
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * @note: 点击歌单进行歌曲数组初始化  并且跳转到播放列表
   * @return {*}
   * @param {any} item
   * @param {number} index
   */
  async handleCollection(item: any, index: number) {
    const data = {
      id: item.id
    }
    let trackIds: any = []
    const songIds: any = []
    const songLists: any = []
    const songLyric: any = []
    this.$nextTick(() => {
      /** 获取歌曲trackid */
      music.getTrackIds(data).then(res => {
        trackIds = res.data.playlist.trackIds
        getSongId()
      })
      /** 获取歌曲信息 */
      let getSongId = () => {
        trackIds.map((k: any) => {
          let songData = { ids: k.id }
          /** 获取歌曲id */
          music.getSongIds(songData).then(res => {
            songIds.push(res.data.songs[0])
            const songUrlData = { id: res.data.songs[0].id }
            /** 获取歌曲url */
            music.getSongUrl(songUrlData).then(res => {
              if (res.data.data[0]) {
                songLists.push(res.data.data[0])
              } else {
                songLists.push('')
              }
              this.$store.commit('initSongLists', songLists)
            })
            /** 获取歌词信息 */
            music.getSongLyric(songUrlData).then(res => {
              if (res.data) {
                songLyric.push(res.data.lrc.lyric || '')
              } else {
                songLyric.push('')
              }
              this.$store.commit('initSongLyric', songLyric)
            })
          })
        })
        /** 将信息存储到store中 */
        this.$store.commit('initSongIds', songIds)
      }
    })
    let currentIndex: number = Math.random()
    this.$store.commit('setCurrentComponent', {
      currentIndex: currentIndex,
      currentComponent: PlayList,
      currentNavIndex: 0,
      currentItemIndex: 2
    })
  }
}
</script>

<style scoped></style>
