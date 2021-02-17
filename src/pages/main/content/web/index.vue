<template>
  <div class="web">
    <h2>友情链接</h2>
    <div class="web-links">
      <div class="web-links-item" v-for="(item, index) in links" :key="index">
        <div
          class="web-links-item-img"
          :style="[
            {
              background: `url(${item.pic})`
            }
          ]"
          @click="handleRouter(item)"
        ></div>
        <div class="web-links-item-name">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import './index.less'

@Component
export default class Web extends Vue {
  // 友情链接数组
  links: Array<Object> = [
    {
      title: '掘金',
      pic:
        'https://sf6-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/logo.a7995ad.svg',
      address: 'https://juejin.cn/'
    },
    {
      title: 'CSDN',
      pic:
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3417623825,269538506&fm=26&gp=0.jpg',
      address: 'https://www.csdn.net/'
    },
    {
      title: '博客园',
      pic:
        'data:image/jpeg;base64,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',
      address: 'https://www.cnblogs.com/'
    },
    {
      title: '简书',
      pic:
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1231729851,1892679560&fm=26&gp=0.jpg',
      address: 'https://www.jianshu.com/'
    },
    {
      title: 'GitHub',
      pic:
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3446602327,1182419120&fm=26&gp=0.jpg',
      address: 'https://github.com/'
    },
    {
      title: 'Unitimes',
      pic: 'https://www.unitimes.pro/_nuxt/img/6a34306.png',
      address: 'https://www.unitimes.pro/'
    },
    {
      title: 'LeetCode',
      pic:
        'https://static.leetcode-cn.com/cn-mono-assets/production/assets/logo-dark-cn.c42314a8.svg',
      address: 'https://leetcode.com/leetcode/'
    },
    {
      title: '牛客网',
      pic:
        'data:image/jpeg;base64,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',
      address: 'https://www.nowcoder.com/'
    },
    {
      title: '百度前端技术学院',
      pic: 'http://ife.baidu.com/2018/asset/common/img/logo_a3b4064.png',
      address: 'http://ife.baidu.com/'
    },
    {
      title: '程序员客栈',
      pic:
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2503996867,13855089&fm=26&gp=0.jpg',
      address: 'https://www.proginn.com/'
    },
    {
      title: 'W3C',
      pic: 'https://7n.w3cschool.cn/statics/img/logo/indexlogo@2x.png',
      address: 'https://www.w3cschool.cn/'
    },
    {
      title: '菜鸟教程',
      pic:
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4165879255,2981443443&fm=26&gp=0.jpg',
      address: 'https://www.runoob.com/'
    },
    {
      title: 'MDN',
      pic:
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1247338998,3780498516&fm=26&gp=0.jpg',
      address: 'https://www.runoob.com/'
    },
    {
      title: 'VUE',
      pic: 'https://cn.vuejs.org/images/logo.png',
      address: 'https://cn.vuejs.org/'
    }
  ]
  // 跳转友情链接
  handleRouter(item: any) {
    window.open(item.address)
  }
}
</script>

<style scoped></style>
