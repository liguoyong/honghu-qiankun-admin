<template>
    <div class="layout-wrapper">
        <el-form :inline="true" :model="ruleForm" ref="noteFormRef" class="filter-container">
            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title" placeholder="请输入标题" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button @click="resetForm(noteFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="btns-container">
            <el-button type="primary" @click="handelCreateNote">
                <el-icon color="#fff" style="margin-right: 8px;">
                    <Plus />
                </el-icon>新增笔记
            </el-button>
        </div>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="id" />
            <el-table-column prop="title" label="标题" />
            <el-table-column label="创建时间">
                <template #default="scope">{{ transformTimeDate(scope.row.createTime) }}</template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleClickEdit(scope.row.id)">编辑</el-button>
                    <el-button link type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
            <template #empty>
                <data-empty></data-empty>
            </template>
        </el-table>
        <div class="common-pagination">
            <el-pagination :current-page="pageParams.currentPage" :page-size="pageParams.pageSize"
                :page-sizes="[10, 20, 50, 100]" :small="small" layout="->,total, sizes, prev, pager, next, jumper"
                :total="pageParams.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
        <createNoteForm :dialogFormVisible="dialogFormVisible" @close="handelCloseDialogForm" />
        <updateNoteDialog :dialog="updateDialog" @close="handelCloseEditDialog" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { reactive } from 'vue'

import { getNotesList, updateNote, getNoteDetail } from '@/api/note'
import type { FormInstance, FormRules } from 'element-plus'
import createNoteForm from './components/createNoteForm.vue'
import updateNoteDialog from './components/updateNoteDialog.vue'
const ruleForm = reactive({
    title: ''
})
interface RuleForm {
    title: string,
    desc: string,
    content: string
}
const pageParams = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 50
})
const updateDialog = reactive({
    show: false,
    type: 'update',
    form: {}
})
const dialogFormVisible = ref(false)
const small = ref(false)
const noteFormRef = ref<FormInstance>()
const onSearch = () => {
    console.log('submit!')
    getList()
}
const tableData = ref([])
const getList = async () => {
    const response = await getNotesList({})
    if (response.code == 200) {
        const { list = [], total } = response.data
        tableData.value = response.data.list
        pageParams.total = total
    }
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

const handleClickEdit = async (id: number) => {
    const { code, data = {} } = await getNoteDetail({ id: id })
    if (code == 200) {
        updateDialog.type = 'edit'
        updateDialog.form = data
        updateDialog.show = true
    }
    // dialogFormVisible.value = true
}

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
const handelCreateNote = () => {
    dialogFormVisible.value = true
}
const handelCloseDialogForm = (key: number | undefined) => {
    dialogFormVisible.value = false
    if (key == 1) {
        getList()
    }
}
const handelCloseEditDialog = (key: number | undefined) => {
    updateDialog.show = false
    if (key == 1) {
        getList()
    }
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