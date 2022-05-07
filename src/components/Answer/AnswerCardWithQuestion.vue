<template>
  <el-card
    class="box-card"
    v-if:="answer != null"
    @click="getQuestionDetail(props.answer?.qid)"
  >
    <div class="info">
      <div>Q: {{ answer.title }}</div>
      <el-tag
        v-if="answer.best"
        class="ml-3"
        type="success"
      >Best Answer</el-tag>
      <div>{{ answer.datetime }}</div>
    </div>
    <div class="answer">
      <div style="padding-right: 20px">
        <div style="text-align: center">
          {{ answer.likes }}
        </div>
      </div>
      <div style="width: 100%; padding: 20px 20px">
        <div v-if="answer.username != null">Author: {{ answer.username }}</div>
        <div>{{ answer.text }}</div>
      </div>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type {
  Answer,
  AnswerWithQuestionTitle,
  QuestionDetail,
} from "@/type/Interface";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  answer: Object as PropType<AnswerWithQuestionTitle>,
});
function getQuestionDetail (qid: string) {
  router.push({
    name: "QuestionDetail",
    params: { qid: qid },
  });
}
</script>
<style>
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.answer {
  display: flex;
  align-items: center;
}
</style>
