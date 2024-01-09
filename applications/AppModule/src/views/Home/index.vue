<template>
  <div class="layout-wrapper">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>重要事项</span>
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <div class="text item">
            11111111
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>每日任务</span>
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <div class="text item">
            11111111
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>待办事项</span>
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <div class="text item">
            11111111
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>每日账单</span>
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <div class="text item">
            11111111
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <!-- <div class="grid-content ep-bg-purple">
          <el-calendar v-model="value" />
        </div> -->
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
}
</style>
