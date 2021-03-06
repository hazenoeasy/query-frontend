import type { RegisterParams } from '@/type/Interface';
import request from '@/utils/request';
const baseURL = '/api';
export default {
  login: function login(username: string, password: string) {
    return request({
      url: baseURL + '/login',
      method: 'post',
      data: {
        username: username,
        password: password,
      },
    });
  },
  register: function register(registerParams: RegisterParams) {
    return request({
      url: baseURL + '/register',
      method: 'post',
      data: registerParams,
    });
  },
  logout: function logout() {
    return request({
      url: baseURL + '/logout',
      method: 'get',
    });
  },
};
