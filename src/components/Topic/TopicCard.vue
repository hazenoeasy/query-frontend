<template>
  <el-card
    class="box-card"
    v-if:="props.topic != null"
    @click="getQuestionList(props.topic?.tid)"
  >
    <div>{{ props.topic.topicName }}</div>
    <div>{{ props.topic.text }}</div>
  </el-card>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { Topic } from "@/type/Interface";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  topic: Object as PropType<Topic>,
});
function getQuestionList (tid: string) {
  router.push({
    name: "topicPage",
    params: { parentId: tid },
  });
}
</script>
<style>
.box-card {
  margin: 10px 0px;
}
</style>
