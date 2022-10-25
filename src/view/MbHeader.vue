<template>
  <div class="mb-header">
    <img @click="router.push('/')" src="../assets/images/s_logo.svg" alt="" />
    <img @click="drawer = true" src="../assets/images/nav_line.svg" alt="" />
  </div>
  <ElDrawer v-model="drawer" title="I am the title" :with-header="false">
    <div class="nav-action">
      <div class="close-img">
        <img
          src="../assets/images/close_btn.svg"
          @click="drawer = false"
          alt=""
        />
      </div>
      <div class="mb-nav">
        <MbNav v-for="item in nav.list" :key="item.t_key" :item="item" />
      </div>
    </div>
  </ElDrawer>
</template>

<script setup>
import { ElDrawer } from "element-plus";
import { ref } from "vue";
import { useRouter } from "vue-router";
import MbNav from "../components/MbNav/MbNav.vue";
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
