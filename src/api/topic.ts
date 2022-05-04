import request from '@/utils/request';
const baseURL = '/api/topic';
export default {
  getPopularQuestions: function getPopularQuestions(number: number) {
    return request({
      url: baseURL + '/popular',
      method: 'get',
      params: {
        number: number,
      },
    });
  },
  getRootTopic: function getRootTopic() {
    return request({
      url: baseURL + '/rootTopic',
    });
  },
};
