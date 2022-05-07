<template>
  <el-container>
    <el-main>
      <div class="box">
        <h1 style="font-size: -webkit-xxx-large">{{ proxy.header.title }}</h1>
        <div class="info">
          <div>{{ proxy.header.username }}</div>
          <div>{{ proxy.header.datetime }}</div>
          <el-tag
            v-if="!proxy.header.resolved"
            class="ml-3"
            type="warning"
          >Unsolved</el-tag>
          <el-tag
            v-if="proxy.header.resolved"
            class="ml-3"
            type="success"
          >solved</el-tag>
        </div>
        <el-divider />
        {{ proxy.header.body }}
        <div
          style="text-align: right"
          v-if="userStore().username == proxy.header.username"
        >
          <el-divider />
          <el-button
            @click="resolve"
            size="large"
            type="primary"
            v-if="!proxy.header.resolved"
          >Solve</el-button>
          <el-button
            @click="unresolve"
            size="large"
            type="warning"
            v-if="proxy.header.resolved"
          >Unsolved</el-button>
        </div>
      </div>
      <div class="box">
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
          <div style="text-align: right">
            <el-button
              type="primary"
              @click="submitForm(formRef)"
            >answer this question</el-button>
          </div>
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
      </div>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { onBeforeMount, reactive, watch, ref } from "vue";
import QuestionApi from "@/api/question";
import AnswerApi from "@/api/answer";
import { useRoute } from "vue-router";
import type { Answer, Question, QuestionDetail } from "@/type/Interface";
import type { FormInstance, FormRules } from "element-plus";
import { userStore } from "@/store/index";
import { ElNotification, ElMessage } from "element-plus";
import auth from "@/api/auth";
import UserApi from "@/api/user";
import { computed } from "@vue/reactivity";
import { fa } from "element-plus/lib/locale";
const route = useRoute();
let header_init: QuestionDetail = {
  qid: "",
  uid: "",
  tid: "",
  title: "",
  body: "",
  resolved: true,
  datetime: "",
  username: "",
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
    console.log(proxy.header);
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

const resolve = () => {
  QuestionApi.resolveQuestion(proxy.header.qid, userStore().token).then(
    (response) => {
      if (response.data.code == 200) {
        proxy.header.resolved = true;
      }
    }
  );
};
const unresolve = () => {
  QuestionApi.unResolveQuestion(proxy.header.qid, userStore().token).then(
    (response) => {
      if (response.data.code == 200) {
        proxy.header.resolved = false;
      }
    }
  );
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

.box .info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
