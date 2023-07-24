<template>
  <logo />
  <el-menu width="200px" class="el-menu-slider-container" :default-active="$route.path" background-color="#fff"
    text-color="031321" active-text-color="#1890ff" mode="vertical" router :collapse="isCollapse" @open="handleOpen"
    @close="handleClose">
    <sidebar-item v-for="item in routerData" :item="item" :key="item.path"></sidebar-item>
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
import _ from 'lodash';
console.log(routes, 'routes')
const { isCollapse } = storeToRefs(appStore)

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const getMenuList = function (data, basePath) {
  if (!data) { return [] }
  data = data.filter(item => !item.hidden) // 过滤隐藏的菜单
  data.map(item => {
    if (basePath) { // 拼接path
      item.path = `${basePath}${(item.path.indexOf('/') >= 0 || basePath === '/') ? '' : '/'}${item.path}`
    }
    if (item.children && item.children.length) { // 存在子级继续递归
      getMenuList(item.children, item.path)
    }
  })
  return data
}
const menuData = _.cloneDeep(routes)
const routerData = getMenuList(menuData)
console.log(routerData, 'routerData');
const menuItems = ref([
  {
    path: '/',
    name: 'home',
    redirect: { name: 'homePage' },
    meta: {
      title: "首页",
      icon: 'House',
    },
    children: [
      {
        path: "/home",
        name: "homePage",
        meta: {
          title: "首页",
        }
      }
    ],
  },
  {
    path: '/noteCloud',
    name: 'noteCloud',
    meta: {
      title: "云笔记",
      icon: "Management"
    },
    children: [{
      path: "/noteCloud/note",
      name: "noteCloud-note",
      meta: {
        title: "笔记",
      },
    }, {
      path: "/noteCloud/log",
      name: "noteCloud-log",
      meta: {
        title: "日志",
      },
    }]
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      title: "用户",
      icon: "User"
    },
    children: [{
      path: "/user/list",
      name: "operational-list",
      meta: {
        title: "用户列表",
      },
    }]
  },
  {
    path: '/operational',
    name: 'operational',
    meta: {
      title: "操作云",
      icon: "MostlyCloudy"
    },
    children: [{
      path: "/operational/cloud",
      name: "operational-cloud",
      meta: {
        title: "操作云中心",
      }
    },
    {
      path: "/operational/capability",
      name: "operational-capability",
      meta: {
        title: "赋能控制",
      }
    },
    {
      path: "/operational/designer",
      name: "operational-designer",
      meta: {
        title: "设计器控制",
      }
    },
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: "登录"
    }
  },
])
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
