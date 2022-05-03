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
