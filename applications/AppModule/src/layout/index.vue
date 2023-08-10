<script lang="ts" setup>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import sidebar from './components/Sidebar/index.vue'
import { useAppStore } from "@/store/app.js"
import { useUsersStore } from "@/store/user.js"
const userStore = useUsersStore()
const appStore = useAppStore()
const router = useRouter()
const route = useRoute()
const { isCollapse } = storeToRefs(appStore)

const handleChangeCollapse = function (collapse) {
  appStore.isCollapse = collapse
}
const logout = () => {
  console.log(route.path, 'path');
  let path = route.path
  router.push({ path: '/login', query: { redirect: path } })
}
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'" :class="{ 'collapse': isCollapse, 'expand': !isCollapse }">
        <component :is="sidebar"></component>
      </el-aside>
      <el-main class="common-layout-container" :class="{ 'collapse': isCollapse, 'expand': !isCollapse }">
        <el-header>
          <el-icon class="collapseIcon" v-if="isCollapse" @click="handleChangeCollapse(false)">
            <Expand />
          </el-icon>
          <el-icon class="expandIcon" v-else @click="handleChangeCollapse(true)">
            <Fold />
          </el-icon>
          <div class="common-right-menu">
            <el-dropdown trigger="hover">
              <span>
                <el-icon>
                  <Avatar />
                </el-icon>
                <span class="user-name">{{ userStore.username }}</span>
              </span>
              <template #dropdown>
                <el-dropdown-menu class="logout">
                  <el-dropdown-item @click="logout">
                    退出系统
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <div class="app-container">
          <div class="app-container-view">
            <el-scrollbar>
              <transition name="el-fade-in">
                <router-view></router-view>
              </transition>
            </el-scrollbar>
          </div>
        </div>

      </el-main>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
.common-layout {
  width: 100%;
  height: 100vh;
  font-size: 14px;

  .common-layout-container {
    transition: all 0.3s;
    flex: 1;
  }

  .el-main {
    padding: 0;
    background-color: #f5f7fa;
  }

  // header
  .el-header {
    background: var(--el-color-primary);
    height: 64px;
    display: flex;
    vertical-align: middle;
    align-items: center;
    padding: 0;
    display: flex;
    justify-content: space-between;

    .el-icon {
      color: #fff;
      font-size: 20px;
      margin-left: 20px;
    }

    .common-right-menu {
      height: 100%;
      display: flex;
      align-items: center;
      margin-right: 30px;

      span.user-name {
        margin-left: 6px;
        color: #fff;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
      }
    }
  }

  .app-container {
    height: calc(100vh - 64px);
    padding: 18px 20px;
    background: #efefef;

    .app-container-view {
      height: 100%;
      background: #ffffff;
    }
  }

  .el-aside {
    height: 100vh;
    background: #fff;
    transition: all 0.3s;
    overflow: hidden;
  }
}
</style>
