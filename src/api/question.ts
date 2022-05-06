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
};
