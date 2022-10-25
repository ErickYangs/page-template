<template>
  <SloganPage />
  <Introduce />
</template>

<script setup>
import { useI18n } from "vue-i18n";
import SloganPage from "./SloganPage.vue";
import Advantage from "./Advantage.vue";
import Introduce from './Introduce.vue'

const { t } = useI18n();
</script>

<style lang="scss" scoped></style>
