import { isGt,isLte, getIsInvalidInput, getFixed, getAmount } from "@/utils/count";
import { useStore } from "vuex";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import {
  FormStep,
  TokenFloat,
  ContractAddress,
  DefaultTimer,
} from "@/utils/enum";
import { useI18n } from "vue-i18n";
import {
  sendETHTransaction,
  approveCheck,
  approveAction,
} from "@/utils/contract";
import { InsureAbi } from "@/utils/abi";
import { ElNotification } from "element-plus";

const useInsureForm = (info) => {
  const { t } = useI18n();
  const hash = ref("");
  const step = ref(FormStep.Form);
  const insureAmount = ref("");
  const approveTime = ref(null);
  const isApprove = ref(false);
  const store = useStore();

  const useClient = computed(() => store.state.useClient);
  const userAddress = computed(() => store.state.userAddress);

  const maxAmount = computed(() => {
    if (isLte(info.walletBalance, "0")) {
      return "0";
    }
    return info.walletBalance;
  });

  const insureDisableLabel = computed(() => {
    if (getIsInvalidInput(insureAmount.value)) {
      return t("insure");
    }
    if (isGt(insureAmount.value, maxAmount.value)) {
      return t("no_funds");
    }
    return "";
  });

  const emitInsure = async () => {
    const amount = getFixed(insureAmount.value, TokenFloat[info.name]);
    step.value = FormStep.Pending;
    try {
      hash.value = await sendETHTransaction(
        useClient.value,
        userAddress.value,
        ContractAddress.INSURANCE_POOL,
        JSON.parse(InsureAbi),
        [getAmount(amount, info.name), userAddress.value, "0"],
        false
      );
      step.value = FormStep.Success;
    } catch (error) {
      step.value = FormStep.Failed;
      ElNotification.error(t("translation_failed"));
    }
  };

  const emitApproveCheck = async () => {
    const result = await approveCheck(
      useClient.value,
      userAddress.value,
      ContractAddress.WING,
      ContractAddress.INSURANCE_POOL,
      TokenFloat.WING
    );
    if (result.flag) {
      clearInterval(approveTime.value);
      isApprove.value = true;
    }
  };

  const emitApprove = async () => {
    try {
      step.value = FormStep.Pending;
      const result = await approveAction(
        useClient.value,
        userAddress.value,
        ContractAddress.WING,
        ContractAddress.INSURANCE_POOL,
        TokenFloat.WING
      );
      if (result.tx.transactionHash) {
        ElNotification.success(t("approve_success"));
      } else {
        ElNotification.error(t("approve_fail"));
      }
      step.value = FormStep.Form;
    } catch (error) {
      step.value = FormStep.Form;
      ElNotification.error(t("approve_fail"));
    }
  };

  onMounted(() => {
    emitApproveCheck();
    clearInterval(approveTime.value);

    approveTime.value = setInterval(() => {
      emitApproveCheck();
    }, DefaultTimer);
  });

  onBeforeUnmount(() => {
    clearInterval(approveTime.value);
  });

  return {
    hash,
    step,
    insureAmount,
    isApprove,
    maxAmount,
    insureDisableLabel,
    emitInsure,
    emitApprove,
  };
};

export default useInsureForm;
