<template>
  <el-card
    class="box-card"
    v-if:="answer != null"
    @click="getQuestionDetail(props.answer?.qid)"
  >
    <div>{{ answer.username }}</div>
    <div>{{ answer.datetime }}</div>
    <el-tag
      v-if="answer.best"
      class="ml-3"
      type="success"
    >Best Answer</el-tag>
  </el-card>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { Answer } from "@/type/Interface";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  answer: Object as PropType<Answer>,
});
function getQuestionDetail (qid: string) {
  router.push({
    name: "QuestionDetail",
    params: { qid: qid },
  });
}
</script>
<style>
</style>
z
