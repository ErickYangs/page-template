<template>
  <div class="horizontal-select">
    <div
      class="horizontal-select__item"
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
.horizontal-select {
  border-radius: 0.08rem;
  background-color: #000;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &__item {
    flex: 1;
    min-width: 1.5rem;
    text-align: center;
    padding: 0.1rem 0.2rem;
    color: var(--color-content__6);
    height: 0.4rem;
    line-height: 0.2rem;
    cursor: pointer;
    &.active {
      background: var(--color-green);
      color: #fff;
    }
  }
}
</style>
