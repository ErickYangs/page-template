<template>
  <div class="btn-group" :class="{ center }">
    <button
      class="g-clickable btn btn--primary"
      :class="{ disabled: cancelDisabled }"
      type="button"
      :disabled="cancelDisabled"
      @click="emitCancel"
    >
      {{ cancelLabel || t("cancel") }}
    </button>
    <button
      class="g-clickable btn btn--primary"
      :class="{ disabled }"
      type="button"
      :disabled="disabled"
      @click="emitConfirm"
    >
      {{ confirmLabel || t("confirm") }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const props = defineProps({
  confirmLabel: { type: String, required: false },
  cancelLabel: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false }, // confirmDisabled
  cancelDisabled: { type: Boolean, required: false, default: false },
  center: { type: Boolean, required: false, default: false },
  back: { type: Boolean, required: false, default: false },
});

const emit = defineEmits(["cancel", "confirm"]);

const { t } = useI18n();
const { go } = useRouter();

const emitCancel = () => {
  emit("cancel");
  if (props.back) {
    console.log("cancel");
    go(-1);
  }
};

const emitConfirm = () => {
  if (props.disabled) {
    return;
  }
  emit("confirm");
};
</script>

<style lang="scss" scoped>
.btn-group {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.14rem;

  &.center {
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(button) {
      width: 1.2rem;
    }
  }
}

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

  &.disabled {
    color: #979797;
    border-color: #979797;
    cursor: not-allowed;
  }

  &.btn--primary {
    background: var(--color-green);
    color: #fff;

    &.disabled {
      background: #979797;
      color: #fff;
      border-color: #979797;
    }
  }
}
</style>
