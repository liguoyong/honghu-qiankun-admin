<template>
    <el-form class="information-container" :model="userForm" :rules="rules" ref="userFromRef"
        :label-position="labelPosition" size="small" label-width="100px">
        <el-form-item label="用户头像" prop="avatar">
            <el-upload class="avatar-uploader" action="/api/uploadFile" :show-file-list="false"
                :http-request="sendUploadRequest" :before-upload="beforeAvatarUpload">
                <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item label="用户昵称" prop="username">
            <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
            <el-input v-model="userForm.phone" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit(userFromRef)">保存</el-button>
            <el-button>取消</el-button>
        </el-form-item>

        <el-dialog v-model="centerDialogVisible" title="图片裁切" width="900" center>
            <div class="cropper-body-container">
                <div class="cropper-container">
                    <vueCropper ref="cropperRef" :img="option.img" :outputSize="option.size" :outputType="option.outputType"
                        :autoCropWidth="200" :autoCropHeight="200" :fixedBox="true" :autoCrop="true" :centerBox="true"
                        @real-time="realTime">
                    </vueCropper>
                </div>
                <div class="cropper-btn-container">
                    <div>
                        <div>
                            <el-button type="primary" @click="cropImage()">裁切</el-button>
                        </div>
                        <div style="margin-top: 12px;">
                            <el-button type="primary" @click="">取消</el-button>
                        </div>
                    </div>
                </div>
                <div class="preview-container">
                    <img class="previewUrl" v-if="previewUrl" :src="previewUrl" alt="" srcset="">
                    <el-image v-else>
                        <template #error>
                            <div class="image-slot">
                                <el-icon><icon-picture /></el-icon>
                            </div>
                        </template>
                    </el-image>

                </div>
            </div>
        </el-dialog>
    </el-form>
</template>
  
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, FormRules, FormInstance } from 'element-plus'
import 'vue-cropper/dist/index.css'
import { VueCropper } from "vue-cropper";
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { updateUserInfo } from '@/api/user'
import { uploadFile } from '@/api/upload'
import { useUsersStore } from '@/store/user'
const userStore = useUsersStore()
const { username, phone, avatar, userId } = userStore
const labelPosition = ref('right')
const userFromRef = ref<FormInstance>()
const cropperRef = ref<VueCropper | null>(null);
const centerDialogVisible = ref(false)

const userForm = reactive({
    username,
    phone,
    avatar,
    userId
})
const option = reactive({
    img: avatar,
    size: '',
    outputType: ''
})

const previewUrl = ref('')
const previewBlob = ref()
let previewFile: string | Blob
let previewFileName = ''
let timer: number | null | undefined = null
interface RuleForm {
    avatar: string,
    username: string,
    phone: string,
    userId: string
}
const rules = reactive<FormRules<RuleForm>>({
    avatar: [
        { required: false, message: '请上传头像', trigger: 'blur' },
    ],
    username: [
        { required: true, message: '请填写用户名', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请填写联系方式', trigger: 'blur' },
    ],
})

const onSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid: Boolean, fields: string[]) => {
        if (valid) {
            console.log('修改用户信息');
            updateUserInfo(userForm).then(async (res: { code: number }) => {
                if (res.code === 200) {
                    ElMessage.success('修改成功')
                    await userStore.GET_USER_INFO()
                }
            })
        } else {

        }
    })

}

const sendUploadRequest = (data: { file: Blob | MediaSource }) => {
    centerDialogVisible.value = true
    previewFileName = data.file.name
    option.img = URL.createObjectURL(data.file)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: Blob | MediaSource) => {
    console.log(rawFile, 'rawFile')
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(rawFile.type)) {
        ElMessage.error('Avatar picture must be image format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }

    return true
}
onMounted(() => {
    cropperRef.value?.ready();
});



// 裁切
const cropImage = () => {
    const fData = new FormData()
    fData.append('file', previewFile)
    uploadFile(fData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then((res: any) => {
        console.log(res);
        if (res.code === 200) {
            const { url } = res.data
            userForm.avatar = url
            ElMessage.success('裁切成功')
            centerDialogVisible.value = false
        }
    })
}
const blobToFile = (blob: any, fileName: string) => {
    // 通过 Blob 对象创建一个新的 File 对象
    const file = new File([blob], fileName);
    return file;
}
const realTime = () => {
    console.log(cropperRef.value, 'cropperRef.value');
    clearTimeout(timer)
    timer = setTimeout(() => {
        if (cropperRef.value) {
            cropperRef.value.getCropBlob((data: Blob | MediaSource | null) => {
                previewUrl.value = window.URL.createObjectURL(data);
                previewBlob.value = data
                previewFile = blobToFile(data, previewFileName)
                console.log(previewUrl, previewBlob, previewFile, previewFileName);
            });
        }
    }, 600)

}


</script>
  
<style lang="scss" scoped>
.information-container {
    max-width: 460px;
    margin: auto;
    margin-top: 50px;

    ::v-deep(.avatar-uploader) {
        .avatar {
            width: 128px;
            height: 128px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 128px;
            height: 128px;
            text-align: center;
        }
    }

    .cropper-body-container {
        display: flex;
        justify-content: space-between;

        .cropper-container {
            width: 400px;
            height: 400px;
        }

        .cropper-btn-container {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .preview-container {
            width: 300px;
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;

            .previewUrl {
                width: 200px;
                height: 200px;
            }

            .el-image {
                padding: 0 5px;
                max-width: 300px;
                max-height: 200px;
                width: 200px;
                height: 200px;
            }

            .image-slot {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                background: var(--el-fill-color-light);
                color: var(--el-text-color-secondary);
                font-size: 30px;
            }

            .image-slot .el-icon {
                font-size: 30px;
            }
        }
    }


}
</style>
