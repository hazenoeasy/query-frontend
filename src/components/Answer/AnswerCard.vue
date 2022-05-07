<template>
  <el-card
    class="box-card"
    v-if:="answer != null"
    @click="getQuestionDetail(props.answer?.qid)"
  >
    <div class="info">
      <div>{{ answer.username }}</div>
      <el-tag
        v-if="answer.best"
        class="ml-3"
        type="success"
      >Best Answer</el-tag>
      <div>{{ answer.datetime }}</div>
    </div>
    <div class="answer">
      <div style="padding-right: 20px">
        <el-icon>
          <arrow-up-bold @click="$emit('like', answer?.aid, 1)" />
        </el-icon>
        <div style="text-align: center">
          {{ answer.likes }}
        </div>
        <el-icon>
          <arrow-down-bold @click="$emit('like', answer?.aid, -1)" />
        </el-icon>
      </div>
      <div style="width: 100%; padding: 20px 20px">
        <div>{{ answer.text }}</div>
        <div style="text-align: right">
          <el-button
            @click="$emit('best', answer?.aid, 1)"
            size="large"
            type="primary"
            v-if="
              question?.best == null ||
              question?.best == undefined ||
              question?.best == ''
            "
          >Mark as best Answer</el-button>
          <el-button
            @click="$emit('best', answer?.aid, 0)"
            size="large"
            type="warning"
            v-if="answer.best"
          >Unmark as best Answer</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { Answer, QuestionDetail } from "@/type/Interface";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  answer: Object as PropType<Answer>,
  question: Object as PropType<QuestionDetail>,
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
