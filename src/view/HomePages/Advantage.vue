<template>
  <div class="g-container">
    <div class="title g-font-bold">
      {{ t("advantage_title") }}
    </div>
    <ul class="ad-list">
      <li>
        <div class="img-area">
          <img src="../../assets/images/ad1.svg" alt="" />
        </div>
        <div class="sub-info">
          <div class="sub-title g-font-bold">{{ t("ad_sub_title_1") }}</div>
          <div class="sub-title_desc">{{ t("ad_sub_desc_1") }}</div>
        </div>
      </li>

      <li>
        <div class="sub-info right-word">
          <div class="sub-title g-font-bold">{{ t("ad_sub_title_2") }}</div>
          <div class="sub-title_desc">{{ t("ad_sub_desc_2") }}</div>
        </div>
        <div class="img-area">
          <img src="../../assets/images/ad_2.svg" alt="" />
        </div>
      </li>

      <li>
        <div class="img-area">
          <img src="../../assets/images/ad_3.svg" alt="" />
        </div>
        <div class="sub-info">
          <div class="sub-title g-font-bold">{{ t("ad_sub_title_3") }}</div>
          <div class="sub-title_desc">{{ t("ad_sub_desc_3") }}</div>
        </div>
      </li>

      <li>
        <div class="sub-info right-word">
          <div class="sub-title g-font-bold">{{ t("ad_sub_title_4") }}</div>
          <div class="sub-title_desc">{{ t("ad_sub_desc_4") }}</div>
        </div>
        <div class="img-area">
          <img src="../../assets/images/ad_4.svg" alt="" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.g-container {
  padding: 150px 0;
  @media (max-width: 750px) {
    padding: 40vw 4vw;
  }
}
.title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 48px;
  line-height: 58px;
  @media (max-width: 750px) {
    font-size: 4.8vw;
    line-height: 5.8667vw;
    margin-bottom: 10.6667vw;
  }
}
.ad-list {
  padding: 0;
  li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 80px;
    @media (max-width: 750px) {
      margin-bottom: 21.3333vw;
      flex-direction: column;
      .img-area {
        text-align: center;
        margin-bottom: 5.3333vw;
      }
      img {
        width: 90%;
      }
      &:nth-of-type(2n) {
        flex-direction: column-reverse;
      }
    }
  }
}
.sub-info {
  padding-left: 40px;
  flex: 1;
  @media (max-width: 750px) {
    padding: 0;
    text-align: center;
  }
}
.sub-title,
.sub-title_desc {
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 10px;
  @media (max-width: 750px) {
    font-size: 6.4vw;
    line-height: 8vw;
    margin-bottom: 2.6667vw;
  }
}
.right-word {
  text-align: right;
  padding-right: 40px;
  padding-left: 0;
  @media (max-width: 750px) {
    padding: 0;
    text-align: center;
  }
}
</style>
