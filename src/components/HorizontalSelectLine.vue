<template>
  <div class="horizontal-select-line">
    <div
      class="horizontal-select-line__item"
      :class="{
        active: modelValue === item.value,
      }"
      v-for="(item, idx) in options"
      :key="idx"
      @click="emitValue(item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    require: true,
  },
  options: {
    type: Array,
    require: true,
  },
});
const emits = defineEmits(["update:modelValue"]);
const emitValue = (val) => {
  emits("update:modelValue", val);
};
</script>

<style lang="scss" scoped>
.horizontal-select-line {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &__item {
    color: var(--color-content);
    cursor: pointer;
    & + & {
      margin-left: 0.2rem;
    }
    &.active,
    &:hover {
      color: var(--color-green);
      text-decoration: underline;
    }
  }
}
</style>
