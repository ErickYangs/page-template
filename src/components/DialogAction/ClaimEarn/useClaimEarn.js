import { ref, computed } from "vue";
import { getAmount, isLte } from "@/utils/count";
import { ContractAddress, FormStep } from "@/utils/enum";
import { sendETHTransaction } from "@/utils/contract";
import { ElNotification } from "element-plus";
import { ClaimRewardABI } from "@/utils/abi";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const useClaimEarn = (info) => {
  const { t } = useI18n();
  const hash = ref("");
  const step = ref(FormStep.Form);
  const store = useStore();
  const useClient = computed(() => store.state.useClient);
  const userAddress = computed(() => store.state.userAddress);

  const emitConfirm = async () => {
    step.value = FormStep.Pending;
    const contractList = [
      ContractAddress.BWETH,
      ContractAddress.DEBT_TOKEN,
      ContractAddress.INSURANCE_POOL,
    ];
    try {
      hash.value = await sendETHTransaction(
        useClient.value,
        userAddress.value,
        ContractAddress.BEND_PROTOCOL,
        JSON.parse(ClaimRewardABI),
        [contractList, getAmount(info.totalWingEarned, "WING")],
        false
      );
      step.value = FormStep.Success;
    } catch (error) {
      step.value = FormStep.Failed;
      ElNotification.error(t("translation_failed"));
    }
  };

  const disabled = computed(() => isLte(info.totalWingEarned, "0"));

  return {
    hash,
    step,
    disabled,
    emitConfirm,
  };
};

export default useClaimEarn;
