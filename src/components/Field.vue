<template>
  <div class="field">
    <img v-if="icon" class="field__icon" :src="icon" alt="" />
    <div class="field__label">{{ label }}</div>
    <div class="field__value g-font-num-mid">
      <span v-if="val">{{ val }}</span>
      <template v-else>
        <span>{{ from }}</span>
        <template v-if="from !== countTo">
          <img
            class="field__value__to"
            src="../assets/images/arrow-right.svg"
            alt="countTo"
          />
          <span>{{ countTo }}</span>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  icon: { type: String, require: false, default: "" },
  label: { type: String, require: true },
  val: { type: [String, Number], require: false, default: "" },
  from: { type: [String, Number], require: false, default: "-" },
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
.field {
  display: flex;
  text-align: left;

  & > * {
    align-self: center;
  }

  & + & {
    margin-top: 0.14rem;
    border-top: var(--border-common);
    padding-top: 0.14rem;
  }

  @media (max-width: 750px) {
    & + & {
      margin-top: 0.22rem;
      padding-top: 0.22rem;
    }
  }
}

.field__icon {
  height: 0.32rem;
  @media (max-width: 750px) {
    height: 0.52rem;
  }
}

.field__label {
  flex: 1;
  margin-left: 0.1rem;
  font-size: 0.14rem;
  line-height: 0.2rem;
  font-weight: 600;
  color: var(--color-content__6);
  @media (max-width: 750px) {
    margin-left: 0.16rem;
    font-size: 0.26rem;
    line-height: 0.32rem;
  }
}

.field__value {
  font-size: 0.14rem;
  line-height: 0.18rem;

  span {
    vertical-align: middle;
  }

  @media (max-width: 750px) {
    font-size: 0.26rem;
    line-height: 0.26rem;
  }
}

.field__value__to {
  margin: 0 0.1rem;
  vertical-align: middle;
  width: 0.14rem;
  @media (max-width: 750px) {
    margin: 0 0.16rem;
    width: 0.22rem;
  }
}
</style>
