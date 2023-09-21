<template>
  <div class="layout-wrapper">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content ep-bg-purple" />
      </el-col>
      <el-col :span="8">
        <div class="grid-content ep-bg-purple" />
      </el-col>
      <el-col :span="8">
        <div class="grid-content ep-bg-purple">
          <el-calendar v-model="value" />
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const value = ref(new Date());
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}</style>
