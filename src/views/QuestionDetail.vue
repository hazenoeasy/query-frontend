<template>
  <el-container>
    <el-main>
      <div>Question:</div>
      <div>Title: {{ proxy.header.title }}</div>
      <div>Body: {{ proxy.header.body }}</div>
      <div>Date: {{ proxy.header.datetime }}</div>
      <div>Answer:</div>
      <div
        v-for="answer in proxy.answer_list"
        :key="answer.aid"
      >
        <div>{{ answer.text }}</div>
        <div>{{ answer.datetime }}</div>
      </div>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { onBeforeMount, reactive, watch } from "vue";
import QuestionApi from "@/api/question";
import AnswerApi from "@/api/answer";
import { useRoute } from "vue-router";
import type { Answer, Question } from "@/type/Interface";
const route = useRoute();
let header_init: Question = {
  qid: "",
  uid: "",
  tid: "",
  title: "",
  body: "",
  resolve: 0,
  datetime: new Date(),
};
let answer_init: Answer[] = [];
let proxy = reactive({
  header: header_init,
  answer_list: answer_init,
});
onBeforeMount(() => {
  fetchData(route.params.qid);
});
watch(
  () => route.params,
  (newParams) => {
    if (newParams.qid == null) return;
    console.log(newParams);
    fetchData(newParams.qid);
  }
);
const fetchData = (id: string | string[]) => {
  QuestionApi.getQuestionById(id).then((response) => {
    proxy.header = response.data.data;
  });
  AnswerApi.getAnswerList(id).then((response) => {
    proxy.answer_list = response.data.data;
  });
};
watch;
</script>
<style>
</style>
