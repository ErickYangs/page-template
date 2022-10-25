<template>
  <CommonStep :hash="hash" :step="step">
    <div>
      <CoinTitle :label="`${t('insure')} ${info.name}`" />
      <div class="form">
        <div class="form-cell">
          <div class="label">{{ t("amount") }}</div>
          <InputUnit
            v-model="insureAmount"
            :label="t('max')"
            :coin="info.name"
            :max="maxAmount"
          />
          <div class="balance">
            <span>{{ t("balance") }}:</span>
            <i class="g-font-num-mid">{{ info.walletBalance }}</i>
          </div>
        </div>
        <div class="form-cell">
          <FieldGroup :title="t('transaction_overview')">
            <Field
              :label="t('reward_apr')"
              :from="getPercentLabel(info.wingRewardApr)"
            />
          </FieldGroup>
        </div>
        <div>
          <CommonButton
            v-if="!isApprove"
            :label="t('approve')"
            type="submit"
            @click="emitApprove"
          ></CommonButton>
          <CommonButton
            v-else
            :label="insureDisableLabel || t('insure')"
            type="submit"
            :disabled="insureDisableLabel.length > 0"
            @click="emitInsure"
          ></CommonButton>
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
import Field from "@/components/Field.vue";
import FieldGroup from "@/components/FieldGroup.vue";
import useInsureForm from "./useInsureForm.js";
import { useI18n } from "vue-i18n";
import { getPercentLabel } from "@/utils/format";
const props = defineProps({
  info: {
    type: Object,
    require: true,
    default: {},
  },
});

const { t } = useI18n();

const {
  hash,
  step,
  insureAmount,
  isApprove,
  maxAmount,
  insureDisableLabel,
  emitInsure,
  emitApprove,
} = useInsureForm(props.info);
</script>

<style lang="scss" scoped>
.form {
  padding-top: 0.4rem;
}
.label {
  font-weight: 600;
  color: var(--color-content);
}
.form-cell {
  margin-bottom: 0.4rem;
}
.balance {
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
</style>
