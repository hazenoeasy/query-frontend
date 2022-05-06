import { defineStore } from 'pinia';
// 对外部暴露一个 use 方法，该方法会导出我们定义的 state
export const userStore = defineStore('user', {
  state: () => ({
    uid: '',
    username: '',
    token: '',
  }),
  getters: {
    getToken(): string {
      this.token = localStorage.token;
      return this.token;
    },
  },
  actions: {
    setUsername(name: string) {
      this.username = name;
      localStorage.username = name;
    },
    setToken(token: string) {
      console.log('set token');
      localStorage.token = token;
      this.token = token;
    },
    removeToken() {
      console.log('remove token');
      localStorage.removeItem('token');
      this.token = '';
    },
  },
});
