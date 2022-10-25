<template>
  <div class="common-step">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.common-step {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & > div {
    flex: 1;
  }
}
</style>
