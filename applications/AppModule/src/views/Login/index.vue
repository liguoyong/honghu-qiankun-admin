<template>
  <div class="login-container">
    <div class="login-background">
      <div class="welcome-main">
        <p>Welcome!</p>
        <h6>鸿鹄云平台</h6>
      </div>
      <div class="login-main">
        <div class="login-title">登录</div>
        <el-form :label-position="labelPosition" ref="loginFormFormRef" :rules="rules" :model="loginForm"
          style="max-width: 460px">
          <el-form-item prop="userName">
            <el-input v-model="loginForm.userName" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(loginFormFormRef)"
              :disabled="!loginForm.userName || !loginForm.password">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
interface RuleForm {
  userName: string
  password: string
}
import { setToken } from "@/utils/auth";
import { useUsersStore } from "@/store/user.js"
import { getLogin, getUserInfo } from "@/api/user"

const userStore = useUsersStore()
const router = useRouter()
const route = useRoute()
const labelPosition = ref('left')
const { userName } = storeToRefs(userStore)
const loginForm = reactive({
  userName: 'admin',
  password: '123456'
})
const loginFormFormRef = ref<FormInstance>()
const rules = reactive<FormRules<RuleForm>>({
  userName: [
    { required: true, message: '请输入账号名称', trigger: 'blur' },
    { min: 1, max: 15, message: '长度1~15个字符', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    }
  ]
})
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid: Boolean, fields: string[]) => {
    if (valid) {
      getLogin({ username: loginForm.userName, password: loginForm.password }).then(async res => {
        const { code, data } = res
        if (code === 200) {
          userStore.username = loginForm.userName
          userStore.password = loginForm.password
          setToken(data)
          const userInfo = await getUserInfo({})
          userStore.SET_USER_INFO(userInfo.data)
          if (router.currentRoute.value.query.redirect) {
            router.push(router.currentRoute.value.query.redirect + '')
          } else {
            router.push({ 'name': 'home' })
          }
        } else {
          ElMessage.error(res.msg || '')
        }
      })
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style lang="scss" scoped>
.login-container {
  margin: 0;
  background: url('@/assets/images/login.png') no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  height: 100vh;
  position: relative;
  overflow: hidden;

  .login-background {
    height: 100%;
    width: 100%;
    background: url('@/assets/images/loginbg.svg') no-repeat;
    background-position: 0 100%;

    .welcome-main {
      position: absolute;
      left: 50px;
      top: 50px;

      p {
        color: #fff;
        font-size: 60px;
        font-weight: 700;
        margin: 0;
      }

      h6 {
        font-family: PingFangSC-Regular;
        margin: 15px 0 0 0;
        color: #fff;
        font-size: 28px;
        font-weight: 400;
      }
    }

    .login-main {
      border-radius: 20px;
      position: absolute;
      right: 60px;
      width: 490px;
      height: 540px;
      background-color: #fff;
      padding: 0 40px;
      padding-top: 68px;
      top: 50%;
      transform: translateY(-50%);

      .login-title {
        margin: 0 0 20px 0;
        font-size: 22px;
        font-weight: 700;
        line-height: 36px;
        text-align: center;
      }

      .el-button {
        width: 100%;
      }
    }
  }

}
</style>
