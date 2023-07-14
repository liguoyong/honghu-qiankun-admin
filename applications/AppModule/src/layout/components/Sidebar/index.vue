<template>
  <logo />
  <el-menu width="200px" class="el-menu-slider-container" :default-active="$route.path" background-color="#fff" text-color="031321"
    active-text-color="#1890ff" mode="vertical" router :collapse="isCollapse" @open="handleOpen" @close="handleClose">
    <sidebar-item :menu="routes" />
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import SidebarItem from './SidebarItem.vue'
import Logo from './Logo.vue'
import { routes } from '@/router/index.js'
import { useAppStore } from "@/store/app.js"
const appStore = useAppStore()

const { isCollapse } = storeToRefs(appStore)

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const logo = 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'

</script>

<style lang="scss">
.el-menu-slider-container {
  height: calc(100vh - 64px);
  overflow: hidden;

  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-icon:not(.el-sub-menu__icon-arrow) {
    color: var(--el-color-primary)
  }
}
</style>
