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
  addAnswer: function addAnswer(text: string, qid: any, token: string) {
    return request({
      url: baseURL + '/reply',
      method: 'post',
      data: {
        qid: qid,
        text: text,
      },
      headers: {
        Authorization: token,
      },
    });
  },
};
