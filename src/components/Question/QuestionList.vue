<template>
  <div>
    <div
      v-for="question in list"
      :key="question.qid"
    >
      <question-card :question="question"></question-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import QuestionCard from "./QuestionCard.vue";
import type { PropType } from "vue";
import type { Question } from "@/type/Interface";
const props = defineProps({
  list: Array as PropType<Question[]>,
});
</script>
<style>
</style>
