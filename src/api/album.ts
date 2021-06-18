/**
 * 获取新碟
 */
import { get } from './http'
const basePath = '/cloud/'

const getAlbumNew = (data?: any) => get(`${basePath}album/new`, data)

export default { getAlbumNew }
