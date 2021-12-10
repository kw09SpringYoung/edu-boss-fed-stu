/**
 * 角色管理相关请求模块
 */
import request from '@/utils/request'
// import qs from 'qs'
// import store from '@/store/index'
import { AxiosPromise } from 'axios'

// 按条件查询角色
export const getRolePages = (data = {}): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

export const saveOrUpdate = (data: unknown): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

export const getRoleById = (id: string | number): AxiosPromise => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}

export const deleteRoleById = (id: string | number): AxiosPromise => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}
