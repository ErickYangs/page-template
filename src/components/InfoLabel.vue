<template>
  <div class="balance">
    <div class="balance__label">
      {{ label }}

      <ElPopover
        v-if="content"
        placement="top-end"
        width="244px"
        trigger="hover"
        :content="content"
      >
        <template #reference>
          <img class="label__icon" src="../assets/images/tip.svg" alt="tip" />
        </template>
      </ElPopover>
    </div>
    <div v-if="coin">{{ `${balance} ${coin}` }}</div>
    <div v-else>{{ balance }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: false,
  },
  balance: {
    type: [String, Number],
    require: true,
  },
  coin: {
    type: String,
    require: false,
  },
});
</script>

<style lang="scss" scoped>
.balance {
  margin-top: 0.2rem;
  display: flex;
  font-size: 0.14rem;
  line-height: 0.2rem;
  font-weight: 600;

  & + & {
    margin-top: 0.2rem;
  }
  @media (max-width: 750px) {
    margin-top: 0.32rem;
    font-size: 0.26rem;
    line-height: 0.32rem;
    & + & {
      margin-top: 0.16rem;
    }
  }
}

.balance__label {
  flex: 1;
  color: var(--color-content__6);
}
</style>
