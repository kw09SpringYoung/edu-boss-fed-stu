import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: { // meta默认是个空对象
      requestAuth: true // 自定义数据
    },
    children: [
      {
        name: 'home',
        path: '', // path: '' ：默认子路由
        component: () => import(/* webpackChunkName:'home' */'@/views/home/index.vue')
      },
      {
        name: 'role',
        path: '/role',
        component: () => import(/* webpackChunkName:'role' */'@/views/role/index.vue')
      },
      {
        name: 'menu',
        path: '/menu',
        component: () => import(/* webpackChunkName:'menu' */'@/views/menu/index.vue')
      },
      {
        name: 'resource',
        path: '/resource',
        component: () => import(/* webpackChunkName:'resource' */'@/views/resource/index.vue')
      },
      {
        name: 'resource-classification',
        path: '/resource/resCategory',
        component: () => import(/* webpackChunkName:'alloc-resource' */'@/views/resource/add-edit-resources.vue'),
        props: true
      },
      {
        name: 'course',
        path: '/course',
        component: () => import(/* webpackChunkName:'course' */'@/views/course/index.vue')
      },
      {
        name: 'user',
        path: '/user',
        component: () => import(/* webpackChunkName:'user' */'@/views/user/index.vue'),
        meta: { // meta默认是个空对象
          requestAuth: true // 自定义数据
        }
      },
      {
        name: 'advert',
        path: '/advert',
        component: () => import(/* webpackChunkName:'advert' */'@/views/advert/index.vue')
      },
      {
        name: 'advert-space',
        path: '/advert-space',
        component: () => import(/* webpackChunkName:'advert-space' */'@/views/advert-space/index.vue')
      },
      {
        name: 'menu-create',
        path: '/menu/menu-create',
        component: () => import(/* webpackChunkName:'menu-create-edit' */'@/views/menu/create.vue')
      },
      {
        name: 'menu-edit',
        path: '/menu/:id/menu-edit',
        component: () => import(/* webpackChunkName:'menu-create-edit' */'@/views/menu/edit.vue')
      },
      {
        name: 'alloc-menu',
        path: '/role/:roleId/alloc-menu',
        component: () => import(/* webpackChunkName:'alloc-menu' */'@/views/role/alloc-menu.vue'),
        props: true // 将路由路径参数映射到组件的props数据中
      },
      {
        name: 'alloc-resource',
        path: '/role/:roleId/alloc-resource',
        component: () => import(/* webpackChunkName:'alloc-resource' */'@/views/role/alloc-resource.vue'),
        props: true
      },
      {
        name: '403',
        path: '/403',
        component: () => import(/* webpackChunkName:'error404' */'@/views/error-page/403.vue')
      }
    ]
  },
  {
    name: '404',
    path: '*',
    component: () => import(/* webpackChunkName:'error404' */'@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫，任何爷main的访问都要经过这里
// to 要去哪里的路由信息
// from 从哪里来的路由信息
// next 通行的标志

router.beforeEach((to, from, next) => {
  // 校验登录状态
  // to.matched是匹配到的路由数组
  // 1 如果需要身份认证: 认证通过--next() 认证不通过，路由跳回登录页面
  // 2 如果不需要身份认证 --- 直接next()
  if (to.matched.some(record => record.meta.requestAuth)) {
    if (!store.state.user) {
      // 跳转到登录页面
      store.commit('setUser', null)
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
