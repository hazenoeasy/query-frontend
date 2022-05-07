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
  rateAnswer: function rateAnswer(aid: string, like: number, token: string) {
    return request({
      url: baseURL + '/like',
      method: 'post',
      data: {
        aid: aid,
        likes: like,
      },
      headers: {
        Authorization: token,
      },
    });
  },
  bestAnswer: function rateAnswer(aid: string, best: number, token: string) {
    return request({
      url: baseURL + '/best',
      method: 'post',
      data: {
        aid: aid,
        operation: best,
      },
      headers: {
        Authorization: token,
      },
    });
  },
};
