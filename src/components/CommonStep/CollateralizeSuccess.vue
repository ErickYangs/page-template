<template>
  <div class="pending">
    <CoinTitle :label="t('collateralize_nft')" />
    <img class="icon" src="../../assets/images/success.svg" alt="success" />
    <div class="tip">{{ t("collateralize_successful") }}</div>
    <div class="tip_sub">{{ t("collateralize_successful_tips") }}</div>
    <CommonButton type="submit" :label="t('borrow')" @click="goBorrow" />
  </div>
</template>

<script setup>
import CommonButton from "@/components/CommonButton.vue";
import CoinTitle from "@/components/CoinTitle.vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  hash: { type: String, required: true, default: "" },
});

const { t } = useI18n();

const goBorrow = () => {};
</script>

<style lang="scss" scoped>
.pending {
  text-align: center;
}

.icon {
  margin-top: 0.6rem;
  width: 0.8rem;
}

.tip {
  margin: 0.1rem 0 0.1rem 0;
  font-size: 0.18rem;
  line-height: 0.22rem;
}
.tip_sub {
  font-size: 0.16rem;
  line-height: 0.2rem;
  color: var(--color-des);
  margin-bottom: 0.4rem;
}
</style>
