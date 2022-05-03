<template>
  <el-card
    class="box-card"
    v-if:="topic != null"
  >
    <div>{{ topic.topicName }}</div>
    <div>{{ topic.text }}</div>
  </el-card>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { Topic } from "@/type/Interface";
const props = defineProps({
  topic: Object as PropType<Topic>,
});
</script>
<style>
</style>
