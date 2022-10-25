<template>
  <div class="connect-wallet">
    <div
      v-if="userAddress"
      class="address-content"
      @mouseenter="isShowing = true"
      @mouseleave="isShowing = false"
    >
      <div class="address">{{ formatLongStr(userAddress) }}</div>
      <transition name="pull-up">
        <div v-if="isShowing" class="user__menu">
          <div class="user__menu__item" @click="signOut">
            {{ t("sign_out") }}
          </div>
        </div>
      </transition>
    </div>
    <CommonButton v-else :label="t('collect_wallet')" @click="handlerLogin" />
    <CommonDialog v-model:visible="dialogVisibleChoose">
      <ChooseWalletType
        @handleChooseType="handleChooseType"
        @success="dialogVisibleChoose = false"
      />
    </CommonDialog>
  </div>
</template>

<script setup>
import CommonButton from "../CommonButton.vue";
import CommonDialog from "../CommonDialog.vue";
import ChooseWalletType from "./ChooseWalletType.vue";
import { useI18n } from "vue-i18n";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { ElNotification } from "element-plus";
import { WalletType, CacheName, DefaultTimerLong } from "@/utils/enum";
import { loadClient } from "../../utils/client";
import { formatLongStr } from "@/utils/format";
import { useRouter } from "vue-router";
import { getUserBalance } from "@/api/user";
const router = useRouter();
const store = useStore();

const useClient = computed(() => store.state.useClient);
const userAddress = computed(() => store.state.userAddress);

const { t } = useI18n();

const isShowing = ref(false);

const dialogVisibleChoose = ref(false);

const handleChooseType = (type) => {
  console.log("type", type);
  if (type === WalletType.META_MASK) {
    handlerCollectMetaMask();
  }
};

const handlerLogin = () => {
  dialogVisibleChoose.value = true;
};

const handlerCollectMetaMask = async () => {
  if (typeof window.ethereum === "undefined") {
    return ElNotification.warning({
      title: t("notify_warn"),
      message: t("dis_meta_mask"),
    });
  }
  const client = await loadClient(WalletType.META_MASK);
  await client.eth.requestAccounts();
  const ethAddress = await client.eth.getAccounts();
  console.log("ethAddress", ethAddress);
  if (ethAddress.length > 0) {
    store.commit("SET_USER_ADDRESS", ethAddress[0]);
    store.commit("SET_USE_CLIENT", client);
    sessionStorage.setItem(CacheName.Login, ethAddress[0]);
    sessionStorage.setItem(CacheName.WalletType, WalletType.META_MASK);
    // this.initEventONTO();
  }
};

const signOut = () => {
  isShowing.value = false;
  store.commit("SET_USER_ADDRESS", "");
  store.commit("SET_USE_CLIENT", null);
  sessionStorage.clear();
  router.push("/");
};

const handlerGetBalance = async () => {
  if (userAddress.value) {
    const balance = await getUserBalance(userAddress.value);
    store.commit("SET_USER_WALLET_BALANCE", balance);
  }
};

onMounted(async () => {
  const sessionAddress = sessionStorage.getItem(CacheName.Login);
  const sessionWalletType = sessionStorage.getItem(CacheName.WalletType);
  if (sessionAddress && sessionWalletType === WalletType.META_MASK) {
    const client = await loadClient(WalletType.META_MASK);
    store.commit("SET_USER_ADDRESS", sessionAddress);
    store.commit("SET_USE_CLIENT", client);
  }
  setInterval(() => {
    handlerGetBalance();
  }, DefaultTimerLong);
});
</script>

<style lang="scss" scoped>
.address {
  padding: 0.1rem 0.2rem;
  color: var(--color-green);
  background: #131313;
  border-radius: 4px;
}

.user__menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding-top: 5px;

  @media (max-width: 750px) {
    padding-top: 0.1rem;
  }
}

.user__menu__item {
  background: rgba(255, 255, 255, 0.08);
  line-height: 40px;
  font-size: 14px;
  color: var(--color-green);
  text-align: center;
  cursor: pointer;

  &:hover {
    background: rgba(0, 175, 124, 0.2);
  }

  @media (max-width: 750px) {
    line-height: 0.7rem;
    font-size: 0.24rem;
  }
}

.pull-up-enter-active,
.pull-up-leave-active {
  transform: translateY(0);
  opacity: 1;
  transition: transform 300ms ease, opacity 300ms ease;
}

.pull-up-enter,
.pull-up-leave-active {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
