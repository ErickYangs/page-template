<template>
  <button
    class="g-clickable btn btn--primary"
    :class="{ disabled: loading, final: finallyStatus }"
    type="button"
    :disabled="loading"
    @click="emitClick"
  >
    {{ label }}
    <img
      v-if="loading"
      class="loading"
      src="../assets/images/s_loading.svg"
      alt=""
    />
  </button>
</template>

<script setup>
const props = defineProps({
  loading: { type: Boolean, required: false, default: false }, // confirmDisabled
  label: { type: String, required: false },
  finallyStatus: { type: Boolean, required: false, default: false },
});
const emit = defineEmits(["emitClick"]);

const emitClick = () => {
  if (props.loading || props.finallyStatus) {
    return;
  }
  emit("emitClick");
};
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
  height: 0.32rem;
  font-size: 0.14rem;
  font-weight: 600;
  border: 1px solid var(--color-green);
  color: var(--color-green);
  border-radius: 0.08rem;
  outline: none;
  cursor: pointer;
  &.btn--primary {
    background: var(--color-green);
    color: #fff;

    &.disabled {
      cursor: not-allowed;
      background-color: rgba(0, 175, 124, 0.6);
      color: var(--color-content__6);
      border-color: transparent;
    }
    &.final {
      cursor: not-allowed;
      color: var(--color-green);
      background: #333333;
      border: 1px solid #333333;
    }
  }
}
.loading {
  margin-left: 0.1rem;
  animation: rotate 3s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
