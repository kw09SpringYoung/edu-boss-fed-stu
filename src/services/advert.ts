import request from '@/utils/request'
import { AxiosPromise } from 'axios'

// 获取所有的广告列表
export const getAdList = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList'
  })
}
// 获取所有的广告位
export const getAllSpaces = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces'
  })
}
