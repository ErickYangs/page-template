<template>
  <div class="input-unit">
    <input
      class="g-font-num-mid input"
      v-model="bindValue"
      type="text"
      placeholder="0"
      @input="handleInput"
      @change="handleInput"
    />
    <div class="input-unit__coin">
      {{ coin }}
    </div>
    <div
      class="label"
      tabIndex="0"
      role="button"
      :aria-label="label"
      @click="useMax"
    >
      {{ label }}
    </div>
  </div>
</template>

<script setup>
import { isEq } from "@/utils/count";
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    require: true,
    default: "",
  },
  label: {
    type: String,
    require: false,
    default: "",
  },
  coin: {
    type: String,
    require: false,
    default: "ETH",
  },
  max: {
    type: [String, Number],
    require: true,
    default: "",
  },
});

const emits = defineEmits(["update:modelValue"]);

const bindValue = ref(props.modelValue);

const emitChange = () => {
  emits("update:modelValue", bindValue.value);
};

const handleInput = () => {
  emitChange();
};

const useMax = () => {
  if (isEq(props.max, 0)) {
    bindValue.value = "";
    emits("update:modelValue", "");
    return;
  }
  bindValue.value = String(props.max);
  emits("update:modelValue", String(props.max));
};
</script>

<style lang="scss" scoped>
.input-unit {
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  position: relative;
  @media (max-width: 750px) {
    margin-top: 0.32rem;
    margin-bottom: 0.26rem;
  }
  &__coin {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0.76rem;
    font-size: 0.14rem;
    line-height: 0.2rem;
    color: #fff;
  }
}

.input {
  box-sizing: border-box;
  height: 0.56rem;
  width: 100%;
  padding: 0.1rem 1.1rem 0.1rem 0.2rem;
  line-height: 0.26rem;
  font-size: 0.26rem;
  border: 1px solid transparent;
  outline: none;
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-base);
  border-radius: 0.08rem;

  &:focus {
    border: 1px solid var(--color-green);
  }
  @media (max-width: 750px) {
    height: 0.9rem;
    font-size: 0.42rem;
    line-height: 0.42rem;
    padding: 0.16rem 1.4rem 0.16rem 0.32rem;
  }
}

.label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.02rem 0.08rem;
  right: 0.2rem;
  color: var(--color-green);
  background: rgba(0, 175, 124, 0.1);
  border-radius: 0.04rem;
  transition: opacity 0.3s;
  outline: none;
  max-width: 0.5rem;
  text-align: center;
  opacity: 1;
  cursor: pointer;
  @media (max-width: 750px) {
    right: 0.32rem;
    font-size: 0.26rem;
    max-width: 1.1rem;
  }
}
</style>
