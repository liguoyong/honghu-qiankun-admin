<template>
  <logo />
  <el-menu :default-active="$route.path" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
    mode="vertical" router :collapse="isCollapse" @open="handleOpen" @close="handleClose">
    <SidebarItem :menu="routes" />
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

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
