<template>
  <div class="chose_data_type">
    <coin-title :label="t('collect_wallet')" />
    <ul class="wallet_type">
      <li @click="handlerChoose(WalletType.META_MASK)">
        <span>{{ t("meta_mask_wallet") }}</span>
        <img src="../../assets/images/fox.svg" alt />
      </li>
      <!-- <li @click="handlerChoose(WalletType.ONTO_EX)">
        <span>{{ t("onto_wallet") }}</span>
        <img src="../../assets/images/onto_w.svg" alt />
      </li>
      <li @click="handlerChoose(WalletType.WALLET_CONNECT)">
        <span>{{ t("walletconnect") }}</span>
        <img src="../../assets/images/walletconnect-logo.svg" alt />
      </li>
      <li @click="handlerChoose(WalletType.COINBASE)">
        <span>{{ t("coinbase") }}</span>
        <img src="../../assets/images/coinbase_wallet_appicon.svg" alt />
      </li>
      <li @click="handlerChoose(WalletType.META_X)">
        <span>{{ t("metax") }}</span>
        <img src="../../assets/images/metax.svg" alt />
      </li> -->
    </ul>
  </div>
</template>

<script setup>
import CoinTitle from "@/components/CoinTitle.vue";
import { WalletType } from "@/utils/enum";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const emit = defineEmits(["handleChooseType", "success"]);

const handlerChoose = (type) => {
  emit("handleChooseType", type);
  emit("success");
};
</script>

<style lang="scss">
.wallet_type {
  margin: 0.4rem 0 0 0;
  padding: 0;
  list-style: none;
  li {
    cursor: pointer;
    padding: 0.19rem 0.2rem;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 0.04rem;
    border: 1px solid #333333;
    margin-bottom: 0.2rem;
    transition: border 0.618s;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 0.16rem;
      font-weight: 500;
      color: #fff;
    }
    img {
      width: 0.24rem;
      height: 0.24rem;
    }
    &:hover {
      border-color: #00af7c;
    }
    &:nth-last-of-type(1) {
      margin-bottom: 0;
    }
  }
}
.foot_ser {
  text-align: center;
  line-height: 0.16rem;
  font-size: 0.12rem;
  color: rgba(255, 255, 255, 0.3);
  span {
    cursor: pointer;
    color: #00af7c;
    text-decoration: underline;
  }
}
</style>
