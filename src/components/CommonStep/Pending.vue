<template>
  <div class="pending">
    <CoinTitle :label="t('transaction_pending')" />
    <Loading class="loading" />
    <div class="tip">{{ t("translation_broadcast") }}</div>
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
  margin-top: 60px;
}

.tip {
  margin: 20px 0 30px 0;
  font-size: 16px;
  line-height: 22px;
  color: var(--color-des);
}
</style>
