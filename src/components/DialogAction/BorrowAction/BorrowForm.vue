<template>
  <CommonStep :hash="hash" :step="step">
    <div>
      <CoinTitle :label="'Borrow ETH'" />
      <div class="form">
        <div class="form-cell">
          <div class="label">{{ t("amount") }}</div>
          <InputUnit
            v-model="borrowAmount"
            :label="t('max')"
            :coin="'ETH'"
            :max="maxAmount"
          />
          <div class="balance">
            <span>{{ t("balance") }}:</span>
            <i class="g-font-num-mid">{{ 0.121321 }}</i>
          </div>
        </div>
        <div class="form-cell">
          <FieldGroup :title="t('transaction_overview')">
            <Field :label="t('borrow_apy')" :from="'30.00%'" />
            <Field :label="t('reward_apr')" :from="'0.05%'" />
          </FieldGroup>
        </div>
        <div class="form-cell">
          <CommonButton
            :label="t('borrow')"
            type="submit"
            @click="emitBorrow"
          ></CommonButton>
        </div>
        <div>
          <div class="more">{{ t("need_to_borrow_more") }}</div>
          <span class="link">{{ t("go_collate_nft") }}</span>
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
import { ref } from "vue";
import { FormStep } from "@/utils/enum";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const hash = ref("");
const step = ref(FormStep.Form);
const borrowAmount = ref("");
const maxAmount = ref("10000");
const emitBorrow = () => {};
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
.more {
  font-weight: 600;
  color: var(--color-content__6);
  margin-bottom: 0.02rem;
}
.link {
  cursor: pointer;
  color: var(--color-green);
  text-decoration: underline;
}
</style>
