<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Axios from 'axios'
import { createApi } from 'unsplash-js'

@Component({})
export default class App extends Vue {
  created() {
    Axios.post('/api/test')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  mounted() {
    const browserApi = createApi({
      apiUrl: 'https://mywebsite.com/unsplash-proxy'
      //...other fetch options
    })
    const unsplash = createApi({
      accessKey: 'iJ5qGrnu2z_8MZbwfhZ3ia94eA2GF4TouhAP564Is18'
    })

    // non-feed example
    // browserApi.photos.get({ photoId: 'foo' }).then(result => {
    //   if (result.errors) {
    //     // handle error here
    //     console.log('error occurred: ', result.errors[0])
    //   } else {
    //     // handle success here
    //     const photo = result.response
    //     console.log(photo)
    //   }
    // })
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // background-image: url('./assets/images/dilireba@2x.jpg');
  // background-image: linear-gradient(135deg, #fff5c3 10%, #9452a5 100%);
  background-repeat: repeat;
  background-position: center;
}

body,
html {
  padding: 0;
  margin: 0;
}
</style>
