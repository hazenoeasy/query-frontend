export interface Question {
  qid: string;
  uid: string;
  tid: string;
  title: string;
  body: string | null;
  resolve: 0;
  datetime: Date;
}

export interface Topic {
  tid: string;
  parentId: string;
  topicName: string;
  text: string;
}
export interface Answer {
  aid: string;
  qid: string;
  uid: string;
  text: string;
  likes: number;
  best: boolean;
  datetime: Date;
}
