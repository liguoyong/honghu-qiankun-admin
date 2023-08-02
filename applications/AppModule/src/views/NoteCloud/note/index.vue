<template>
    <div class="layout-wrapper">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="标题">
                <el-input v-model="formInline.user" placeholder="请输入标题" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="id" />
            <el-table-column prop="title" label="标题" />
            <el-table-column label="创建时间">
                <template #default="scope">{{ transformTimeDate(scope.row.createTime) }}</template>
            </el-table-column>
        </el-table>
        <div class="common-pagination">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[100, 200, 300, 400]" :small="small" :disabled="disabled" :background="background"
                layout="->,total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import moment from "moment"
import { getNotesList } from '@/api/note'
const formInline = reactive({
    user: '',
    region: '',
    date: '',
})
const currentPage = ref(4)
const pageSize = ref(100)
const background = ref(false)
const disabled = ref(false)
const small = ref(false)
const onSubmit = () => {
    console.log('submit!')
}
const tableData = ref([])
const getList = async () => {
    const response = await getNotesList({})
    tableData.value = response.data.list
    // return response.data
}
getList()
const transformTimeDate = (date: string) => {
    return date
}
console.log(tableData, 'tableData');

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
</script>

<style>
.layout-wrapper {
    padding: 20px;
}

.demo-form-inline .el-input {
    --el-input-width: 220px;
}
</style>