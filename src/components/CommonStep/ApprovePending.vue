<template>
  <div class="pending">
    <CoinTitle :label="t('approve')" />
    <Loading class="loading" />
    <div class="tip">{{ t("approve_pending") }}</div>
  </div>
</template>

<script setup>
import Loading from "@/components/Loading.vue";
import CoinTitle from "@/components/CoinTitle.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.pending {
  text-align: center;
}

.loading {
  margin-top: 0.6rem;
}

.tip {
  margin: 0.2rem 0 0.3rem 0;
  font-size: 0.16rem;
  line-height: 0.22rem;
  color: var(--color-des);
}
</style>
