<template>
  <el-container>
    <div class="me-login-box me-login-box-radius">
      <h1>Query Forum Login</h1>

      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="rules"
        size="large"
        label-width="auto"
      >
        <el-form-item
          label="username"
          prop="account"
        >
          <el-input v-model="userForm.account"></el-input>
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

        <el-form-item class="me-login-button">
          <el-button
            type="primary"
            @click="submitForm(userFormRef)"
          >login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { userStore } from "@/store/index";
import AuthApi from "@/api/auth";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { ElNotification } from "element-plus";
const userFormRef = ref<FormInstance>();
const router = useRouter();
const userForm = reactive({ account: "", password: "" });
const rules = reactive<FormRules>({
  account: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 10, message: "不能大于10个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 10, message: "不能大于10个字符", trigger: "blur" },
  ],
});
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      AuthApi.login(userForm.account, userForm.password)
        .then((response) => {
          if (response.data.code == 200) {
            userStore().setToken(response.data.data);
            userStore().setUsername(userForm.account);
            ElNotification.success("login!");
            router.go(-1);
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
      return false;
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
