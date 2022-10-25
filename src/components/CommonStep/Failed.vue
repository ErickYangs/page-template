<template>
  <div class="failed">
    <CoinTitle :label="t('transaction')" />
    <div class="box">
      <img src="../../assets/images/failed.svg" alt="Failed" />
    </div>
    <div class="tip">{{ t("translation_failed") }}</div>
    <CommonButton
      v-if="hash"
      class="btn"
      type="link"
      :label="t('view_transaction')"
      @click="go2Explorer"
    />
  </div>
</template>

<script setup>
import CoinTitle from "@/components/CoinTitle.vue";
import { useI18n } from "vue-i18n";
import CommonButton from "@/components/CommonButton.vue";
// import dapp from '@/utils/dapp';
const props = defineProps({
  hash: { type: String, required: true, default: "" },
});
const { t } = useI18n();

const go2Explorer = () => {};

// export default {
//   name: 'Failed',
//   components: { CoinTitle },
//   props: {
//     hash: {
//       type: String,
//       require: true,
//     },
//   },
//   methods: {
//     go2Explorer() {
//       const url = process.env.VUE_APP_EXPLORER.replace('[hash]', this.hash);
//       if (dapp.isOnto) {
//         // eslint-disable-next-line no-restricted-globals
//         location.href = url;
//       } else {
//         window.open(url);
//       }
//     },
//   },
// };
</script>

<style lang="scss" scoped>
.failed {
  padding-bottom: 0.3rem;
  text-align: center;
}

.box {
  margin-top: 0.6rem;
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  line-height: 0.8rem;
  border-radius: 50%;
  background: rgba(208, 0, 0, 0.1);
  text-align: center;
  font-size: 0;

  img {
    width: 32px;
    vertical-align: middle;
  }
}

.tip {
  margin-top: 0.2rem;
  font-size: 0.16rem;
  line-height: 0.22rem;
  color: var(--color-content);
}

.btn {
  margin-top: 0.2rem;
}
</style>
