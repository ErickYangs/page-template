<template>
  <div
    @click="router.push(link)"
    class="horizontal_item"
    :class="{
      active: route.meta.activeLabel === routeName,
    }"
  >
    {{ label }}
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

defineProps({
  label: { type: String },
  link: { type: String },
  routeName: { type: String },
  exact: { type: Boolean, require: false, default: false },
});
</script>

<style lang="scss" scoped>
.horizontal_item {
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
</style>
