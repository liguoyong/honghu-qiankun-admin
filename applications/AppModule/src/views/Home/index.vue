<template>
  <div class="layout-wrapper">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
        <el-card class="box-card mb-4">
          <template #header>
            <div class="card-header flex justify-between items-center">
              <span>重要事项</span>
              <el-icon>
                <Operation />
              </el-icon>
            </div>
          </template>
          <div class="text item">
            11111111
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
        <el-card class="box-card mb-4">
          <template #header>
            <div class="card-header flex justify-between items-center">
              <span>每日任务</span>
              <el-icon>
                <Operation />
              </el-icon>
            </div>
          </template>
          <div class="text item">
            11111111
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
        <el-card class="box-card mb-4">
          <template #header>
            <div class="card-header flex justify-between items-center">
              <span>待办事项</span>
              <el-icon>
                <Operation />
              </el-icon>
            </div>
          </template>
          <div class="text item">
            11111111
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
        <el-card class="box-card mb-4">
          <template #header>
            <div class="card-header flex justify-between items-center">
              <span>每日账单</span>
              <el-icon>
                <Operation />
              </el-icon>
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
