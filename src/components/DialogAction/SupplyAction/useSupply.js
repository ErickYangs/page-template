import {
  isLte,
  isGt,
  getMinus,
  getIsInvalidInput,
  getFixed,
  getAmount,
} from "@/utils/count";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import {
  FormStep,
  RESERVE_BALANCE,
  TokenFloat,
  ContractAddress,
} from "@/utils/enum";
import { useI18n } from "vue-i18n";
import { sendETHTransaction } from "@/utils/contract";
import { SupplyETHAbi } from "@/utils/abi";
import { ElNotification } from "element-plus";

const useSupply = (info) => {
  const { t } = useI18n();
  const hash = ref("");
  const step = ref(FormStep.Form);
  const supplyAmount = ref("");
  const store = useStore();

  const useClient = computed(() => store.state.useClient);
  const userAddress = computed(() => store.state.userAddress);

  const maxAmount = computed(() => {
    const result = getMinus(info.walletBalance, RESERVE_BALANCE);
    if (isLte(result, "0")) {
      return "0";
    }
    return info.walletBalance;
  });

  const supplyDisableLabel = computed(() => {
    if (getIsInvalidInput(supplyAmount.value)) {
      return t("supply");
    }
    if (isGt(supplyAmount.value, maxAmount.value)) {
      return t("no_funds");
    }
    return "";
  });

  const emitSupply = async () => {
    const amount = getFixed(supplyAmount.value, TokenFloat[info.name]);
    step.value = FormStep.Pending;
    try {
      hash.value = await sendETHTransaction(
        useClient.value,
        userAddress.value,
        ContractAddress.WETHGateway,
        JSON.parse(SupplyETHAbi),
        getAmount(amount, info.name),
        true,
        [userAddress.value, "0"]
      );
      console.log("hash", hash.value);
      step.value = FormStep.Success;
    } catch (error) {
      step.value = FormStep.Failed;
      ElNotification.error(t("translation_failed"));
    }
  };

  return {
    hash,
    step,
    supplyAmount,
    maxAmount,
    supplyDisableLabel,
    emitSupply,
  };
};

export default useSupply;
