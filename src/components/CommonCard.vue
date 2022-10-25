<template>
  <div class="g-card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.g-card + .g-card {
  margin-top: 0.3rem;
}
</style>
