<template>
  <div id="home">
    <el-container>
      <layout-header></layout-header>
      <router-view class="me-container" />
      <layout-footer></layout-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import LayoutFooter from "@/components/Layout/LayoutFooter.vue";
import LayoutHeader from "@/components/Layout/LayoutHeader.vue";
import QuestionApi from "@/api/question";
import { onMounted } from "vue";

onMounted(() => {
  QuestionApi.getPopularQuestions(10)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<style>
.me-container {
  margin: 100px auto 140px;
}
</style>
