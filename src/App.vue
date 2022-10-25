<template>
  <MbHeader v-if="isMobile" />
  <PcHeader v-else />
  <router-view />
  <Footer />
</template>
<script setup>
import Footer from "./view/Footer.vue";
import PcHeader from "./view/PcHeader.vue";
import MbHeader from "./view/MbHeader.vue";
import useIsMobile from "@/utils/useIsMobile";
const isMobile = useIsMobile();
</script>

<style lang="scss" scoped></style>
