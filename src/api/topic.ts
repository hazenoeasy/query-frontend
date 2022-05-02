import request from '@/utils/request';
const baseURL = '/api/topic';
export default {
  getPopularQuestions: function getPopularQuestions() {
    return request({
      url: baseURL + '/popular',
      method: 'get',
    });
  },
};
