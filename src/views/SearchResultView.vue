<template>
  <el-container>
    <el-main>
      <div class="box">
        <h1>Question</h1>
        <el-switch
          v-model="proxy.question_sort"
          size="large"
          active-text="relevant"
          inactive-text="time"
          @change="questionSort"
          inactive-color="#E6A23C"
        />
        <question-card
          :question="question"
          v-for="question in proxy.question_list"
          :key="question.qid"
        >
        </question-card>
      </div>
      <div class="box">
        <h1>Answer</h1>
        <el-switch
          v-model="proxy.answer_sort"
          size="large"
          active-text="likes"
          inactive-text="time"
          @change="answerSort"
          inactive-color="#E6A23C"
        />
        <answer-card-with-question
          v-for="answer in proxy.answer_list"
          :key="answer.aid"
          :answer="answer"
        ></answer-card-with-question>
      </div>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import QuestionCard from "@/components/Question/QuestionCard.vue";
import AnswerCardWithQuestion from "@/components/Answer/AnswerCardWithQuestion.vue";
import { onBeforeMount, reactive, watch, ref } from "vue";
import type { Question, AnswerWithQuestionTitle } from "@/type/Interface";
import QuestionApi from "@/api/question";
import AnswerApi from "@/api/answer";
import { useRoute } from "vue-router";
const route = useRoute();
let answer_init: AnswerWithQuestionTitle[] = [];
let question_init: Question[] = [];
let proxy = reactive({
  answer_list: answer_init,
  question_list: question_init,
  question_sort: "",
  answer_sort: "",
});
onBeforeMount(() => {
  fetchData(route.params.keyword);
});
const fetchData = (keyword: any) => {
  QuestionApi.searchQuestion(keyword).then((response) => {
    proxy.question_list = response.data.data;
  });
  AnswerApi.searchAnswer(keyword).then((response) => {
    proxy.answer_list = response.data.data;
  });
};
const questionSort = () => {
  if (proxy.question_sort) {
    // sort with relevant
    proxy.question_list.sort((a, b) => {
      return b.relevant - a.relevant;
    });
  } else {
    //sort with time
    proxy.question_list.sort((a, b) => {
      return b.datetime > a.datetime ? 1 : -1;
    });
  }
};
const answerSort = () => {
  if (proxy.answer_sort) {
    // sort with relevant
    proxy.answer_list.sort((a, b) => {
      return b.likes - a.likes;
    });
  } else {
    //sort with time
    proxy.answer_list.sort((a, b) => {
      return b.datetime > a.datetime ? 1 : -1;
    });
  }
};
watch(
  () => route.params,
  (newParams) => {
    if (newParams.keyword == null) return;
    fetchData(newParams.keyword);
  }
);
</script>
<style>
.box {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0px;
  box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
}
</style>
