<template>
  <div class="nav">
    <div class="nav__item_lang" v-for="(item, index) in list" :key="index">
      <nav-item :info="item"></nav-item>
    </div>
    <!-- <div class="nav__item_lang">
      <Lang></Lang>
    </div> -->
  </div>
</template>

<script setup>
import NavItem from './NavItem.vue';
defineProps({
  list: Array
})
</script>

<style lang="scss" scoped>
.nav {
  height: 80px;
  line-height: 80px;
}

.nav__item,
.nav__item_lang {
  display: inline-block;
  font-size: 14px;
  color: #FFF;
  opacity: .6;
  text-decoration: none;
  outline: none;
  transition: opacity .3s;

  &+& {
    margin-left: 40px;
  }

  &.active {
    opacity: 1;
  }

  &:not(.active) {

    &:focus,
    &:hover {
      opacity: 1;
    }
  }
}

.nav__item_lang {
  opacity: 1;
}
</style>
