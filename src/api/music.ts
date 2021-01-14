import { get, post } from './http'

const basePath = '/cloud/'
// 获取轮播图
const getBannerList = (data?: any) => get(`${basePath}banner`, data)

// 获取歌曲trackid
const getTrackIds = (data?: any) => get(`${basePath}playlist/detail`, data)

// 获取歌曲id
const getSongIds = (data?: any) => get(`${basePath}song/detail`, data)

// 获取歌曲url
const getSongUrl = (data?: any) => get(`${basePath}song/url`, data)

// 获取歌词信息
const getSongLyric = (data?: any) => get(`${basePath}lyric`, data)

// 获取精选歌单 /top/playlist
const getTopPlayList = (data?: any) => get(`${basePath}top/playlist`, data)

// 获取推荐mv进行轮播
const getPersonalizedMv = (data?: any) =>
  get(`${basePath}personalized/mv`, data)

// 获取所有mv
const getMvAll = (data?: any) => get(`${basePath}/mv/all`, data)

// mv视频搜索
const getCloudSearch = (data?: any) => get(`${basePath}cloudsearch`, data)

export default {
  getBannerList,
  getPersonalizedMv,
  getMvAll,
  getCloudSearch,
  getTrackIds,
  getSongIds,
  getSongUrl,
  getSongLyric,
  getTopPlayList
}
