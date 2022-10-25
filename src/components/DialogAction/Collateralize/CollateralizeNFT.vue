<template>
  <CommonStep :hash="hash" :step="step">
    <div>
      <CoinTitle :label="t('collateralize_nft')" />
      <div class="form-info">
        <img class="nft-img" src="" alt="" />
        <div class="info-list">
          <InfoLabel :label="t('nft_item')" :balance="nftInfo.nft_name" />
          <InfoLabel :label="t('token_id')" :balance="nftInfo.token_id" />
          <InfoLabel :label="t('collection')" :balance="nftInfo.collection" />
          <InfoLabel :label="t('floor_price')" :balance="nftInfo.floor_price" />
          <InfoLabel
            :label="t('collateral_ratio')"
            :balance="nftInfo.collateral_ratio"
          />
        </div>
        <CommonButton
          :label="t('confirm')"
          class="info-btn"
          type="submit"
          @click="emitCollateralize"
        ></CommonButton>
      </div>
    </div>
  </CommonStep>
</template>

<script setup>
import CommonStep from "@/components/CommonStep/CommonStep.vue";
import CommonButton from "@/components/CommonButton.vue";
import CoinTitle from "@/components/CoinTitle.vue";
import InfoLabel from "@/components/InfoLabel.vue";

import { ref } from "vue";
import { FormStep } from "@/utils/enum";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const hash = ref("");
const step = ref(FormStep.Form);

const nftInfo = ref({
  nft_name: "Test",
  token_id: "#1212",
  collection: "Bored Ape Yacht Club",
  floor_price: "100 ETH",
  collateral_ratio: "40%",
});

const emitCollateralize = () => {};
</script>

<style lang="scss" scoped>
.form-info {
  width: 100%;
  padding-top: 0.4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.nft-img {
  width: 100%;
  height: 3.9rem;
  background: rgba(0, 175, 124, 0.3);
  border-radius: 0.08rem;
}
.info-list {
  width: 100%;
}
.info-btn {
  margin-top: 0.4rem;
}
</style>
