import request from '@/utils/request';
const baseURL = '/api/answer';
export default {
  getAnswerList: function getAnswerList(qid: any) {
    return request({
      url: baseURL + '/list',
      method: 'get',
      params: {
        qid: qid,
      },
    });
  },
};
