<script lang="ts" setup>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia';
import sidebar from './components/Sidebar/index.vue'
import { useAppStore } from "@/store/app.js"
const appStore = useAppStore()

const { isCollapse } = storeToRefs(appStore)
console.log(isCollapse, appStore, 'isCollapse');

const handleChangeCollapse = function(collapse) {
  appStore.isCollapse = collapse
}
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" :class="{ 'collapse': isCollapse, 'expand': !isCollapse }">
        <component :is="sidebar"></component>
      </el-aside>
      <el-main class="common-layout-container" :class="{ 'collapse': isCollapse, 'expand': !isCollapse }">
        <el-header>
          <div v-if="isCollapse">
            <el-icon  @click="handleChangeCollapse(false)"><Expand /></el-icon>
          </div>
          <div v-else>
            <el-icon @click="handleChangeCollapse(true)"><Fold /></el-icon>
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

  .common-layout-container {
    width: calc(100vw - 200px);

    &.collapse {
      width: calc(100vw - 54px);
    }

    &.expand {
      width: calc(100vw - 200px);
    }
  }

  .el-main {
    padding: 0;
  }

  // header
  .el-header {
    background: #1890ff;
    height: 64px;
  }

  .el-aside {
    height: 100vh;
    background: #1890ff;

    &.collapse {
      width: 54px;
    }

    &.expand {
      width: 200px;
    }
  }
}
</style>
