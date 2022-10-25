<template>
  <div class="pending">
    <CoinTitle :label="t('transaction')" />
    <img class="icon" src="../../assets/images/success.svg" alt="success" />
    <div class="tip">{{ t("translation_sub") }}</div>
    <div class="tip_sub">{{ t("translation_sub_tip") }}</div>
    <CommonButton
      v-if="hash"
      type="link"
      :label="t('view_transaction')"
      @click="go2Explorer"
    />
  </div>
</template>

<script setup>
import CommonButton from "@/components/CommonButton.vue";
import CoinTitle from "@/components/CoinTitle.vue";
import { useI18n } from "vue-i18n";

// import dapp from '@/utils/dapp';

const props = defineProps({
  hash: { type: String, required: true, default: "" },
});

const { t } = useI18n();

const go2Explorer = () => {
  const url = import.meta.env.VITE_APP_EXPLORER.replace("[hash]", props.hash);
  window.open(url);
  // if (dapp.isOnto) {
  //   // eslint-disable-next-line no-restricted-globals
  //   location.href = url;
  // } else {
  //   window.open(url);
  // }
};
</script>

<style lang="scss" scoped>
.pending {
  text-align: center;
}

.icon {
  margin-top: 60px;
  width: 80px;
}

.tip {
  margin: 10px 0 10px 0;
  font-size: 16px;
  line-height: 22px;
}
.tip_sub {
  font-size: 12px;
  line-height: 18px;
  color: var(--color-des);
  margin-bottom: 10px;
}
</style>
