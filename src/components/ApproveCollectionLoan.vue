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
                :to="getPercentLabel(info.healthFactorTo)"
              />
            </div>
          </div>
        </div>
        <div>
          <div class="label">{{ t("approvel") }}</div>
          <div class="btn-group">
            <approve-button
              :label="debtTokenLabel"
              @click="handlerApproveDebtToken"
              :loading="debtTokenLoading"
              :finally-status="debtTokenFinally"
            />
            <approve-button
              :label="nftTokenLabel"
              @click="handlerApproveNFTTokenAction"
              :loading="nftTokenLoading"
              :finally-status="nftTokenFinally"
            />
          </div>
        </div>
      </div>
    </div>
  </common-card-inner>
</template>

<script setup>
import CommonCardInner from "@/components/CommonCardInner.vue";
import ApproveButton from "./ApproveButton.vue";
import FieldCountTo from "./FieldCountTo.vue";
import { ElNotification } from "element-plus";
import { ref, watchEffect, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { getPercentLabel } from "@/utils/format";
import { getFixedFloor, getPlus } from "@/utils/count";
import {
  approve721Action,
  approveCheckErc721,
  approveActionDebtAsync,
  approveCheckDebt,
  approveCryptoAction,
  approveCheckCrypto,
} from "@/utils/contract";
import { useStore } from "vuex";
import {
  ContractAddress,
  NFTTypeSelectOption,
  DefaultTimer,
} from "@/utils/enum";
const store = useStore();

const userAddress = computed(() => store.state.userAddress);
const useClient = computed(() => store.state.useClient);
//  0x9f2246912cF8684DE06529b6149b759dEf3a7B7A debtToken
const props = defineProps({
  info: {
    type: Object,
    require: true,
    default: {},
  },
  currentType: {
    type: String,
    require: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const { t } = useI18n();

const debtTokenLoading = ref(false);
const debtTokenFinally = ref(false);
const approveTime = ref(null);

const nftTokenLoading = ref(false);
const nftTokenFinally = ref(false);
const approve721Time = ref(null);

const handlerApproveDebtToken = async () => {
  try {
    debtTokenLoading.value = true;
    const result = await approveActionDebtAsync(
      useClient.value,
      userAddress.value,
      "0x9f2246912cF8684DE06529b6149b759dEf3a7B7A",
      gatewayContractAddress.value
    );
    if (result) {
      ElNotification.success(t("approve_success"));
    } else {
      ElNotification.error(t("approve_fail"));
    }
  } catch (error) {
    debtTokenLoading.value = false;
    ElNotification.error(t("approve_fail"));
  }
};

const handlerApproveNFTToken = async () => {
  try {
    nftTokenLoading.value = true;
    const result = await approve721Action(
      useClient.value,
      userAddress.value,
      "0x9C235dF4053a415f028b8386ed13ae8162843a6e",
      gatewayContractAddress.value
    );
    if (result) {
      ElNotification.success(t("approve_success"));
    } else {
      ElNotification.error(t("approve_fail"));
    }
  } catch (error) {
    nftTokenLoading.value = false;
    ElNotification.error(t("approve_fail"));
  }
};

const handlerApproveCryptoNFTToken = async () => {
  try {
    nftTokenLoading.value = true;
    const result = await approveCryptoAction(
      useClient.value,
      userAddress.value,
      "0x6389ea3cf6de815ba76d7cf4c6db6a7093471bcb",
      gatewayContractAddress.value,
      "721"
    );
    if (result) {
      ElNotification.success(t("approve_success"));
    } else {
      ElNotification.error(t("approve_fail"));
    }
  } catch (error) {
    nftTokenLoading.value = false;
    ElNotification.error(t("approve_fail"));
  }
};

const handlerApproveNFTTokenAction = async () => {
  if (props.currentType === NFTTypeSelectOption.erc721) {
    await handlerApproveNFTToken();
  } else {
    await handlerApproveCryptoNFTToken();
  }
};
const emitApproveCheckNFTAction = async () => {
  if (props.currentType === NFTTypeSelectOption.erc721) {
    await emitApproveCheckNFT();
  } else {
    await emitApproveCheckCryptoNFT();
  }
};

const emitApproveCheckCryptoNFT = async () => {
  const result = await approveCheckCrypto(
    useClient.value,
    userAddress.value,
    "0x6389ea3cf6de815ba76d7cf4c6db6a7093471bcb",
    gatewayContractAddress.value,
    "721"
  );
  console.log("result", result);
  if (result) {
    clearInterval(approve721Time.value);
    nftTokenLoading.value = false;
    nftTokenFinally.value = true;
  }
};

const emitApproveCheckNFT = async () => {
  const result = await approveCheckErc721(
    useClient.value,
    userAddress.value,
    "0x9C235dF4053a415f028b8386ed13ae8162843a6e",
    gatewayContractAddress.value
  );
  console.log("result", result);
  if (result) {
    clearInterval(approve721Time.value);
    nftTokenLoading.value = false;
    nftTokenFinally.value = true;
  }
};

const emitApproveCheck = async () => {
  const result = await approveCheckDebt(
    useClient.value,
    userAddress.value,
    "0x9f2246912cF8684DE06529b6149b759dEf3a7B7A",
    gatewayContractAddress.value
  );
  // console.log("result", result);
  if (result.flag) {
    clearInterval(approveTime.value);
    debtTokenLoading.value = false;
    debtTokenFinally.value = true;
  }
};

const debtTokenLabel = computed(() => {
  if (debtTokenLoading.value && !debtTokenFinally.value) {
    return t("approving_debt_token");
  }
  if (!debtTokenLoading.value && debtTokenFinally.value) {
    return t("debt_token_approved");
  }
  return t("approve_debt_token");
});

const nftTokenLabel = computed(() => {
  if (nftTokenLoading.value && !nftTokenFinally.value) {
    return t("approving_nft_token");
  }
  if (!nftTokenLoading.value && nftTokenFinally.value) {
    return t("nft_token_approved");
  }
  return t("approve_nft_token");
});

watchEffect(() => {
  if (debtTokenFinally.value && nftTokenFinally.value) {
    emits("update:modelValue", true);
  }
});

const gatewayContractAddress = computed(() => {
  if (props.currentType === NFTTypeSelectOption.erc721) {
    return ContractAddress.WETHGateway;
  } else {
    return ContractAddress.PUNKGateway;
  }
});

onMounted(() => {
  emitApproveCheckNFTAction();
  emitApproveCheck();
  clearInterval(approve721Time.value);
  clearInterval(approveTime.value);

  approve721Time.value = setInterval(() => {
    emitApproveCheckNFTAction();
  }, DefaultTimer);
  approveTime.value = setInterval(() => {
    emitApproveCheck();
  }, DefaultTimer);
});

onBeforeUnmount(() => {
  clearInterval(approve721Time.value);
  clearInterval(approveTime.value);
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

.btn-group {
  margin-top: 0.1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 0.2rem;
}
</style>
