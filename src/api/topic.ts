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
  getChildTopic: function getChildTopic(tid: any) {
    return request({
      url: baseURL + '/childTopic',
      method: 'get',
      params: {
        parentId: tid,
      },
    });
  },
  getTopicById: function getTopicById(tid: any) {
    return request({
      url: baseURL + '/detail',
      method: 'get',
      params: {
        tid: tid,
      },
    });
  },
  getCascaderTopics: function getCascaderTopics() {
    return request({
      url: baseURL + '/cascader',
      method: 'get',
    });
  },
};
