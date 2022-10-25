<template>
  <div class="g-container">
    <div class="area">
      <div class="title g-font-bold__italic">
        {{ t("subtitle1") }}
      </div>
      <div class="desc-text secure_desc">
        {{ t("subtitle1_desc_1") }}<br /><br />
        {{ t("subtitle1_desc_2") }}
      </div>
      <div class="text-link g-font-normal__italic">
        <a href="https://goshen.gitbook.io/goshen/dev-docs/building-on-goshen" target="_blank">
          {{ t("start_building") }}
          <span class="iconfont icon-a-arrowright"></span>
        </a>
      </div>
      <div class="text-link g-font-normal__italic">
        <a href="https://discord.gg/yZeArHW9mQ" target="_blank">
          {{ t("meet_us_on_discord") }}
          <span class="iconfont icon-a-arrowright"></span>
        </a>
      </div>
    </div>

    <div class="area builds">
      <div class="title g-font-bold__italic">
        {{ t("subtitle2") }}
      </div>
      <ul class="cover_list">
        <li v-for="e in coverList" :key="e.id">
          <img :src="e.img" alt="" />
          <div>
            <div class="sub-desc__title g-font-normal__italic">
              {{ e.title }}
            </div>
            <div class="desc-text">{{ e.desc }}</div>
          </div>
        </li>
      </ul>
    </div>

    <div class="area technology">
      <div class="title g-font-bold__italic">
        {{ t("subtitle3") }}
      </div>
      <div class="technology_desc">
        <div>
          <div class="g-font-bold__italic min_title">
            {{ t("technology_title") }}
          </div>
          <ul class="info-list">
            <li class="g-font-normal__italic">
              {{ t("technology_desc_1") }}
            </li>
            <li class="g-font-normal__italic">
              {{ t("technology_desc_2") }}
            </li>
            <li class="g-font-normal__italic">
              {{ t("technology_desc_3") }}
            </li>
            <li class="g-font-normal__italic">
              {{ t("technology_desc_4") }}
            </li>
          </ul>
        </div>
        <div>
          <div class="ad_ele" v-for="e in adList" :key="e.id">
            <div class="g-font-normal__italic go_ad_title">
              {{ e.title }}
            </div>
            <div class="desc-text">{{ e.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="area builds">
      <div class="title g-font-bold__italic">
        {{ t("roadmap") }}
      </div>
      <div>
        <DateLine />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import lowGasIcon from "../../assets/images/low_gas_fees.svg";
import secureIcon from "../../assets/images/high_security.svg";
import fastIcon from "../../assets/images/fast_transactions.svg";
import developerIcon from "../../assets/images/vector_35.svg";
import DateLine from "./DateLine.vue";

const { t } = useI18n();

const coverList = computed(() => {
  return [
    {
      id: 1,
      title: t("ad_sub_title_1"),
      desc: t("ad_sub_desc_1"),
      img: lowGasIcon,
    },
    {
      id: 2,
      title: t("ad_sub_title_2"),
      desc: t("ad_sub_desc_2"),
      img: secureIcon,
    },
    {
      id: 3,
      title: t("ad_sub_title_3"),
      desc: t("ad_sub_desc_3"),
      img: fastIcon,
    },
    {
      id: 4,
      title: t("ad_sub_title_4"),
      desc: t("ad_sub_desc_4"),
      img: developerIcon,
    },
  ];
});

const adList = computed(() => {
  return [
    {
      id: 1,
      title: t("technology_ad_title_1"),
      desc: t("technology_ad_desc_1"),
    },
    {
      id: 2,
      title: t("technology_ad_title_2"),
      desc: t("technology_ad_desc_2"),
    },
    {
      id: 3,
      title: t("technology_ad_title_3"),
      desc: t("technology_ad_desc_3"),
    },
  ];
});
</script>

<style lang="scss" scoped>
.g-container {
  padding: 120px 0;
  @media (max-width: 750px) {
    padding: 32vw 4vw;
  }
}
.title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 48px;
  line-height: 58px;
  @media (max-width: 750px) {
    font-size: 9.6vw;
    line-height: 12.2667vw;
    margin-bottom: 10.6667vw;
  }
}
.desc-text {
  font-size: 18px;
  line-height: 22px;
  @media (max-width: 750px) {
    font-size: 4.8vw;
    line-height: 5.8667vw;
  }
}
.secure_desc {
  margin-bottom: 20px;
}

.text-link {
  a {
    text-decoration: none;
    font-size: 14px;
    line-height: 18px;
    color: #08112c;
    &:hover {
      color: var(--color-green);
    }
    span {
      margin-left: 10px;
    }
  }
  @media (max-width: 750px) {
    a {
      font-size: 3.7333vw;
      line-height: 4.8vw;
      span {
        margin-left: 2.6667vw;
      }
    }
  }
}
.cover_list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 60px;
  grid-row-gap: 40px;
  li {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    img {
      margin-right: 20px;
    }
  }
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    grid-row-gap: 10.6667vw;
    li {
      flex-direction: column;
      align-items: center;
      img {
        margin-right: 0;
        margin-bottom: 5.3333vw;
      }
      div {
        text-align: center;
      }
    }
  }
}
.text-link + .text-link {
  margin-top: 10px;
  @media (max-width: 750px) {
    margin-top: 2.6667vw;
  }
}
.area + .area {
  margin-top: 120px;
}
.sub-desc__title {
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 10px;
}
.technology_desc {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 40px;
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    grid-row-gap: 10.6667vw;
    text-align: center;
    li {
      text-align: left;
    }
  }
}
.min_title {
  font-size: 32px;
  line-height: 40px;
  margin-bottom: 20px;
}
.info-list {
  padding-left: 22px;
  li {
    font-size: 24px;
    line-height: 30px;
  }
  li + li {
    margin-top: 6px;
  }
}
.go_ad_title {
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 10px;
  @media (max-width: 750px) {
    font-size: 4.8vw;
    line-height: 6.4vw;
    margin-bottom: 2.6667vw;
  }
}
.ad_ele + .ad_ele {
  margin-top: 20px;
  @media (max-width: 750px) {
    margin-top: 5.3333vw;
  }
}
</style>
