import {
  isGt,
  isLte,
  getIsInvalidInput,
  getFixed,
  getAmount,
} from "@/utils/count";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { FormStep, TokenFloat, ContractAddress } from "@/utils/enum";
import { useI18n } from "vue-i18n";
import { sendETHTransaction } from "@/utils/contract";
import { InsureWithdrawAbi } from "@/utils/abi";
import { ElNotification } from "element-plus";

const useInsureWithdrawForm = (info) => {
  const { t } = useI18n();
  const hash = ref("");
  const step = ref(FormStep.Form);
  const withdrawAmount = ref("");
  const store = useStore();

  const useClient = computed(() => store.state.useClient);
  const userAddress = computed(() => store.state.userAddress);

  const maxAmount = computed(() => {
    if (isLte(info.insuranceBalance, "0")) {
      return "0";
    }
    return info.insuranceBalance;
  });

  const withdrewDisableLabel = computed(() => {
    if (getIsInvalidInput(withdrawAmount.value)) {
      return t("withdraw");
    }
    if (isGt(withdrawAmount.value, maxAmount.value)) {
      return t("no_funds");
    }
    return "";
  });

  const emitWithdraw = async () => {
    const amount = getFixed(withdrawAmount.value, TokenFloat[info.name]);
    step.value = FormStep.Pending;
    try {
      hash.value = await sendETHTransaction(
        useClient.value,
        userAddress.value,
        ContractAddress.INSURANCE_POOL,
        JSON.parse(InsureWithdrawAbi),
        [getAmount(amount, info.name), userAddress.value],
        false
      );
      step.value = FormStep.Success;
    } catch (error) {
      step.value = FormStep.Failed;
      ElNotification.error(t("translation_failed"));
    }
  };

  return {
    hash,
    step,
    withdrawAmount,
    maxAmount,
    withdrewDisableLabel,
    emitWithdraw,
  };
};

export default useInsureWithdrawForm;
