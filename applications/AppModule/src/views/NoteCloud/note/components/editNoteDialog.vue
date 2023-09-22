<template>
    <com-dialog width="60%" class="noteForm" v-model="props.dialog.show"
        :title="props.dialog.type === 'add' ? '新增笔记' : '编辑笔记'" destroy-on-close @confirm="handleSubmit">
        <com-form ref="formRef" v-model="props.dialog.form" :options="formOptions" :rules="rules" @submit="handleSubmit">
            <el-form-item class="content-item" label="内容" v-slot="content" prop="content">
                <!-- 此处注意写法v-model:content -->
                <div class="quill-container">
                    <QuillEditor ref="myQuillEditor2" theme="snow" :content="props.dialog.form.content"
                        :options="data.editorOption" contentType="html" @update:content="setValue()" />
                </div>
            </el-form-item>
        </com-form>
    </com-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw, watch, computed, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { FormOption } from '@/components/form/index'
import { QuillEditor } from '@vueup/vue-quill'
import { updateNote, createNote } from '@/api/note'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.core.css'
import 'highlight.js/styles/github.css' // 导入 highlight.js 的 CSS 样式
interface RuleForm {
    title: string,
    desc: string,
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
    { label: '标题', prop: 'title', required: true, props: { 'show-word-limit': true, 'maxlength': 50 } },
    { label: '描述', prop: 'desc', required: true, props: { 'show-word-limit': true, 'maxlength': 100 } },
    { label: '内容', prop: 'content', required: true, slot: 'content' },
])
const rules = reactive<FormRules<RuleForm>>({
    title: [
        { required: true, message: '请填写标题', trigger: 'blur' },
    ],
    desc: [
        { required: true, message: '请填写描述', trigger: 'blur' },
    ],
    content: [
        { required: true, message: '请填写内容', trigger: 'blur' },
    ],
})
const data = reactive({
    content: '',
    editorOption: {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'header': 1 }, { 'header': 2 }],
                ['image'],
                [{ 'direction': 'rtl' }],
                [{ 'color': [] }, { 'background': [] }]
            ]
        },
        placeholder: '请输入内容...'
    }
})
// 抛出更改内容，此处避免出错直接使用文档提供的getHTML方法
const setValue = () => {
    const text = toRaw(myQuillEditor2.value).getHTML()
}
onMounted(() => {
    myQuillEditor2.value && toRaw(myQuillEditor2.value).setHTML(props.dialog.form.content)
});
function handleSubmit() {
    const form = {
        ...props.dialog?.form
    }

    formRef.value?.validate(async (valid: Boolean, fields: string[]) => {
        if (valid) {
            let res
            if (props.dialog.type === 'add') {
                res = await createNote(form)
            } else {
                res = await updateNote(form)
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
<style lang="scss" scoped>
.quill-container {
    width: 100%;
    border-radius: 4px;

    ::v-deep(.ql-container) {
        min-height: 200px;

    }

    ::v-deep(.ql-toolbar.ql-snow) {
        border-radius: 4px 4px 0 0;
    }

    ::v-deep(.ql-toolbar.ql-snow+.ql-container.ql-snow) {
        border-radius: 0 0 4px 4px;
    }
}
</style>