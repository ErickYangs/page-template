<template>
  <nav class="nav">
    <RouterLink
      v-t="'overview'"
      class="nav__item g-font-mid g-clickable"
      to="/"
    />
    <RouterLink
      v-t="'supply'"
      class="nav__item g-font-mid g-clickable"
      to="/supply"
    />
    <RouterLink
      v-t="'borrow'"
      class="nav__item g-font-mid g-clickable"
      to="/borrow"
    />
    <RouterLink
      v-t="'nft'"
      class="nav__item g-font-mid g-clickable"
      to="/nft"
    />
    <RouterLink
      v-t="'auction'"
      class="nav__item g-font-mid g-clickable"
      to="/auction"
    />
    <!-- <RouterLink
      v-t="'auction'"
      class="nav__item g-font-mid g-clickable"
      to="/test"
    /> -->
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  width: 100%;
  background: var(--gray-background);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.08rem;
  a {
    flex: 1;
  }
}
.nav__item {
  font-size: 0.18rem;
  height: 0.6rem;
  line-height: 0.6rem;
  font-weight: 600;
  color: var(--color-des);
  text-decoration: none;
  text-align: center;
  border-radius: 0.08rem;

  &.router-link-active {
    // color: var(--color-green);
    color: var(--color-base);
    background: var(--color-green);
  }
}
</style>
