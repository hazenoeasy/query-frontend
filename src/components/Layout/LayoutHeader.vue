<template>
  <el-header class="me-area">
    <el-row class="me-header">
      <el-col
        :span="4"
        class="me-header-left"
      > </el-col>

      <el-col :span="16">
        <el-menu
          :router="true"
          menu-trigger="click"
          active-text-color="#909399"
          mode="horizontal"
        >
          <el-menu-item index="/">Home</el-menu-item>
          <el-menu-item index="/category/all">Topics</el-menu-item>

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
        </el-menu>
      </el-col>

      <el-col :span="4">
        <el-menu
          :router="true"
          menu-trigger="click"
          mode="horizontal"
          active-text-color="#909399"
        >
          <!-- <template v-if="!user.login">
            <el-menu-item index="/login">
              <el-button type="text">Login</el-button>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-button type="text">Register</el-button>
            </el-menu-item>
          </template>

          <template v-else>
            <el-submenu index>
              <template slot="title">
                <img
                  class="me-header-picture"
                  :src="user.avatar"
                />
              </template>
              <el-menu-item
                index
                @click="logout"
              ><i class="el-icon-back"></i>Logout</el-menu-item>
            </el-submenu>
          </template> -->
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
const keyWord = ref("");
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
