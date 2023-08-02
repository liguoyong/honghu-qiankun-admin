import { defineStore } from 'pinia'

// 第一个参数是应用程序中 store 的唯一 id
export const useUsersStore = defineStore('users', {
  // 其它配置项
  state: () => {
    return {
      username: "",
      password: '',
      roles: '',
      avatar: '',
      userId: "",
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
    },
  }
})
