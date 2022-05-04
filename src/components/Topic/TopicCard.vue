<template>
  <el-card
    class="box-card"
    v-if:="topic != null"
    @click="getQuestionList(topic?.tid)"
  >
    <div>{{ topic.topicName }}</div>
    <div>{{ topic.text }}</div>
  </el-card>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { Topic } from "@/type/Interface";
import { useRouter } from "vue-router";
import topic from "@/api/topic";
const router = useRouter();
const props = defineProps({
  topic: Object as PropType<Topic>,
});
function getQuestionList (tid: string) {
  router.push({
    name: "topicPage",
    params: { tid: props.topic?.tid },
  });
}
</script>
<style>
.box-card {
  margin: 10px 0px;
}
</style>
