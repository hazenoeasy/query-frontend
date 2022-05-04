<template>
  <el-container>
    <el-main>
      <div></div>
      <div>Sub Topic</div>
      <topic-list :list="proxy.topic_list"></topic-list>
      <div>Question List</div>
      <div
        v-infinite-scroll="load"
        style="overflow: auto"
      >
        <question-card
          v-for="question in proxy.question_list"
          :key="question.qid"
          :question="question"
        ></question-card>
      </div>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive, watch, type PropType } from "vue";
import TopicApi from "@/api/topic";
import QuestionApi from "@/api/question";
import type { Question, Topic } from "@/type/Interface";
import TopicList from "@/components/Topic/TopicList.vue";
import QuestionList from "@/components/Question/QuestionList.vue";
import QuestionCard from "@/components/Question/QuestionCard.vue";
let topic: Topic[] = [];
let question: Question[] = [];
let counter = 1;
let size = 10;
let proxy = reactive({ topic_list: topic, question_list: question });
onBeforeMount(() => {
  TopicApi.getRootTopic().then((response) => {
    proxy.topic_list = response.data.data;
  });
});
const load = () => {
  QuestionApi.getQuestionList(counter, size, "").then((response) => {
    proxy.question_list = response.data.data;
    counter++;
  });
};
</script>
<style>
</style>
