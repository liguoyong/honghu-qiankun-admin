<template>
  <logo />
  <div class="el-menu-slider-container">
    <el-scrollbar>
      <el-menu v-model="activeMenu" :default-active="activeMenu" background-color="#fff" text-color="#031321"
        active-text-color="#1890ff" mode="vertical" router :collapse="isCollapse" @open="handleOpen" @close="handleClose">
        <sidebar-item v-for="item in routerData" :item="item" :key="item.path"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import SidebarItem from "./SidebarItem.vue";
import Logo from "./Logo.vue";
import { routes } from "@/router/index.js";
import { useRoute } from 'vue-router'
import { useAppStore } from "@/store/app.js";
const route = useRoute()

const appStore = useAppStore();
import _ from "lodash";
const { isCollapse } = storeToRefs(appStore);
const activeMenu = ref(route.meta.activeMenu || route.path)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
const getMenuList = function (data, basePath) {
  if (!data) {
    return [];
  }
  data = data.filter((item) => !item.hidden); // 过滤隐藏的菜单
  data = data.map((item) => {
    if (basePath) {
      // 拼接path
      item.path = `${basePath}${item.path.startsWith("/") || basePath === "/" ? "" : "/"
        }${item.path}`;
    }
    if (item.children && item.children.length > 1) {
      // 存在子级继续递归
      item.children = getMenuList(item.children, item.path);
    } else if (item.children && item.children.length == 1) {
      const { children = [{}] } = item
      const [{ path = '' }] = children
      if (item.path !== '/') {
        item.path = item.path + (!path.includes('/') ? '/' + path : '')
      }
      item.children = null
    }
    return item
  });
  return data;
};
const menuData = _.cloneDeep(routes);
const routerData = getMenuList(menuData);
const logo = "https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png";
watch(route, (newRoute, oldRoute) => {
  // 只在初始化时执行一次回调函数
  const activeMenuPath = newRoute.meta.activeMenu || ''
  activeMenuPath ? activeMenu.value = activeMenuPath : ''
})


</script>

<style lang="scss">
.el-menu-slider-container {
  height: calc(100vh - 64px);
  overflow: hidden;
  width: 200px;

  .el-menu {
    border-right: none;
  }

  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 200px;
  }

  .el-icon:not(.el-sub-menu__icon-arrow) {
    color: var(--el-color-primary);
  }

  .el-menu-item:hover {
    background-color: #eaf3ff;
  }
}
</style>
