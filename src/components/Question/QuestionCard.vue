<template>
  <el-card
    class="box-card"
    v-if:="question != null"
  >
    {{ question.qid }}
    <div>{{ question.title }}</div>
    <div>{{ question.datetime }}</div>
  </el-card>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { Question } from "@/type/Interface";
const props = defineProps({
  question: Object as PropType<Question>,
});
</script>
<style>
</style>
z
