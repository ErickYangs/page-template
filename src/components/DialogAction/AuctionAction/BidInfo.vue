<template>
  <CommonStep :hash="hash" :step="step">
    <div>
      <CoinTitle :label="t('place_bid')" />
      <div class="form">
        <div class="nft-icon">
          <img src="" alt="" />
        </div>
        <div class="form-info">
          <div class="nft-title">Bored Ape Yacht Club</div>
          <div class="form-cell info-list">
            <InfoLabel :label="t('token_id')" :balance="nftInfo.token_id" />
            <InfoLabel
              :label="t('floor_price')"
              :balance="nftInfo.floor_price"
            />
            <InfoLabel
              :label="t('highest_bid')"
              :balance="nftInfo.highest_bid"
            />
            <InfoLabel
              :label="t('liquidation_time')"
              :balance="nftInfo.liquidation_time"
            />
          </div>
        </div>
      </div>
      <div class="bid-table">
        <div class="table-title nft-title">
          <img src="../../../assets/images/bid.svg" alt="" /> {{ t("bids") }}
        </div>
        <div class="data-table">
          <div class="table_self">
            <div class="self_row self_header">
              <div class="self_cell">{{ t("nft_item") }}</div>
              <div class="self_cell">{{ t("item_name") }}</div>
              <div class="self_cell">{{ t("token_id") }}</div>
            </div>
            <div class="data-scroll">
              <div v-for="item in list" :key="item" class="self_row self_tbody">
                <div class="self_cell">
                  <img class="icon" src="" alt="" /> 100 ETH
                </div>
                <div class="self_cell">
                  <div class="g-font-num">$ 250000</div>
                </div>
                <div class="self_cell">0x0ee6d21B973..d97f</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CommonStep>
</template>

<script setup>
import CommonStep from "@/components/CommonStep/CommonStep.vue";
import CoinTitle from "@/components/CoinTitle.vue";
import InfoLabel from "@/components/InfoLabel.vue";
import { ref } from "vue";
import { FormStep } from "@/utils/enum";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const hash = ref("");
const step = ref(FormStep.Form);
const list = ref([1, 2, 3, 4, 5, 6]);

const nftInfo = ref({
  token_id: "#!11",
  floor_price: "1.1111",
  highest_bid: "1233",
  liquidation_time: "2022-06-01 20:00",
});
</script>

<style lang="scss" scoped>
.form {
  padding-top: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.nft-icon {
  width: 2rem;
  margin-right: 0.4rem;
  img {
    display: block;
    width: 2rem;
    height: 2rem;
    background: rgba(0, 175, 124, 0.3);
    border-radius: 0.08rem;
  }
}
.form-info {
  flex: 1;
}
.label {
  font-weight: 600;
  color: var(--color-content);
}
.form-cell {
  margin-bottom: 0.4rem;
}
.wallet-balance {
  font-weight: 600;
  text-align: right;
  span {
    color: var(--color-content);
    margin-right: 0.04rem;
  }
}
i {
  font-style: inherit;
}

.nft-title {
  font-size: 0.18rem;
  font-weight: 600;
  line-height: 0.26rem;
  margin-bottom: 0.2rem;
}
.table-title {
  margin-bottom: 0.2rem;
  img {
    transform: translateY(-2px);
  }
}
.self_header {
  background: rgba(255, 255, 255, 0.1);
  .self_cell {
    padding: 0.1rem 0.2rem;
    font-size: 0.14rem;
    font-weight: 600;
    color: var(--color-content);
  }
}
.self_header,
.self_tbody {
  .self_cell:nth-of-type(1) {
    width: 20%;
  }
  .self_cell:nth-of-type(2) {
    width: 40%;
  }
  .self_cell:nth-of-type(3) {
    width: 40%;
  }
}
.self_row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.self_tbody {
  background: rgba(255, 255, 255, 0.03);

  .self_cell {
    height: 0.5rem;
    border-bottom: 1px solid #333;
    padding: 0.14rem 0.2rem;
  }
  img {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    margin-right: 0.1rem;
  }
}
.data-scroll {
  height: 3rem;
  overflow-y: auto;
}
</style>
