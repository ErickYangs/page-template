<template>
  <div class="full-page">
    <div class="g-container">
      <div class="slogan-title g-font-bold__italic">
        Fast and low-cost L2 blockchain for Ethereum scaling
      </div>
      <div class="slogan-desc g-font-bold">
        {{ t("slogan_desc") }}
      </div>
      <div class="btn-group">
        <CommonButton
          type="submit"
          :label="t('bridge')"
          @click="openLink(bridge, '_self')"
        />
        <CommonButton
          type="primary"
          :label="t('docs')"
          @click="openLink(doc)"
        />
      </div>
      <div class="mb_show slogan-desc__text">
        {{ t("slog_desc1") }}<br /><br />
        {{ t("slog_desc2") }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import CommonButton from "../../components/CommonButton.vue";

const { t } = useI18n();
const bridge = ref("https://bridge.goshen.network");
const doc = ref("https://goshen.gitbook.io/goshen");

const openLink = (link, type = "_blank") => {
  window.open(link, type);
};
</script>

<style lang="scss" scoped>
.full-page {
  width: 100%;
  min-height: 100vh;
  background: url(../../assets/images/home_bg.png) no-repeat center;
  background-size: cover;
  @media (max-width: 750px) {
    padding-top: 50vw;
    padding-bottom: 40vw;
  }
}
.g-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.slogan-title,
.slogan-desc {
  color: #fff;
  text-align: left;
  width: 100%;
}
.btn-group {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  @media (max-width: 750px) {
    flex-direction: column;
    align-items: flex-start;
  }
  .button {
    width: 220px !important;
    text-align: center;
  }
  .button + .button {
    margin-left: 20px;
    @media (max-width: 750px) {
      margin-left: 0;
      margin-top: 5.3333vw;
    }
  }
}
.slogan-title {
  width: 100%;
  font-size: 58px;
  line-height: 74px;
  @media (max-width: 750px) {
    font-size: 9.6vw;
    line-height: 12.2667vw;
  }
}

.slogan-desc {
  font-size: 18px;
  line-height: 22px;
  margin-top: 20px;
  word-break: break-all;
  @media (max-width: 750px) {
    font-size: 4.8vw;
    line-height: 5.8667vw;
  }
}
.slogan-desc__text {
  color: #fff;
  margin-top: 37.3333vw;
}
</style>
