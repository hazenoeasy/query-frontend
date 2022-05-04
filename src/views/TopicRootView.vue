<template>
  <el-container>
    <el-main>
      <topic-list :list="proxy.topic_list"></topic-list>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive, watch, type PropType } from "vue";
import TopicApi from "@/api/topic";
import type { Topic } from "@/type/Interface";
import TopicList from "@/components/Topic/TopicList.vue";
let topic: Topic[] = [];
let proxy = reactive({ topic_list: topic });
onBeforeMount(() => {
  TopicApi.getRootTopic().then((response) => {
    proxy.topic_list = response.data.data;
  });
});
</script>
<style>
</style>
