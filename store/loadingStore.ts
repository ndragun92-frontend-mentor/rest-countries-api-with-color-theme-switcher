import { defineStore } from "pinia";
export const useLoadingStore = defineStore("loading", () => {
  const loadCount = ref(8);

  const increaseLoadCount = (value: number) => {
    loadCount.value += value;
  };

  return { loadCount, increaseLoadCount };
});
