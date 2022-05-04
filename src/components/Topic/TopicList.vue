<template>
  <div>
    <div
      v-for="topic in list"
      :key="topic.tid"
    >
      <topic-card :topic="topic"></topic-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TopicCard from "./TopicCard.vue";
import type { PropType } from "vue";
import type { Topic } from "@/type/Interface";
const props = defineProps({
  list: Array as PropType<Topic[]>,
});
</script>
<style>
</style>
