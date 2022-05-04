<template>
  <el-container>
    <el-main class="main-question">
      <div>Popular Question</div>
      <question-list :list="proxy.question_list"></question-list>
    </el-main>
    <el-aside>
      <div>Popular Topics</div>
      <popular-topic :list="proxy.topic_list"></popular-topic>
    </el-aside>
  </el-container>
</template>
<script lang="ts" setup>
import QuestionList from "@/components/Question/QuestionList.vue";
import PopularTopic from "@/components/Topic/TopicList.vue";
import QuestionApi from "@/api/question";
import TopicApi from "@/api/topic";
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import type { Question, Topic } from "@/type/Interface";
let question: Question[] = [];
let topic: Topic[] = [];
let proxy = reactive({ question_list: question, topic_list: topic });
onBeforeMount(() => {
  QuestionApi.getPopularQuestions(10)
    .then((response) => {
      proxy.question_list = response.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  TopicApi.getPopularQuestions(10)
    .then((response) => {
      proxy.topic_list = response.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>
<style>
</style>
