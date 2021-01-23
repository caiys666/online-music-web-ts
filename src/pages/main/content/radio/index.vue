<template>
  <div class="radio">
    <h2>电台个性推荐</h2>
    <RadioList :DjRadios="recommendDjRadios" />
    <h2>热门电台</h2>
    <RadioList :DjRadios="hotDjRadios" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import radio from '@/api/radio'
import RadioList from '@/components/lists/radio-list/index.vue'
import './index.less'

@Component({
  components: { RadioList }
})
export default class Radio extends Vue {
  djRadios: any = []
  recommendDjRadios: any = []
  hotDjRadios: any = []
  @Watch('$store.state.djRadios', { immediate: true, deep: true })
  getDjRadios(newValue: any) {
    console.log(newValue)
    this.djRadios = newValue
  }
  mounted() {
    if (!this.djRadios.length) {
      this.getRadioPersonalize()
      this.getHotRadio()
    }
  }
  getRadioPersonalize() {
    radio.getRadioPersonalize().then(res => {
      this.recommendDjRadios = res.data.data
    })
  }
  getHotRadio() {
    radio.getHotRadio().then(res => {
      console.log(res.data)
      this.hotDjRadios = res.data.djRadios
    })
  }
}
</script>

<style scoped></style>
