<template>
  <div class="step_child">
    <div class="step_child__img">
      <img
        class="no_active"
        v-if="active < activeIndex"
        src="../assets/images/no_active.svg"
        alt=""
      />
      <img
        class="processing"
        v-if="active === activeIndex"
        src="../assets/images/current_step.svg"
        alt=""
      />
      <img
        class="active"
        v-if="active > activeIndex"
        src="../assets/images/step_active.svg"
        alt=""
      />
      <div
        class="line"
        :class="{
          active: active > activeIndex,
        }"
        v-if="line"
      ></div>
    </div>
    <div
      v-if="label"
      class="step_child__title"
      :class="{
        processing: active === activeIndex,
        active: active > activeIndex,
      }"
    >
      {{ label }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    require: false,
    default: "",
  },
  line: {
    type: Boolean,
    default: true,
  },
  activeIndex: {
    type: Number,
    require: true,
  },
  active: {
    type: Number,
    require: true,
  },
});
</script>

<style lang="scss" scoped>
.step_child {
  flex: 1;
  &__img {
    position: relative;
    z-index: 1;
    text-align: center;
    img {
      position: relative;
      z-index: 2;
    }
  }
  &__title {
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 0.1rem;
    font-weight: 600;
    &.processing {
      color: var(--color-green);
    }
    &.active {
      color: var(--color-base);
    }
  }
  .line {
    position: absolute;
    width: 100%;
    left: 50%;
    top: 50%;
    height: 0.02rem;
    background: #5c5c5c;
    z-index: 1;
    &.active {
      background: var(--color-base);
    }
  }
}
</style>
