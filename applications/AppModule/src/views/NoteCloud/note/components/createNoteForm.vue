<template>
  <el-dialog v-model="props.dialogFormVisible" :before-close="handleClose" :close-on-click-modal="false" title="创建笔记"
    width="76%" align-center>
    <el-form :model="form" :rules="rules" ref="noteFormRef">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item class="content-item" label="内容" prop="content">
        <!-- 此处注意写法v-model:content -->
        <div class="quill-container">
          <QuillEditor ref="myQuillEditor" theme="snow" v-model:content="form.content" :options="data.editorOption"
            contentType="html" @update:content="setValue()" />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handelCreateNote(noteFormRef)">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref, toRaw, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { createNote } from '@/api/note'
interface RuleForm {
  title: string,
  desc: string,
  content: string
}
const emits = defineEmits(['close'])
const props = defineProps({
  dialogFormVisible: {
    type: Boolean,
    default() {
      return false
    }
  },
  value: {
    type: String,
    default() {
      return ''
    }
  }
})
const myQuillEditor = ref()
// 通过watch监听回显，笔者这边使用v-model:content 不能正常回显
watch(() => props.value, (val) => {
  toRaw(myQuillEditor.value).setHTML(val)
}, { deep: true })
const formLabelWidth = '140px'
const noteFormRef = ref<FormInstance>()
const form = reactive({
  title: '',
  desc: '',
  content: ''
})
const data = reactive({
  content: '',
  editorOption: {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
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
// 抛出更改内容，此处避免出错直接使用文档提供的getHTML方法
const setValue = () => {
  const text = toRaw(myQuillEditor.value).getHTML()
}
const handleClose = () => {
  console.log('guanbi');

  emits('close')
}
const handelCreateNote = async (formEl: FormInstance | undefined) => {
  console.log(form, 'submit!')
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      createNote(form).then(res => {
        console.log(res, 'ressssssssssssssss');
        emits('close', 1)
      })
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style lang="scss" scoped>
.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.quill-container {
  ::v-deep {
    .ql-container {
      min-height: 200px;
    }
  }
}
</style>