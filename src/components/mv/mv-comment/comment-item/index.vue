<template>
  <div class="comment-item">
    <div class="comment-item__user">
      <img :src="commentItem.user.avatarUrl" alt="" />
    </div>
    <div class="comment-item__comment">
      <div class="uname">{{ commentItem.user.nickname }}</div>
      <div class="content">{{ commentItem.content }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import './index.less'

@Component
export default class CommentItem extends Vue {
  @Prop() private commentItem!: any
}
</script>

<style scoped></style>
