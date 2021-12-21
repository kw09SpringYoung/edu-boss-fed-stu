<template>
  <div class="aside">
    <el-button class="collapseBtn el-icon-s-operation" round @click="isCollapse = isCollapse ? false: true"></el-button>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse = 'isCollapse'
      default-active="4"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-lock"></i>
          <span slot="title">权限管理</span>
        </template>
        <el-menu-item index="/role">
          <i class="el-icon-setting"></i>
          <span slot="title">角色管理</span>
        </el-menu-item>
        <el-menu-item index="/menu">
          <i class="el-icon-setting"></i>
          <span slot="title">菜单管理</span>
        </el-menu-item>
        <el-menu-item index="/resource">
          <i class="el-icon-setting"></i>
          <span slot="title">资源管理</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/course">
        <i class="el-icon-film"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">广告管理</span>
        </template>
        <el-menu-item index="/advert">
          <i class="el-icon-setting"></i>
          <span slot="title">广告列表</span>
        </el-menu-item>
        <el-menu-item index="/advert-space">
          <i class="el-icon-setting"></i>
          <span slot="title">广告位列表</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AppAside',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key: string, keyPath: string): void {
      console.log(key, keyPath)
    },
    handleClose (key: string, keyPath: string): void {
      console.log(key, keyPath)
    }
  }
})
</script>
<style lang="scss" scoped>
$height: 100%;
.aside {
  height: 100%;
  .el-menu {
    height: 100vh;
    height: 100%;
  }
}
.aside{
  position: relative;
}
.collapseBtn{
  position:absolute;
  top: 200px;
  top: 315px;
  z-index: 1;
  right: -18px;
}
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
