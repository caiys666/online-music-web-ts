/**
 * 用户登录注册接口
 */
import { get } from './http'
const basePath = '/cloud/'

const getUserLogin = (data?: any) => get(`${basePath}login/cellphone`, data)

export default { getUserLogin }
