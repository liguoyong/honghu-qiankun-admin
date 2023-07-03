<template>
  <!-- collapse 折叠 ； expand 展开 -->
  <div class="sidebar-logo-container" :class="{ 'collapse': isCollapse, 'expand': !isCollapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="isCollapse" key="collapse" to="/">
        <div class="sidebar-logo-link">
          <svg-icon name="logo" icon-class="logo" class="sidebar-logo"></svg-icon>
        </div>
      </router-link>
      <!--展开 -->
      <router-link v-else key="expand" to="/">
        <div class="sidebar-logo-link">
          <svg-icon name="logo" icon-class="logo" class="sidebar-logo"></svg-icon>
          <h1 class="sidebar-title">{{ title }} </h1>
        </div>
      </router-link>
    </transition>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';

import { useAppStore } from "@/store/app.js"

const appStore = useAppStore()

const { isCollapse } = storeToRefs(appStore)

const name = 'logo'

const logo = 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'

const title = '鸿鹄云平台'
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  height: 64px;

  &.expand {
    .sidebar-logo-link {
      margin-left: 30px;
    }
  }

  .sidebar-logo-link {
    vertical-align: middle;
    display: flex;
    height: 100%;
    align-items: center;

    .sidebar-logo {
      width: 36px;
      height: 36px;
      vertical-align: middle;
      margin-right: 12px;
    }

    .sidebar-title {
      display: inline-block;
      margin: 0;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #fff;
      font-weight: 600;
      line-height: 64px;
      vertical-align: middle;
    }
  }

}
</style>
