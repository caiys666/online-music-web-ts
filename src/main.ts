import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Element from "element-ui";
import Antd from "ant-design-vue";
import VueAwesomeSwiper from "vue-awesome-swiper";

import "element-ui/lib/theme-chalk/index.css";
import "ant-design-vue/dist/antd.css";
import "swiper/swiper.scss";
import "./assets/iconfont/iconfont.css";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);
Vue.use(Element);
Vue.use(Antd);
Vue.prototype.$EventBus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
