<template>
  <div class="user-top">
    <div class="user">
      <div class="user__img"></div>
      <div class="user__name">{{ userName }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import './index.less'

@Component
export default class UserTop extends Vue {
  userName = '蔡永生'
}
</script>

<style scoped></style>
