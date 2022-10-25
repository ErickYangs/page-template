<template>
  <div class="field-group">
    <div v-if="title" class="title">
      {{ title }}
      <ElPopover
        v-if="content"
        placement="top-end"
        width="244"
        trigger="hover"
        :content="content"
      >
        <template #reference>
          <img class="label__icon" src="../assets/images/tip.svg" alt="tip" />
        </template>
      </ElPopover>
    </div>
    <div class="box">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, require: true },
  content: { type: String, require: false, default: "" },
});
</script>

<style lang="scss" scoped>
.field-group {
  margin-top: 0.24rem;
  @media (max-width: 750px) {
    margin-top: 0.38rem;
  }
}

.title {
  margin-bottom: 0.1rem;
  font-size: 0.12rem;
  line-height: 0.18rem;
  font-weight: 600;
  color: var(--color-content);
  @media (max-width: 750px) {
    margin-bottom: 0.16rem;
    font-size: 0.24rem;
    line-height: 0.28rem;
  }
}

.box {
  padding: 0.14rem 0.16rem;
  border-radius: 0.08rem;
  border: var(--border-common);
  background: rgba(255, 255, 255, 0.04);
  @media (max-width: 750px) {
    padding: 0.22rem 0.26rem;
    border-radius: 0.12rem;
  }
}
</style>
