<template>
  <div class="comment">
    <div class="comment__title">
      <span>{{ commentList.total }}</span>
      <span style="margin-left:1vw">评论</span>
    </div>
    <div class="comment__send">
      <div class="user-face">
        <img src="../../../assets/images/dilireba@2x.jpg" alt="" />
      </div>
      <div class="textarea-container">
        <textarea class="comment-text" placeholder="发表友善的评论"></textarea>
        <el-button class="send-btn" type="primary">发表评论</el-button>
      </div>
    </div>
    <div>热门评论</div>
    <div v-for="(item, index) in commentList.hotComments" :key="index">
      <CommentItem :commentItem="item" />
    </div>
    <div>评论</div>
    <div
      v-for="(sitem, sindex) in commentList.comments"
      :key="20 * sindex + 999"
    >
      <CommentItem :commentItem="sitem" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import music from '@/api/music.ts'
import CommentItem from './comment-item/index.vue'
import './index.less'

@Component({
  components: { CommentItem }
})
export default class MvComment extends Vue {
  @Prop() private mvid!: any
  // 评论列表
  commentList: any = []
  /** 进行请求评论数据 */
  mounted() {
    // 获取mv评论列表
    music.getMvComment({ id: this.mvid }).then(res => {
      this.commentList = res.data
    })
  }
}
</script>

<style scoped></style>
