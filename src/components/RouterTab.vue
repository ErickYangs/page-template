<template>
  <div class="router-tab">
    <slot />
  </div>
  <RouterView #="{ Component, route }">
    <KeepAlive :include="keepAlive || []">
      <Component :is="Component" :key="route.fullpath" />
    </KeepAlive>
  </RouterView>
</template>

<script setup>
defineProps({
  keepAlive: {
    type: Array,
    require: false,
    default: [],
  },
});
// defineProps<{
//   keepAlive?: string[];
// }>();
</script>

<style lang="scss" scoped>
.router-tab {
  border-radius: 0.08rem;
  background-color: #000;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
