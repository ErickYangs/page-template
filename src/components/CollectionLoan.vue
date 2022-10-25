<template>
  <common-card-inner class="m-back-color">
    <div class="loan">
      <div class="nft-icon">
        <img :src="info.nftItem" alt="" />
      </div>
      <div class="loan-action">
        <div class="loan-info">
          <div>
            <div class="loan-info__title">{{ t("item_name") }}</div>
            <div class="loan-info__name">{{ info.itemName }}</div>
          </div>
          <div>
            <div class="loan-info__title">{{ t("token_id") }}</div>
            <div class="loan-info__name g-font-num-mid">{{ info.tokenID }}</div>
          </div>
          <div>
            <div class="loan-info__title">{{ t("collection") }}</div>
            <div class="loan-info__name">{{ info.collection }}</div>
          </div>
          <div>
            <div class="loan-info__title">{{ t("collateral_ratio") }}</div>
            <div class="loan-info__name g-font-num-mid">
              {{ getPercentLabel(info.collateralRatio) }}
            </div>
          </div>
          <div>
            <div class="loan-info__title">{{ t("liquidation_price") }}</div>
            <div class="loan-info__name g-font-num-mid">
              {{ getFixedFloor(info.liquidationPrice) }} ETH
            </div>
          </div>
          <div>
            <div class="loan-info__title">{{ t("floor_price") }}</div>
            <div class="loan-info__name g-font-num-mid">
              {{ getFixedFloor(info.floorPrice) }} ETH
            </div>
          </div>
          <div>
            <div class="loan-info__title">{{ t("borrow_apr") }}</div>
            <div class="loan-info__name g-font-num-mid">
              {{ getPercentLabel(info.borrowApr) }}
            </div>
          </div>
          <div>
            <div class="loan-info__title">{{ t("available_to_borrow") }}</div>
            <div class="loan-info__name g-font-num-mid">
              {{ getFixedFloor(info.availableBorrow) }} ETH
            </div>
          </div>
          <div>
            <div class="loan-info__title">{{ t("health_factor") }}</div>
            <div class="loan-info__name g-font-num-mid">
              <FieldCountTo
                :from="getPercentLabel(info.healthFactor)"
                :to="getPercentLabel(factorTo)"
              />
            </div>
          </div>
        </div>
        <div>
          <div class="label">{{ t("borrow_amount") }}</div>
          <InputUnit
            v-model="amount"
            :label="t('max')"
            :coin="'ETH'"
            :max="info.availableBorrow"
          />
          <div class="balance">
            {{ t("available_to_borrow") }}
            <span class="g-font-num-mid"> {{ info.availableBorrow }} ETH </span>
          </div>
        </div>
      </div>
    </div>
  </common-card-inner>
</template>

<script setup>
import CommonCardInner from "@/components/CommonCardInner.vue";
import InputUnit from "@/components/InputUnit.vue";
import { ref, watchEffect, computed } from "vue";
import FieldCountTo from "./FieldCountTo.vue";
import { useI18n } from "vue-i18n";
import { getPercentLabel } from "@/utils/format";
import { getFixedFloor, getPlus } from "@/utils/count";

const props = defineProps({
  info: {
    type: Object,
    require: true,
    default: {},
  },
});
const emits = defineEmits(["update:modelValue", "update:healthFactorTo"]);

const { t } = useI18n();

const amount = ref("");

const factorTo = computed(() => {
  // 总债务/NFT地板价
  // 总债务+amount/NFT地板价
  return getPlus("0.01", "0.1");
  // return getPlus(props.info.healthFactorTo, 0.1);
});

watchEffect(() => {
  if (amount.value) {
    emits("update:modelValue", amount.value);
    emits("update:healthFactorTo", factorTo.value);
  }
});
</script>

<style lang="scss" scoped>
.loan {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.loan + .loan {
  margin-top: 0.2rem;
}
.loan-action {
  flex: 1;
}
.nft-icon {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 0.08rem;
  // background-color: #00af7c;
  margin-right: 0.4rem;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.loan-info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 0.2rem;
  grid-row-gap: 0.1rem;
  margin-bottom: 0.2rem;
  &__title {
    font-weight: 600;
    color: var(--color-content);
    margin-bottom: 0.02rem;
  }
  &__name {
    font-size: 0.18rem;
    line-height: 0.32rem;
  }
}
.label {
  font-weight: 600;
  color: var(--color-content);
}
.balance {
  text-align: right;
  margin-top: 0.1rem;
  color: var(--color-content__6);
  font-weight: 600;
  span {
    color: var(--color-base);
    margin-left: 0.04rem;
  }
}
</style>
