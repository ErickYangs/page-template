<template>
  <div class="no-link-wallet">
    <div v-t="'connect_your_wallet'" />
    <img src="../assets/images/no_wallet.svg" alt="" />
  </div>
</template>

<style lang="scss" scoped>
.no-link-wallet {
  padding-top: 0.6rem;
  font-size: 0.16rem;
  color: var(--color-content__6);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 0.22rem;
    margin-left: 0.1rem;
  }
}
</style>
