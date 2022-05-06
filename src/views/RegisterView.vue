<template>
  <div class="me-login-box me-login-box-radius">
    <h1>Query Forum Register</h1>

    <el-form
      ref="userFormRef"
      :model="userForm"
      :rules="rules"
      size="large"
      label-width="auto"
    >
      <el-form-item
        label="username"
        prop="username"
      >
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item
        label="password"
        prop="password"
      >
        <el-input
          type="password"
          v-model="userForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="email"
        prop="email"
      >
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item
        label="state"
        prop="state"
      >
        <el-input v-model="userForm.state"></el-input>
      </el-form-item>
      <el-form-item
        label="country"
        prop="country"
      >
        <el-input v-model="userForm.country"></el-input>
      </el-form-item>
      <el-form-item
        label="city"
        prop="city"
      >
        <el-input v-model="userForm.city"></el-input>
      </el-form-item>
      <el-form-item
        label="profile"
        prop="profile"
      >
        <el-input
          v-model="userForm.profile"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
        ></el-input>
      </el-form-item>

      <el-form-item class="me-login-button">
        <el-button
          type="primary"
          @click="submitForm(userFormRef)"
        >login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { userStore } from "@/store/index";
import AuthApi from "@/api/auth";
import UserApi from "@/api/user";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { ElNotification } from "element-plus";
const userFormRef = ref<FormInstance>();
const router = useRouter();
const userForm = reactive({
  username: "",
  password: "",
  email: "",
  country: undefined,
  state: undefined,
  city: undefined,
  profile: undefined,
});
const rules = reactive<FormRules>({
  username: [
    { required: true, message: "Please input username", trigger: "blur" },
    { min: 3, max: 10, message: "length 3-10", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
    { min: 3, max: 10, message: "length 3-10", trigger: "blur" },
  ],
  email: [
    {
      required: true,
      message: "Please input email address",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Please input correct email address",
      trigger: ["blur", "change"],
    },
  ],
});
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      AuthApi.register(userForm)
        .then((response) => {
          if (response.data.code == 200) {
            ElNotification.success("register succeed!");
            router.push({ name: "indexPage" });
          }
        })
        .catch((err) => {
          ElMessage({
            showClose: true,
            message: "wrong password",
            center: true,
          });
          console.log("error!", err);
        });
    } else {
      ElMessage({
        showClose: true,
        message: "check your input!",
        center: true,
      });
    }
  });
};
</script>

<style scoped>
#login {
  min-width: 100%;
  min-height: 100%;
}

.me-login-box {
  position: relative;
  width: 600px;
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
