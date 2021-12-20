import axios, { AxiosInstance } from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({ refreshtoken: store.state.user.refresh_token })
  })
}
const request:AxiosInstance = axios.create({})
// 请求拦截器
request.interceptors.request.use(config => {
  // 我们在这里通过改写config配置信息来实现新业务功能的统一处理
  const { user } = store.state
  if (user && user.access_token) {
    config.headers && (config.headers.Authorization = user.access_token)
  }
  // 注意：这里一定要返回config，否则请求发不出去
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
type Fn = {
  (): void
}
let isRefreshing = false // 控制刷新token的状态
let requests: Fn[] = [] // 存储刷新token期间过来的401请求
request.interceptors.response.use(response => { // 状态码为2xx都会进入这里
  // 如果自定义状态码，错误处理都执行在这里
  return response
}, async error => {
  // 如果使用了HTTP状态码，错误处理就写在这里
  if (error.response) { // 请求发出去收到响应了，但服务端返回超出2xx的状态码
    // 400  401 403 404 500 具体看和后端的约定
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token无效（没有提供token token是无效的 token过期了）
      if (!store.state.user) { // 如果没有refresh_token，直接跳转登录页
        redirectLogin()
        return Promise.reject(error)
      }
      // 如果有refresh_token则尝试使用refresh_token获取新的access_token
      // 尝试刷新token
      // 刷新token
      if (!isRefreshing) {
        isRefreshing = true // 开启刷新状态
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新token失败')
          }

          // 刷新 token 成功了
          store.commit('setUser', res.data.content)
          // 将requests队列中的请求重新发送出去
          requests.forEach(cb => cb())
          // 重置requests数组
          requests = []
          return request(error.config)
        }).catch(error => {
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRefreshing = false // 重置刷新状态
        })
      }
      // 刷新状态下，把请求挂起放到request数组中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error(`请求失败：${error.message}`)
      // router.push({
      //   name: '403'
      // })
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status === 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去但没有响应
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生一些事情，触发错误
    Message.error(`请求失败，${error.message}`)
  }
  // 把请求失败的错误对象继续抛出
  return Promise.reject(error)
})

export default request
