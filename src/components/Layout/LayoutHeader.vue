<template>
  <el-header class="me-area">
    {{ userStore().token }}
    <el-row class="me-header">
      <el-col
        :span="2"
        class="me-header-left"
      > </el-col>

      <el-col :span="18">
        <el-menu
          :router="true"
          menu-trigger="click"
          active-text-color="#909399"
          mode="horizontal"
        >
          <el-menu-item index="/">Home</el-menu-item>
          <el-menu-item index="/topicRoot">Topics</el-menu-item>

          <el-col
            :span="8"
            :offset="4"
            class="search_bar"
          >
            <el-input
              v-model="keyWord"
              placeholder="Type something"
            >
              <template #prefix>
                <el-icon class="el-input__icon">
                  <search />
                </el-icon>
              </template>
            </el-input>
          </el-col>

          <template v-if="
            userStore().token == undefined || userStore().token.length == 0
          ">
            <el-menu-item
              index="/login"
              style="margin-left: 20%"
            >Login</el-menu-item>
            <el-menu-item index="/register"> Register </el-menu-item>
          </template>

          <template v-else>
            <el-menu-item
              index
              @click="logout"
            ><i class="el-icon-back"></i>Logout</el-menu-item>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { userStore } from "@/store/index";
import { useRouter } from "vue-router";
import { debug } from "console";
const keyWord = ref("");
const router = useRouter();
function logout () {
  userStore().removeToken();
  router.push({ name: "indexPage" });
  userStore().setToken("");
  console.log(userStore().token);
}
</script>

<style>
.el-header {
  position: fixed;
  z-index: 1024;
  min-width: 100%;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
}

.me-title {
  margin-top: 10px;
  font-size: 24px;
}

.me-header-left {
  margin-top: 10px;
}

.me-title img {
  max-height: 2.4rem;
  max-width: 100%;
}

.me-header-picture {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #909399;
}

.el-menu-item-content {
  color: #909399;
}

.search_bar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
