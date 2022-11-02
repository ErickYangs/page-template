<template>
  <div class="mb-header">
    <img @click="router.push('/')" src="../assets/images/s_logo.svg" alt="" />
    <img @click="drawer = true" src="../assets/images/nav_line.svg" alt="" />
  </div>
</template>

<script setup>
import { ElDrawer } from "element-plus";
import { ref } from "vue";
import { useRouter } from "vue-router";
import nav from "./nav.json";

const router = useRouter();
const drawer = ref(false);
</script>

<style lang="scss" scoped>
.mb-header {
  height: 16vw;
  padding: 5.3333vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #08112c;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 8;
}
.nav-action {
  padding-top: 18.6667vw;
}
</style>
