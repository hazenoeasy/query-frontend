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
  getQuestionList: function getQuestionList(page: number, size: number, tid: any) {
    return request({
      url: baseURL + '/list',
      method: 'get',
      params: {
        page: page,
        size: size,
        tid: tid,
      },
    });
  },
  getQuestionById: function getQuestionById(qid: any) {
    return request({
      url: baseURL + '/detail',
      method: 'get',
      params: {
        qid: qid,
      },
    });
  },
  createQuestion: function createQuestion(body: string, title: string, tid: string, token: string) {
    return request({
      url: baseURL + '/new',
      method: 'post',
      data: {
        body: body,
        title: title,
        tid: tid,
      },
      headers: {
        Authorization: token,
      },
    });
  },
  resolveQuestion: function resolveQuestion(qid: string, token: string) {
    return request({
      url: baseURL + '/resolve',
      method: 'post',
      data: {
        qid: qid,
      },
      headers: {
        Authorization: token,
      },
    });
  },
  unResolveQuestion: function unResolveQuestion(qid: string, token: string) {
    return request({
      url: baseURL + '/cancelResolve',
      method: 'post',
      data: {
        qid: qid,
      },
      headers: {
        Authorization: token,
      },
    });
  },
};
