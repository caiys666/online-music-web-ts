/**
 * 接口调用层
 */

import axios from 'axios'
 
export const get = (url:string, params:object) => axios.get(url, {
    params,
  })
export const post = (url:string, params:object) => axios.post(url, params)
