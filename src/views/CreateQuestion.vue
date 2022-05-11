<template>
  <el-container>
    <div class="me-login-box me-login-box-radius">
      <h1>New Question</h1>

      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="rules"
        size="large"
        label-width="auto"
      >
        <el-form-item
          label="topic"
          prop="topic"
        >
          <el-cascader
            v-model="userForm.topic"
            :options="proxy.topicTreeRef"
            :props="props1"
            :show-all-levels="false"
          />
        </el-form-item>

        <el-form-item
          label="title"
          prop="title"
        >
          <el-input v-model="userForm.title"></el-input>
        </el-form-item>

        <el-form-item
          label="body"
          prop="body"
        >
          <el-input v-model="userForm.body"></el-input>
        </el-form-item>

        <el-form-item class="me-login-button">
          <el-button
            type="primary"
            @click="submitForm(userFormRef)"
          >Publish</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { userStore } from "@/store/index";
import AuthApi from "@/api/auth";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { ElNotification } from "element-plus";
import TopicApi from "@/api/topic";
import QuestionApi from "@/api/question";
import topic from "@/api/topic";
const userFormRef = ref<FormInstance>();
const router = useRouter();

let proxy = reactive({ topicTreeRef: [] });
let value = {};
const userForm = reactive({ body: "", title: "", topic: [] });
const props1 = {
  checkStrictly: true,
};
const rules = reactive<FormRules>({
  body: [
    { required: true, message: "please input your body", trigger: "blur" },
  ],
  title: [
    { required: true, message: "please input your title", trigger: "blur" },
  ],
  topic: [{ required: true, trigger: "blur" }],
});
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log(userForm.topic[userForm.topic.length - 1]);
      QuestionApi.createQuestion(
        userForm.body,
        userForm.title,
        userForm.topic[userForm.topic.length - 1],
        userStore().getToken
      ).then((response) => {
        if (response.data.code == 200) {
          let id = response.data.data;
          ElNotification.success("question published!");
          router.push({ name: "QuestionDetail", params: { qid: id } });
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
const getCascaderTopics = () => {
  TopicApi.getCascaderTopics().then((response) => {
    proxy.topicTreeRef = response.data.data;
    console.log(proxy.topicTreeRef);
  });
};
onBeforeMount(() => {
  getCascaderTopics();
});
</script>

<style scoped>
#login {
  min-width: 100%;
  min-height: 100%;
}

.me-login-box {
  position: relative;
  width: 600px;
  height: 260px;
  background-color: white;
  margin-top: 150px;
  margin-left: -350px;
  left: 50%;
  padding: 50px;
}

.me-login-box-radius {
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
}

.me-login-box h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  vertical-align: middle;
}

.me-login-design {
  text-align: center;
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
}

.me-login-design-color {
  color: #909399 !important;
}

.me-login-button {
  text-align: center;
}

.me-login-button button {
  width: 100%;
}
</style>
