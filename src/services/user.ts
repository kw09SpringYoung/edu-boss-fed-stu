/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
import qs from 'qs'
// import store from '@/store/index'
import { AxiosPromise } from 'axios'

interface User {
  phone: string
  password: string
}

export const login = (data: User): AxiosPromise => {
  return request({
    method: 'POST',
    // headers: {
    //   'content-type': 'application/x-www-form-urlencoded'
    // },
    // 如果data是普通对象，则Content-Type是application/json
    // 如果data是qs.stringify(data)转换之后的数据：key=value&key=valu，则Content-Type会被设置成application/x-www-form-urlencoded
    // 如果data是FormData对象，则Content-Type是multipart/form-data
    url: '/front/user/login',
    data: qs.stringify(data)// axios 默认发送的是application/json格式的数据
  })
}

export const getUserInfo = (): AxiosPromise => {
  return request({
    // headers: {
    //   Authorization: store.state.user.access_token
    // },
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
