/**
 * 资源相关请求模块
 */
import request from '@/utils/request'
// import qs from 'qs'
// import store from '@/store/index'
import { AxiosPromise } from 'axios'

export const getResourcePages = (data = {}): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}
// 获取所有资源
export const getAllResources = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}
// 查询资源分类列表
export const getAllCategories = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

// 给角色分配资源
interface AllocateRoleResources {
  roleId: string | number
  resourceIdList: (string|number)[]
}
export const allocateRoleResources = (data: AllocateRoleResources): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}
// 获取角色拥有的资源列表
export const getRoleResources = (roleId: number | string): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}

// 保存或者更新资源
interface SaveOrUpdateResource {
  categoryId: number | string
  description: string
  id?: number | string
  name: null | string
  url: null | string
}
export const saveOrUpdateResource = (data: SaveOrUpdateResource): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

// 删除资源
export const deleteResource = (id: number|string): AxiosPromise => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}
