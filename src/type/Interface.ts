export interface Question {
  qid: string;
  uid: string;
  tid: string;
  title: string;
  body: string | null;
  resolve: 0;
  datetime: string;
  relevant: number;
}

export interface QuestionDetail {
  best: string;
  qid: string;
  uid: string;
  tid: string;
  title: string;
  body: string | null;
  resolved: boolean;
  datetime: string;
  username: string;
}
export interface Topic {
  tid: string;
  parentId: string;
  topicName: string;
  text: string;
}
export interface Answer {
  username: string;
  aid: string;
  qid: string;
  uid: string;
  text: string;
  likes: number;
  best: boolean;
  datetime: Date;
}

export interface AnswerWithQuestionTitle {
  title: string;
  username: string;
  aid: string;
  qid: string;
  uid: string;
  text: string;
  likes: number;
  best: boolean;
  datetime: string;
}

export interface RegisterParams {
  username: string;
  password: string;
  email: string;
  country?: string;
  state?: string;
  city?: string;
  profile?: string;
}
export interface cascaderTopic {
  tid: string;
  parentId: string;
  topicName: string;
  text: string;
  children: cascaderTopic[];
}

export interface newQuestionParams {
  body: string;
  title: string;
}

export interface User {
  uid: string;

  username: string;

  email: string;

  country: string;

  state: string;

  city: string;

  status: string;

  profile: string;
}
