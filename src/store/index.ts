import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 当前选中的component
    current: {
      currentIndex: 0,
      currentComponent: "",
    },
    // 点击歌单进行歌曲初始化数组
    songIds: [],
    songLists: [],
    songLyric: [],
  },
  mutations: {
    initSongIds(state, item) {
      state.songIds = item;
    },
    initSongLists(state, item) {
      state.songLists = item;
    },
    // 设置当前的动态component
    setCurrentComponent(state, item) {
      state.current = item;
    },
    // 初始化歌词列表
    initSongLyric(state, item) {
      state.songLyric = item;
    },
  },
  actions: {},
  modules: {},
});
