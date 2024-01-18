<template>
    <com-dialog width="60%" class="noteForm" v-model="props.dialog.show"
        :title="props.dialog.type === 'add' ? '新增计划' : '编辑计划'" destroy-on-close @confirm="handleSubmit">
        <com-form ref="formRef" v-model="props.dialog.form" :options="formOptions" :rules="rules" @submit="handleSubmit"
            label-width="80px">
            <el-form-item class="content-item" label="日期" v-slot="date" prop="date">
                <el-date-picker v-model="props.dialog.form.date" type="datetime" placeholder="请选择日期"
                    value-format="YYYY-MM-DD hh:mm:ss" />
            </el-form-item>
            <el-form-item class="content-item" label="内容" v-slot="content" prop="content">
                <com-quill-editor v-model:content="props.dialog.form.content" />
            </el-form-item>
        </com-form>
    </com-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw, watch, computed, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { FormOption } from '@/components/form/index'
import { updatePlan, createPlan } from '@/api/plan'
import { uploadFile } from '@/api/upload'
interface RuleForm {
    title: string,
    desc: string,
    date: string,
    content: string
}
const emits = defineEmits(['close'])
const props = defineProps({
    dialog: {
        type: Object,
        default() {
            return {
                show: false,
                type: 'add',
                form: { content: '' }
            }
        }
    }
})
const formRef = ref()
const myQuillEditor2 = ref()
const formOptions = computed<FormOption[]>(() => [
    { label: '标题', prop: 'title', required: true },
    { label: '日期', prop: 'date', required: true, slot: 'date' },
    { label: '描述', prop: 'desc', required: true },
    { label: '内容', prop: 'content', required: true, slot: 'content' }
])
const rules = reactive<FormRules<RuleForm>>({
    title: [
        { required: true, message: '请填写标题', trigger: 'blur' },
    ],
    date: [{ required: true, message: '请选择日期', trigger: 'change blur' }],
    desc: [
        { required: true, message: '请填写描述', trigger: 'blur' },
    ],
    content: [
        { required: true, message: '请填写内容', trigger: 'blur' },
    ],
})

function handleSubmit() {
    const form = {
        ...props.dialog?.form
    }

    formRef.value?.validate(async (valid: Boolean, fields: string[]) => {
        if (valid) {
            let res
            if (props.dialog.type === 'add') {
                res = await createPlan(form)
            } else {
                res = await updatePlan(form)
            }
            if (res.code === 200) {
                ElMessage.success(props.dialog.type === 'add' ? '新增成功' : '更新成功')
                emits('close', 1)
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>