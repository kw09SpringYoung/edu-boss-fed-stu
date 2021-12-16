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

// 获取角色
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

// 获取所有角色
export const getAllRoles = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

// 查询用户角色
export const getRoleByUserId = (userId: string | number): AxiosPromise => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}

//  给用户分配角色
interface UserRoles {
  roleIdList: unknown[]
  userId: string | number
}
export const allocateUserRoles = (data: UserRoles) => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}
