<template>
  <el-card
    class="box-card"
    v-if:="question != null"
    @click="getQuestionDetail(props.question?.qid)"
  >
    <div>{{ question.title }}</div>
    <div>{{ question.datetime }}</div>
  </el-card>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { Question } from "@/type/Interface";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  question: Object as PropType<Question>,
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
