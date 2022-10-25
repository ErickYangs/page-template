<template>
  <CommonStep :hash="hash" :step="step">
    <div>
      <CoinTitle :label="t('place_bid')" />
      <div class="form">
        <div class="nft-icon">
          <img src="" alt="" />
        </div>
        <div class="form-info">
          <div class="nft-title">Bored Ape Yacht Club</div>
          <div class="form-cell info-list">
            <InfoLabel :label="t('token_id')" :balance="nftInfo.token_id" />
            <InfoLabel
              :label="t('floor_price')"
              :balance="nftInfo.floor_price"
            />
            <InfoLabel
              :label="t('highest_bid_price')"
              :balance="nftInfo.highest_bid"
            />
            <InfoLabel
              :label="t('minimum_bid_price')"
              :balance="minAmount"
              :content="t('minimum_desc')"
            />
            <InfoLabel
              :label="t('liquidation_time')"
              :balance="nftInfo.liquidation_time"
            />
          </div>
          <div class="form-cell">
            <div class="label">{{ t("price") }}</div>
            <InputUnit
              v-model="placeAmount"
              :label="t('max')"
              :coin="nftInfo.name"
              :max="maxAmount"
            />
            <div class="wallet-balance">
              <span>{{ t("balance") }}:</span>
              <i class="g-font-num-mid">{{ nftInfo.walletBalance }}</i>
            </div>
          </div>
          <div class="form-cell">
            <CommonButton
              :label="placeBidDisableLabel || t('place_bid')"
              :disabled="placeBidDisableLabel.length > 0"
              type="submit"
              @click="emitPlace"
            ></CommonButton>
          </div>
        </div>
      </div>
    </div>
  </CommonStep>
</template>

<script setup>
import CommonStep from "@/components/CommonStep/CommonStep.vue";
import CommonButton from "@/components/CommonButton.vue";
import InputUnit from "@/components/InputUnit.vue";
import CoinTitle from "@/components/CoinTitle.vue";
import InfoLabel from "@/components/InfoLabel.vue";
import { ref, computed } from "vue";
import { DEBT_PERCENT, FormStep } from "@/utils/enum";
import { useI18n } from "vue-i18n";
import {
  getTimes,
  getPlus,
  getIsInvalidInput,
  isLte,
  isLt,
  isGt,
  getAmount,
} from "@/utils/count";

const { t } = useI18n();
const hash = ref("");
const step = ref(FormStep.Form);
const placeAmount = ref("");

const nftInfo = ref({
  name: "ETH",
  token_id: "#!11",
  floor_price: "1.1111",
  highest_bid: "1233",
  liquidation_time: "2022-06-01 20:00",
  walletBalance: "0.3",
  debt: "0.2",
});
const emitPlace = () => {};

const minAmount = computed(() => {
  return getPlus(
    getTimes(nftInfo.value.debt, DEBT_PERCENT),
    nftInfo.value.highest_bid
  );
});

const maxAmount = computed(() => {
  return nftInfo.value.walletBalance;
});

const placeBidDisableLabel = computed(() => {
  if (getIsInvalidInput(placeAmount.value)) {
    return t("place_bid");
  }
  if (isGt(placeAmount.value, maxAmount.value)) {
    return t("no_funds");
  }
  if (isLt(placeAmount.value, minAmount.value)) {
    return t("no_funds_place");
  }
  return "";
});
</script>

<style lang="scss" scoped>
.form {
  padding-top: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.nft-icon {
  width: 2rem;
  margin-right: 0.4rem;
  img {
    display: block;
    width: 2rem;
    height: 2rem;
    background: rgba(0, 175, 124, 0.3);
    border-radius: 0.08rem;
  }
}
.label {
  font-weight: 600;
  color: var(--color-content);
}
.form-cell {
  margin-bottom: 0.4rem;
}
.wallet-balance {
  font-weight: 600;
  text-align: right;
  span {
    color: var(--color-content);
    margin-right: 0.04rem;
  }
}
i {
  font-style: inherit;
}

.nft-title {
  font-size: 0.18rem;
  font-weight: 600;
  line-height: 0.26rem;
  margin-bottom: 0.2rem;
}
</style>
