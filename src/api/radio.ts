import { get } from './http'

const basePath = '/cloud/dj/'
// 电台个性推荐
const getRadioPersonalize = (data?: any) =>
  get(`${basePath}personalize/recommend`, data)

// 热门电台
const getHotRadio = (data?: any) => get(`${basePath}hot`, data)

export default { getRadioPersonalize, getHotRadio }
