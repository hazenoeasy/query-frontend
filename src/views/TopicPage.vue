<template>
  <el-container>
    <el-main style="overflow: auto; height: 100%">
      <div v-if="proxy.header">
        <div>{{ proxy.header.topicName }}</div>
        <div>{{ proxy.header.text }}</div>
      </div>
      <div v-if="proxy.topic_list && proxy.topic_list.length > 0">
        Sub Topic
      </div>
      <topic-list :list="proxy.topic_list"></topic-list>
      <div>Question List</div>
      <div
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        infinite-scroll-immediate="false"
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
import {
  onBeforeMount,
  onMounted,
  reactive,
  watch,
  type PropType,
  ref,
} from "vue";
import TopicApi from "@/api/topic";
import QuestionApi from "@/api/question";
import { useRoute } from "vue-router";
import type { Question, Topic } from "@/type/Interface";
import TopicList from "@/components/Topic/TopicList.vue";
import QuestionCard from "@/components/Question/QuestionCard.vue";
const route = useRoute();
let topic: Topic[] = [];
let header_init: Topic = {
  tid: "",
  parentId: "",
  topicName: "",
  text: "",
};
let question: Question[] = [];
let counter = 1;
let size = 10;
let disabled = ref(true);
let proxy = reactive({
  topic_list: topic,
  question_list: question,
  header: header_init,
});
onBeforeMount(() => {
  fetchData(route.params.parentId);
  load();
});
watch(
  () => route.params,
  (newParams) => {
    if (newParams.parentId == null) return;
    console.log(newParams);
    disabled.value = false;
    counter = 1;
    QuestionApi.getQuestionList(counter, size, newParams.parentId).then(
      (response) => {
        proxy.question_list = response.data.data;
      }
    );
    fetchData(newParams.parentId);
  }
);
const load = () => {
  QuestionApi.getQuestionList(counter, size, route.params.parentId).then(
    (response) => {
      if (response.data.data.length == 0) {
        disabled.value = true;
      } else {
        proxy.question_list = proxy.question_list.concat(response.data.data);
      }
      counter++;
    }
  );
};
const fetchData = (id: string | string[]) => {
  TopicApi.getChildTopic(id).then((response) => {
    proxy.topic_list = response.data.data;
  });
  TopicApi.getTopicById(id).then((response) => {
    proxy.header = response.data.data;
  });
};
watch;
</script>
<style>
</style>
