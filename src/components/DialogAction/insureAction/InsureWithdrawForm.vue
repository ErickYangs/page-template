<template>
  <CommonStep :hash="hash" :step="step">
    <div>
      <CoinTitle :label="`${t('withdraw')} ${info.name}`" />
      <div class="form">
        <div class="form-cell">
          <div class="label">{{ t("amount") }}</div>
          <InputUnit
            v-model="withdrawAmount"
            :label="t('max')"
            :coin="info.name"
            :max="maxAmount"
          />
          <div class="balance">
            <span>{{ t("balance") }}:</span>
            <i class="g-font-num-mid">{{ info.insuranceBalance }}</i>
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
            :label="withdrewDisableLabel || t('withdraw')"
            type="submit"
            :disabled="withdrewDisableLabel.length > 0"
            @click="emitWithdraw"
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
import useInsureWithdrawForm from "./useInsureWithdrawForm";
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
  withdrawAmount,
  maxAmount,
  withdrewDisableLabel,
  emitWithdraw,
} = useInsureWithdrawForm(props.info);
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
