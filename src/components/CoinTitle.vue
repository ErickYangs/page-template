<template>
  <div class="coin-title" :class="{ normal: !icon }">
    <img v-if="icon" class="icon" :src="icon" :alt="label" />
    <span class="label">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  icon: { type: String, required: false, default: "" },
});
</script>

<style lang="scss" scoped>
.coin-title {
  text-align: center;
  line-height: 0.24rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #333;

  &.normal {
    text-align: left;
  }

  @media (max-width: 750px) {
    line-height: 0.38rem;
    padding-bottom: 0.32rem;
  }
}

.icon {
  vertical-align: middle;
  margin-right: 0.1rem;
  width: 0.24rem;
  @media (max-width: 750px) {
    margin-right: 0.16rem;
    width: 0.38rem;
  }
}

.label {
  vertical-align: middle;
  font-size: 0.18rem;
  font-weight: 600;
  @media (max-width: 750px) {
    font-size: 0.28rem;
  }
}
</style>
