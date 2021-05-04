<template>
  <div class="echarts">
    <div id="myChart"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import './index.less'

var echarts = require('echarts')
@Component
export default class Echarts extends Vue {
  countListen: any = []
  mounted() {
    this.replaceStr()
    this.drawLine()
  }

  replaceStr() {
    let countListen: any = (localStorage.getItem('countListen') || '').split(
      ','
    )
    if (countListen) {
      this.countListen = countListen
    }
    console.log(this.countListen)
  }

  drawLine() {
    var then = this
    const countListen = this.countListen
    // 初始化echarts实例
    let myChart = echarts.init(document.getElementById('myChart'))
    // 屏幕尺寸变化时，重新调整图表元素大小
    let sizeFun = function() {
      myChart.resize()
    }
    window.addEventListener('resize', sizeFun)
    // 绘制图表
    myChart.setOption({
      legend: {
        top: 'bottom'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: '面积模式',
          type: 'pie',
          radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: countListen[0], name: '星期日' },
            { value: countListen[1], name: '星期一' },
            { value: countListen[2], name: '星期二' },
            { value: countListen[3], name: '星期三' },
            { value: countListen[4], name: '星期四' },
            { value: countListen[5], name: '星期五' },
            { value: countListen[6], name: '星期六' }
          ]
        }
      ]
    })
  }
}
</script>

<style scoped></style>
