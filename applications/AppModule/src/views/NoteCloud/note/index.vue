<template>
    <div class="layout-wrapper">
        <el-form :inline="true" :model="ruleForm" ref="noteFormRef" class="filter-container">
            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title" placeholder="请输入标题" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="resetForm(noteFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="id" />
            <el-table-column prop="title" label="标题" />
            <el-table-column label="创建时间">
                <template #default="scope">{{ transformTimeDate(scope.row.createTime) }}</template>
            </el-table-column>
            <template #empty>
                <data-empty></data-empty>
            </template>
        </el-table>
        <div class="common-pagination">
            <el-pagination :current-page="pageParamas.currentPage" :page-size="pageParamas.pageSize"
                :page-sizes="[10, 20, 50, 100]" :small="small" background
                layout="->,total, sizes, prev, pager, next, jumper" :total="pageParamas.total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { getNotesList } from '@/api/note'
import type { FormInstance, FormRules } from 'element-plus'
const ruleForm = reactive({
    title: ''
})
const pageParamas = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 50
})

const small = ref(false)
const noteFormRef = ref<FormInstance>()
const onSubmit = () => {
    console.log('submit!')
}
const tableData = ref([])
// const tableData = ref([{
//     id: 123,
//     title: '测试备注',
//     createTime: '2023-11-11 12:00:00'
// }, {
//     id: 124,
//     title: '测试备注2',
//     createTime: '2023-11-11 12:00:00'
// }, {
//     id: 125,
//     title: '测试备注2',
//     createTime: '2023-11-11 12:00:00'
// }])
const getList = () => {
    // const response = await getNotesList({})
    // tableData.value = response.data.list
}
getList()
const transformTimeDate = (date: string) => {
    return date
}
console.log(tableData, 'tableData');

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
</script>

<style>
.layout-wrapper {
    padding: 24px;
}

.demo-form-inline .el-input {
    --el-input-width: 220px;
}
</style>