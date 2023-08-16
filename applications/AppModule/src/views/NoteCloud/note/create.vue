<template>
  <div class="layout-wrapper">
    <div class="note-container">
      <el-page-header>
        <template #content>
          <span class="text-large font-600 mr-3"> 创建笔记 </span>
        </template>
      </el-page-header>
      <el-form class="note-from" :model="form" label-width="120px" :rules="rules" ref="noteFormRef"
        :hide-required-asterisk="true">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item class="content-item" label="内容" prop="content">
          <!-- 此处注意写法v-model:content -->
          <div>
            <QuillEditor ref="myQuillEditor" theme="snow" v-model:content="form.content" :options="data.editorOption"
              contentType="html" @update:content="setValue()" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(noteFormRef)">创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <!-- 使用自定义图片上传 -->
      <input type="file" hidden accept=".jpg,.png" ref="fileBtn" @change="handleUpload" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { reactive, onMounted, ref, toRaw, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { createNote } from '@/api/note'

interface RuleForm {
  title: string,
  desc: string,
  content: string
}
const props = defineProps(['value'])
const emit = defineEmits(['updateValue'])
const content = ref('')
const myQuillEditor = ref()
// 通过watch监听回显，笔者这边使用v-model:content 不能正常回显
watch(() => props.value, (val) => {
  toRaw(myQuillEditor.value).setHTML(val)
}, { deep: true })
const fileBtn = ref()
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
const noteFormRef = ref<FormInstance>()
const form = reactive({
  title: '',
  desc: '',
  content: ''
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

const imgHandler = (state) => {
  if (state) {
    fileBtn.value.click()
  }
}
// 抛出更改内容，此处避免出错直接使用文档提供的getHTML方法
const setValue = () => {
  const text = toRaw(myQuillEditor.value).getHTML()
}
const handleUpload = (e) => {
  const files = Array.prototype.slice.call(e.target.files)
  // console.log(files, "files")
  if (!files) {
    return
  }
  const formdata = new FormData()
  formdata.append('file', files[0])
  backsite.uploadFile(formdata)  // 此处使用服务端提供上传接口
    .then(res => {
      if (res.data.url) {
        const quill = toRaw(myQuillEditor.value).getQuill()
        const length = quill.getSelection().index
        quill.insertEmbed(length, 'image', res.data.url)
        quill.setSelection(length + 1)
      }
    })
}
const onSubmit = async (formEl: FormInstance | undefined) => {
  console.log(form, 'submit!')
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      createNote(form).then(res => {
        console.log(res, 'ressssssssssssssss');
      })
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 初始化编辑器
onMounted(() => {
  const quill = toRaw(myQuillEditor.value).getQuill()
  if (myQuillEditor.value) {
    quill.getModule('toolbar').addHandler('image', imgHandler)
  }
})
</script>
<style scoped lang="scss">
.layout-wrapper {
  padding: 20px;

  .note-from {
    margin-top: 18px;

    .content-item {
      ::v-deep(.el-form-item__content)  {
        display: block;
      }

    }
  }
}

// 调整样式
:deep(.ql-editor) {
  min-height: 180px;
}

:deep(.ql-formats) {
  height: 21px;
  line-height: 21px;
}
</style>


