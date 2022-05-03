<template>
  <div>
    <div>Home Page</div>
    <el-main class="main-question">
      <popular-question :list="proxy.question_list"></popular-question>
    </el-main>
    <el-aside>
      <popular-topic :list="proxy.topic_list"></popular-topic>
    </el-aside>
  </div>
</template>
<script lang="ts" setup>
import PopularQuestion from "@/components/Question/PopularQuestion.vue";
import PopularTopic from "@/components/Topic/PopularTopic.vue";
import QuestionApi from "@/api/question";
import TopicApi from "@/api/topic";
import { onMounted, reactive, ref } from "vue";
import type { Question, Topic } from "@/type/Interface";
let question: Question[] = [];
let topic: Topic[] = [];
let proxy = reactive({ question_list: question, topic_list: topic });
onMounted(() => {
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
.main-question {
  width: 60%;
}
</style>
