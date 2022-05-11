<template>
  <el-container>
    <el-main>
      <div class="box">
        <h1>{{ proxy.user.username }}</h1>
        <h1>status: {{ proxy.user.status }}</h1>
        <h1>
          level:
          {{
              proxy.user.status <
                10
                ? "Starter"
                :
                proxy.user.status
                  <
                  50
                  ? "Bronze"
                  :
                  proxy.user.status
                    <
                    100
                    ? "Silver"
                    : "Golden"
          }}
            </h1
          >
      </div>
      <div class="box">
        <h1>User Question</h1>
        <question-card
          :question="question"
          v-for="question in proxy.question_list"
          :key="question.qid"
        >
        </question-card>
      </div>
      <div class="box">
        <h1>User Answer</h1>
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
import type {
  User,
  Answer,
  Question,
  AnswerWithQuestionTitle,
} from "@/type/Interface";
import QuestionApi from "@/api/question";
import UserApi from "@/api/user";
import AnswerApi from "@/api/answer";
import { userStore } from "@/store/index";
import { useRoute } from "vue-router";
const route = useRoute();
let user_init: User = {
  uid: "",
  username: "",

  email: "",

  country: "",

  state: "",

  city: "",

  status: "",

  profile: "",
};
let answer_init: AnswerWithQuestionTitle[] = [];
let question_init: Question[] = [];
let proxy = reactive({
  user: user_init,
  answer_list: answer_init,
  question_list: question_init,
});
onBeforeMount(() => {
  fetchData(route.params.uid);
});
const fetchData = (uid: any) => {
  console.log(route.params);
  UserApi.getUserById(uid).then((response) => {
    proxy.user = response.data.data;
    QuestionApi.getQuestionListByUid(uid).then((response) => {
      proxy.question_list = response.data.data;
    });
    AnswerApi.getAnswerListByUid(uid).then((response) => {
      proxy.answer_list = response.data.data;
    });
  });
};

watch(
  () => route.params,
  (newParams) => {
    if (newParams.keyword == null) return;
    fetchData(newParams.keyword[0]);
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
