import { defineStore } from 'pinia'
import { getUserInfo } from '../api/user'

// 第一个参数是应用程序中 store 的唯一 id
export const useUsersStore = defineStore('users', {
  // 其它配置项
  state: () => {
    return {
      username: '',
      password: '',
      roles: '',
      avatar: '',
      userId: '',
      phone: '',
      email: ''
    }
  },
  getters: {

  },
  actions: {
    async SET_USER_INFO(data) {
      this.username = data.username
      this.roles = data.roles
      this.avatar = data.avatar
      this.userId = data.userId
      this.phone = data.phone
    },
    async GET_USER_INFO() {
      const userInfo = await getUserInfo()
      this.SET_USER_INFO(userInfo.data)
    }
  }
})
