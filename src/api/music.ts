import {get,post} from './http'

const basePath = '/cloud/'
// 获取轮播图
const getBannerList = (data?: any) => get(`${basePath}banner`, data)
// 获取歌单

export default {getBannerList}
