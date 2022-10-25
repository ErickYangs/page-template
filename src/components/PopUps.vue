<template>
  <div class="pop-ups">
    <div class="pop-ups__content g-font-num">
      {{ label }}
      <img :src="icon" alt="" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  icon: {
    type: String,
    required: false,
    default: "https://app.ont.io/wing/wing_icon.svg",
  },
});
</script>

<style lang="scss" scoped>
.pop-ups {
  min-width: 0.82rem;
  font-size: 0.14rem;
  height: 0.26rem;
  line-height: 0.16rem;
  display: inline-block;
  padding: 0.04rem 0.08rem;
  border-radius: 0.08rem;
  border: 1px solid rgba(255, 255, 255, 0.6);

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: translateY(-0.01rem);
  }
  img {
    width: 0.18rem;
    height: 0.18rem;
    border-radius: 50%;
    background: #fff;
    margin-left: 0.04rem;
  }
}
</style>
