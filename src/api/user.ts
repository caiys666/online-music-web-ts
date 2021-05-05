/**
 * 用户信息接口
 */
import { get, post } from './http'
const basePath = '/cloud/'

/**
 * 用户登录接口
 * @param data Object
 * @returns
 */
const getUserLogin = (data?: any) => get(`${basePath}login/cellphone`, data)

/**
 * 获取国家地区列表
 * @param data Object
 * @returns
 */
const getAreaList = (data?: any) => get(`${basePath}/countries/code/list`, data)

/**
 * 更新用户信息
 * @param data Object
 * @returns
 */
const updateUserInfo = (data?: any) => get(`${basePath}/user/update`, data)

/**
 * 获取用户详情信息
 * @param data Object
 * @returns
 */
const getUserDetail = (data?: any) => get(`${basePath}/user/account`, data)

/**
 * 获取验证码
 * @param data Object
 * @returns
 */
const getCaptcha = (data?: any) => get(`${basePath}/captcha/sent`, data)

/**
 * 验证验证码
 * @param data Object
 * @returns
 */
const validCaptcha = (data?: any) => get(`${basePath}/captcha/verify`, data)

/**
 * 注册
 * @param data Object
 * @returns
 */
const registerUser = (data?: any) => get(`${basePath}/register/cellphone`, data)

/**
 * 获取用户歌单信息
 * @param data Object
 * @returns
 */
const getUserPlayList = (data?: any) => get(`${basePath}/user/playlist`, data)

/**
 * 收藏/取消收藏歌单
 * t : 类型,1:收藏,2:取消收藏 id : 歌单 id
 * @param data Object
 * @returns
 */
const subscribePlaylist = (data?: any) =>
  get(`${basePath}/playlist/subscribe`, data)

export default {
  getUserLogin,
  getAreaList,
  updateUserInfo,
  getUserDetail,
  getCaptcha,
  validCaptcha,
  registerUser,
  getUserPlayList,
  subscribePlaylist
}
