import request from '@/utils/request';
const baseURL = '/api/users';
export default {
  getUserInfo: function getUserInfo(token: string) {
    return request({
      url: baseURL + '/currentUser',
      method: 'get',
      headers: {
        Authorization: token,
      },
    });
  },
  getUserById: function getUserById(uid: string) {
    return request({
      url: baseURL + '/one',
      method: 'get',
      params: {
        uid: uid,
      },
    });
  },
};
