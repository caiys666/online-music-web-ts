/**
 * 电台相关接口定义
 */

import { get } from './http'

const basePath = '/cloud/dj/'
// 电台个性推荐
const getRadioPersonalize = (data?: any) =>
  get(`${basePath}personalize/recommend`, data)

// 热门电台
const getHotRadio = (data?: any) => get(`${basePath}hot`, data)

// 电台节目榜
const getTopListRadio = (data?: any) => get(`${basePath}program/toplist`, data)

// 付费精品
const getTopListPay = (data?: any) => get(`${basePath}toplist/pay`, data)

// 二十四小时节目榜
const getHoursRadio = (data?: any) =>
  get(`${basePath}program/toplist/hours`, data)

// 24小时主播榜
const getHoursAnchor = (data?: any) => get(`${basePath}toplist/hours`, data)

// 主播新人榜
const getNewAnchor = (data?: any) => get(`${basePath}toplist/newcomer`, data)

// 最热主播榜
const getHotAnchor = (data?: any) => get(`${basePath}toplist/popular`, data)

// 新晋电台榜/热门电台榜
const getNewRadioList = (data?: any) => get(`${basePath}toplist?type=new`, data)

// 类别热门电台
const getCategoryRadio = (data?: any) => get(`${basePath}radio/hot`, data)

// 推荐
const getCommend = (data?: any) => get(`${basePath}recommend`, data)

// 电台 - 分类
const getCategory = (data?: any) => get(`${basePath}catelist`, data)

// 分类推荐  必选参数 : type: 电台类型 , 数字 , 可通过/dj/catelist获取 , 对应关系为 id 对应 此接口的 type, name 对应类型
const getRecommendCategory = (data?: any) =>
  get(`${basePath}recommend/type`, data)

// 电台 - 订阅
const getSubscribe = (data?: any) => get(`${basePath}sub`, data)

// 电台的订阅列表
const getSubscribeList = (data?: any) => get(`${basePath}sublist`, data)

// 电台 - 付费精选
const getPaygift = (data?: any) => get(`${basePath}paygift`, data)

// 电台 - 非热门类型
const getExcludehot = (data?: any) =>
  get(`${basePath}category/excludehot`, data)

// 电台 - 推荐类型
const getRecommendType = (data?: any) =>
  get(`${basePath}category/recommend`, data)

// 电台 - 今日优选
const getTodayPrfered = (data?: any) => get(`${basePath}today/perfered`, data)

// 电台 - 详情
const getRadioDetail = (data?: any) => get(`${basePath}detail`, data)

// 电台 - 节目
const getRadioProgram = (data?: any) => get(`${basePath}program`, data)

// 电台 - 节目详情
const getProgramDetail = (data?: any) => get(`${basePath}program/detail`, data)

export default {
  getRadioPersonalize,
  getHotRadio,
  getTopListRadio,
  getHoursRadio,
  getTopListPay,
  getHoursAnchor,
  getNewAnchor,
  getHotAnchor,
  getNewRadioList,
  getCategoryRadio,
  getCommend,
  getCategory,
  getRecommendCategory,
  getSubscribe,
  getSubscribeList,
  getPaygift,
  getExcludehot,
  getRecommendType,
  getTodayPrfered,
  getRadioDetail,
  getRadioProgram,
  getProgramDetail
}
