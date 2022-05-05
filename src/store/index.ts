import { defineStore } from 'pinia';
// 对外部暴露一个 use 方法，该方法会导出我们定义的 state
export const userStore = defineStore('user', {
  state: () => ({
    uid: '',
    username: '',
    token: '',
  }),
  actions: {
    setToken(token: string) {
      localStorage.token = token;
      this.token = token;
    },
    removeToken() {
      localStorage.removeItem('token');
      this.token = '';
    },
  },
});
