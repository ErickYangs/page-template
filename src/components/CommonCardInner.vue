<template>
  <div class="g-card__inner">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.g-card__inner + .g-card__inner {
  margin-top: 0.3rem;
}
</style>
