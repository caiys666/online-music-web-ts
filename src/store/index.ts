import Vue from 'vue'
import Vuex from 'vuex'
import { message } from 'ant-design-vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前选中的component
    current: {
      currentIndex: 0,
      currentComponent: ''
    },
    // 点击歌单进行歌曲初始化数组
    // 歌曲id数组
    songIds: [],
    // 歌曲列表数组
    songLists: [],
    // 歌词列表数组
    songLyric: [],
    // 电台数组
    djRadios: [],
    // 歌曲播放的index
    currentIndex: 0
  },
  mutations: {
    /**
     * note 初始化歌曲id数组
     * @param state
     * @param item
     */
    initSongIds(state, item) {
      state.songIds = item
    },
    /**
     * note 初始化歌曲数组
     * @param state
     * @param item
     */
    initSongLists(state, item) {
      state.songLists = item
    },
    // 设置当前的动态component
    setCurrentComponent(state, item) {
      state.current = item
    },
    /**
     * note 初始化歌词列表
     * @param state
     * @param item
     */
    initSongLyric(state, item) {
      state.songLyric = item
    },
    /**
     * note 初始化电台
     * @param state
     * @param djRadios
     */
    initDjRadios(state, djRadios) {
      state.djRadios = djRadios
    },
    /**
     * note 设置当前播放歌曲的index
     * @param state
     * @param index
     */
    setIndex(state, index) {
      state.currentIndex = index
    },
    /**
     * note 增加index
     * @param state
     * @param index 当前歌曲的index
     */
    addIndex(state, index) {
      if (index < state.songLists.length - 1) {
        state.currentIndex++
      } else {
        message.error('不能再加了！')
      }
    },
    /**
     * note 减少index
     * @param state
     * @param index 当前歌曲的index
     */
    reduceIndex(state, index) {
      if (index > 0) {
        state.currentIndex--
      } else {
        message.error('不能再减了！')
      }
    }
  },
  actions: {},
  modules: {}
})
