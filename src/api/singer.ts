/**
 * 获取歌手以及艺术家信息接口
 */
import { get } from './http'
const basePath = '/cloud/'

// 获取artist信息
const getArtist = (data?: any) => get(`${basePath}artists`, data)

export default { getArtist }
