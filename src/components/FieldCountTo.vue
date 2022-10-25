<template>
  <div class="g-font-num-mid">
    <span>{{ from }}</span>
    <template v-if="from !== countTo">
      <img src="../assets/images/arrow-right.svg" alt="" />
      <span>{{ countTo }}</span>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  from: { type: [String, Number], require: false, default: "" },
  to: { type: [String, Number], require: false, default: "" },
});

const countTo = computed(() => {
  if (props.to) {
    return props.to;
  }
  return props.from;
});
</script>

<style lang="scss" scoped>
.g-font-num-mid {
  img {
    margin: 0 0.08rem;
  }
}
</style>
