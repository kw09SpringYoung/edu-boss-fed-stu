/**
 * 菜单相关请求模块
 */
import request from '@/utils/request'
import { AxiosPromise } from 'axios'

interface User {
  description: string
  href: string
  icon: string
  name: string
  orderNum: number
  parentId: number
  shown: boolean
}

export const saveOrUpdate = (data: User): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (id = -1): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export const getAll = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenuItem = (id: number): AxiosPromise => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
// 获取所有菜单并按层级展示
export const getMenuNodeList = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

// 给角色分配菜单 /boss/menu/allocateRoleMenus
interface AllocateRoleMenus {
  roleId: string | number
  menuIdList: (string|number)[]
}
export const allocateRoleMenus = (data: AllocateRoleMenus): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}
// 获取角色拥有的菜单列表
export const getRoleMenus = (roleId: string | number): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: { // 把参数转换成key=value&key=value
      roleId
    }
  })
}
