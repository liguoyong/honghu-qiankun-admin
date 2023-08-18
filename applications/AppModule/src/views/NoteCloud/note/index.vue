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
                    <el-button link type="danger" size="small" @click="handleClickDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
            <template #empty>
                <data-empty></data-empty>
            </template>
        </el-table>
        <div class="common-pagination">
            <el-pagination :current-page="pageParams.page" :page-size="pageParams.size" :page-sizes="[10, 20, 50, 100]"
                :small="small" layout="->,total, sizes, prev, pager, next, jumper" :total="pageParams.total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
        <editNoteDialog :dialog="updateDialog" @close="handelCloseEditDialog" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { reactive } from 'vue'

import { getNotesList, getDeleteNote, getNoteDetail } from '@/api/note'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import editNoteDialog from './components/editNoteDialog.vue'
const ruleForm = reactive({
    title: ''
})
interface RuleForm {
    title: string,
    desc: string,
    content: string
}
const pageParams = reactive({
    page: 1,
    size: 10,
    total: 0
})
const updateDialog = reactive({
    show: false,
    type: 'update',
    form: {}
})
const small = ref(false)
const noteFormRef = ref<FormInstance>()
const onSearch = () => {
    console.log('submit!')
    getList()
}
const tableData = ref([])
const getList = async () => {
    const response = await getNotesList({ ...ruleForm, ...pageParams })
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
    pageParams.size = val
    getList()
}

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    pageParams.page = val
    getList()
}

const handleClickEdit = async (id: number) => {
    const { code, data = {} } = await getNoteDetail({ id: id })
    if (code == 200) {
        updateDialog.type = 'edit'
        updateDialog.form = data
        updateDialog.show = true
    }
}

const handelCreateNote = () => {
    updateDialog.type = 'add'
    updateDialog.form = {}
    updateDialog.show = true
}
const handleClickDelete = async (id: number) => {
    
    ElMessageBox.confirm(
        '确认删除该笔记?',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            await getDeleteNote({ id })
            getList()
            ElMessage({
                type: 'success',
                message: '删除完成',
            })
        })
        .catch(() => {
            // ElMessage({
            //     type: 'info',
            //     message: 'Delete canceled',
            // })
        })
    
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