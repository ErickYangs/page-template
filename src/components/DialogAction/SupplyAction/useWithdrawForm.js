import {
  isLte,
  isGt,
  getIsInvalidInput,
  getFixed,
  getAmount,
} from "@/utils/count";
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
import { WithdrawETHAbi } from "@/utils/abi";
import { ElNotification } from "element-plus";

const useWithdrawForm = (info) => {
  const { t } = useI18n();
  const hash = ref("");
  const step = ref(FormStep.Form);
  const withdrawAmount = ref("");
  const approveTime = ref(null);
  const isApprove = ref(false);
  const store = useStore();

  const useClient = computed(() => store.state.useClient);
  const userAddress = computed(() => store.state.userAddress);

  const maxAmount = computed(() => {
    if (isLte(info.suppliedBalance, "0")) {
      return "0";
    }
    return info.suppliedBalance;
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
        ContractAddress.WETHGateway,
        JSON.parse(WithdrawETHAbi),
        "0",
        true,
        [getAmount(amount, info.name), userAddress.value]
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
      ContractAddress.BWETH,
      ContractAddress.WETHGateway
    );
    console.log("result", result);
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
        ContractAddress.BWETH,
        ContractAddress.WETHGateway
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
    withdrawAmount,
    isApprove,
    maxAmount,
    withdrewDisableLabel,
    emitWithdraw,
    emitApprove,
  };
};

export default useWithdrawForm;
