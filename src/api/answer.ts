import request from '@/utils/request';
const baseURL = '/api/question';
export default {
  getPopularQuestions: function getPopularQuestions(num: number) {
    return request({
      url: baseURL + '/popular',
      method: 'get',
      params: {
        number: num,
      },
    });
  },
};
