<template>
  <el-container>
    <el-main>
      <div class="box">
        <h1>Profile</h1>
        <el-descriptions>
          <el-descriptions-item label="Username">{{
              proxy.user.username
          }}</el-descriptions-item>
          <el-descriptions-item label="Email">{{
              proxy.user.email
          }}</el-descriptions-item>
          <el-descriptions-item label="Status">{{
              proxy.user.status
          }}</el-descriptions-item>
          <el-descriptions-item label="Country">
            {{ proxy.user.country }}
          </el-descriptions-item>
          <el-descriptions-item label="State">
            {{ proxy.user.state }}
          </el-descriptions-item>
          <el-descriptions-item label="City">
            {{ proxy.user.city }}
          </el-descriptions-item>
          <el-descriptions-item label="Profile">
            {{ proxy.user.profile }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="box">
        <h1>My Question</h1>
        <question-card
          :question="question"
          v-for="question in proxy.question_list"
          :key="question.qid"
        >
        </question-card>
      </div>
      <div class="box">
        <h1>My Answer</h1>
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
  fetchData();
});
const fetchData = () => {
  UserApi.getUserInfo(userStore().token).then((response) => {
    proxy.user = response.data.data;
    QuestionApi.getQuestionListByUid(proxy.user.uid).then((response) => {
      proxy.question_list = response.data.data;
    });
    AnswerApi.getAnswerListByUid(proxy.user.uid).then((response) => {
      proxy.answer_list = response.data.data;
    });
  });
};
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
