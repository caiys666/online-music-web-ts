<template>
  <div>登录界面</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  created() {
    this.$router.push({
      name: "Main",
    });
  }
}
</script>

<style scoped></style>
