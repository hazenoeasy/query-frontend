import { ref, computed } from "vue";
import { defineStore } from "pinia";

// 对外部暴露一个 use 方法，该方法会导出我们定义的 state
const useCounterStore = defineStore("counter", function () {
  const count = ref(0);
  const double = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  return {
    count,
    double,
    increment,
  };
});
export default useCounterStore;
