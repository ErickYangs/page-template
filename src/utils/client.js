import Web3 from "web3";
import { ElNotification } from "element-plus";
import { WalletType } from "./enum";
import i18n from '@/i18n';

export const loadClient = (chooseType) => {
  if (chooseType === WalletType.META_MASK) {
    try {
      return new Web3(Web3.givenProvider);
    } catch (error) {
      ElNotification.error(i18n.global.t('load_sdk_fail'));
    }
  }
};
