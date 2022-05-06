<template>
  <el-container>
    <el-main>
      <el-descriptions :title="proxy.header.title">
        <el-descriptions-item>{{ proxy.header.body }}</el-descriptions-item>
        <el-descriptions-item>{{ proxy.header.datetime }}</el-descriptions-item>
      </el-descriptions>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        size="large"
        label-width="auto"
      >
        <el-form-item
          label="answer"
          prop="answer"
        >
          <el-input v-model="form.answer"></el-input>
        </el-form-item>
        <el-button
          type="primary"
          @click="submitForm(formRef)"
        >answer this question</el-button>
      </el-form>
      <div>Answer:</div>
      <el-descriptions
        :title="proxy.header.uid"
        v-for="answer in proxy.answer_list"
        :key="answer.aid"
      >
        <el-descriptions-item>{{ answer.text }}</el-descriptions-item>
        <el-descriptions-item>{{ answer.datetime }}</el-descriptions-item>
      </el-descriptions>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { onBeforeMount, reactive, watch, ref } from "vue";
import QuestionApi from "@/api/question";
import AnswerApi from "@/api/answer";
import { useRoute } from "vue-router";
import type { Answer, Question } from "@/type/Interface";
import type { FormInstance, FormRules } from "element-plus";
import { userStore } from "@/store/index";
import { ElNotification, ElMessage } from "element-plus";
import auth from "@/api/auth";
import UserApi from "@/api/user";
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
const formRef = ref<FormInstance>();
const form = reactive({ answer: "" });
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

const rules = reactive<FormRules>({
  answer: [
    { required: true, message: "please input your answer", trigger: "blur" },
  ],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (!checkAuth()) {
        ElMessage({
          showClose: true,
          message: "please login first",
          center: true,
        });
        return;
      }
      AnswerApi.addAnswer(
        form.answer,
        route.params.qid,
        userStore().token
      ).then((response) => {
        if (response.data.code == 200) {
          fetchData(route.params.qid);
          ElNotification.success("answer published!");
        }
      });
    } else {
      ElMessage({
        showClose: true,
        message: "check your input!",
        center: true,
      });
      return false;
    }
  });
};
const checkAuth = () => {
  const token: string = userStore().getToken;
  if (token) {
    UserApi.getUserInfo(token)
      .then()
      .catch(() => {
        ElMessage({
          type: "warning",
          showClose: true,
          message: "登录已过期",
        });
        return false;
      });
    return true;
  } else {
    return false;
  }
};
</script>
<style>
</style>
