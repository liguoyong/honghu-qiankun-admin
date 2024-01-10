<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'" :class="{ 'isCollapse': isCollapse, 'expand': !isCollapse }">
        <component :is="sidebar"></component>
      </el-aside>
      <el-main class="common-layout-container" :class="{ 'isCollapse': isCollapse, 'expand': !isCollapse }">
        <el-header>
          <div class="common-header-left">
            <svg-icon name="hamburger" class="el-icon hamburger-icon" :class="{ 'isCollapse': isCollapse }"
              @click="handleChangeCollapse(isCollapse)"></svg-icon>
            <breadcrumb />
          </div>
          <div class="common-right-menu">
            <el-dropdown trigger="hover">
              <div class="flex">
                <img class="avatar-icon" v-if="userStore.avatar" :src="userStore.avatar" alt="" srcset="" />
                <el-icon v-else>
                  <Avatar />
                </el-icon>
                <span class="user-name">{{ userStore.username }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu class="logout">
                  <el-dropdown-item @click="logout">
                    <svg-icon name="logout_active"></svg-icon>退出系统
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
<script lang="ts" setup>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import sidebar from './components/Sidebar/index.vue'
import breadcrumb from './components/Breadcrumb.vue'
import { useAppStore } from "@/store/app.js"
import { useUsersStore } from "@/store/user.js"
import { removeToken } from "@/utils/auth"
const userStore = useUsersStore()
const appStore = useAppStore()
const router = useRouter()
const route = useRoute()
const { isCollapse } = storeToRefs(appStore)

const handleChangeCollapse = function (collapse: boolean) {
  console.log(collapse, 'collapse');
  appStore.isCollapse = !collapse
}
const logout = () => {
  removeToken()
  let path = route.path
  router.push({ path: '/login', query: { redirect: path } })
}
</script>
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
    // background: var(--el-color-primary);
    background: linear-gradient(90deg, #387FF7 0%, #1890FF 99%);
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
      cursor: pointer;

      &.isCollapse {
        transform: rotate(180deg);
      }
    }

    .common-header-left {
      display: flex;

      .hamburger-icon {
        margin-right: 16px;
      }

      .el-breadcrumb {
        line-height: 20px;
      }
    }

    .common-right-menu {
      height: 100%;
      display: flex;
      align-items: center;
      margin-right: 30px;

      .avatar-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }

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
    background: #f5f7fa;

    .app-container-view {
      height: 100%;
      background: #ffffff;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
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
