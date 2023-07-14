<script lang="ts" setup>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia';
import sidebar from './components/Sidebar/index.vue'
import { useAppStore } from "@/store/app.js"

const appStore = useAppStore()

const userName = '你大爷'

const { isCollapse } = storeToRefs(appStore)
console.log(isCollapse, appStore, 'isCollapse');

const handleChangeCollapse = function (collapse) {
  appStore.isCollapse = collapse
}
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse?'64px': '200px'" :class="{ 'collapse': isCollapse, 'expand': !isCollapse }">
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
            <el-icon>
              <Avatar />
            </el-icon>
            <span>{{ userName }}</span>
          </div>
        </el-header>
        <router-view></router-view>
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
    }
    .common-right-menu {
      height: 100%;
      display: flex;
      align-items: center;
      margin-right: 30px;
      span {
        margin-left: 6px;
        color: #fff;
      }
    }
  }

  .el-aside {
    height: 100vh;
    background: #fff;
    transition: all 0.3s;
    overflow-x: hidden;
  }
}
</style>
