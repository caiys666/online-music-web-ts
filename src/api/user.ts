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

export default { getUserLogin, getAreaList, updateUserInfo, getUserDetail }
