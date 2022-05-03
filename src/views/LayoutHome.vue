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
</script>

<style>
.me-container {
  margin: 100px auto 140px;
  width: 80%;
  max-width: 1000px;
}
</style>
