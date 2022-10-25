<template>
  <CommonStep :hash="hash" :step="step">
    <div>
      <CoinTitle :label="t('claim_earning')" />
      <div class="claim-form">
        <div class="claim-form__title">{{ t("total_wing_earned") }}</div>
        <div class="g-font-num-mid">
          {{ userData.totalWingEarned }}
        </div>
        <div class="btn-group">
          <CommonButton
            :label="t('confirm')"
            :disabled="disabled"
            type="submit"
            @click="emitConfirm"
          ></CommonButton>
          <CommonButton
            class="cancel"
            :label="t('cancel')"
            type="primary"
            @click="emitCancel"
          ></CommonButton>
        </div>
      </div>
    </div>
  </CommonStep>
</template>

<script setup>
import CommonStep from "@/components/CommonStep/CommonStep.vue";
import CommonButton from "@/components/CommonButton.vue";
import CoinTitle from "@/components/CoinTitle.vue";
import useClaimEarn from "./useClaimEarn";
import { getDollarLabel } from "@/utils/format";
import { useI18n } from "vue-i18n";

const props = defineProps({
  userData: {
    type: Object,
    require: true,
    default: {},
  },
});

const emits = defineEmits(["cancel"]);

const { t } = useI18n();

const { hash, step, disabled, emitConfirm } = useClaimEarn(props.userData);

const emitCancel = () => {
  emits("cancel");
};
</script>

<style lang="scss" scoped>
.claim-form {
  padding-top: 0.6rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  &__title {
    font-size: 0.16rem;
    line-height: 0.2rem;
    color: var(--color-content__6);
  }
}
.g-font-num-mid {
  margin: 0.08rem 0 0.6rem;
  font-size: 0.24rem;
  line-height: 0.32rem;
}
.btn-group {
  width: 100%;
  .cancel.button {
    margin-top: 0.2rem;
    padding: 0.17rem 0.2rem;
    &:hover {
      background: transparent;
      color: var(--color-green);
    }
  }
  :deep(.button) {
    width: 100%;
    text-align: center;
  }
}
</style>
