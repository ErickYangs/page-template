<template>
  <div class="road-map__list">
    <div class="road-map__top_dot road-map__data">
      <div class="dot-ele" v-for="(e, i) in topData" :key="i">
        <div class="road-title g-font-normal__italic">{{ e.title }}</div>
        <img
          class="status-i"
          v-if="!e.active"
          src="../../assets/images/normal_dot.svg"
          alt=""
        />
        <img
          class="status-i"
          v-else
          src="../../assets/images/active_dot.svg"
          alt=""
        />
      </div>
    </div>
    <div class="road-map__line"></div>
    <div class="road-map__bottom_dot road-map__data">
      <div class="dot-ele" v-for="(e, i) in bottomData" :key="i">
        <div class="road-title g-font-normal__italic">{{ e.title }}</div>
        <img
          class="status-i"
          v-if="!e.active"
          src="../../assets/images/normal_dot.svg"
          alt=""
        />
        <img
          class="status-i"
          v-else
          src="../../assets/images/active_dot.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const topData = ref([
  { title: t("road_title_2"), active: true },
  { title: t("road_title_4"), active: false },
  { title: t("road_title_6"), active: false },
  { title: t("road_title_8"), active: false },
]);
const bottomData = ref([
  { title: t("road_title_1"), active: true },
  { title: t("road_title_3"), active: false },
  { title: t("road_title_5"), active: false },
  { title: t("road_title_7"), active: false },
]);
</script>

<style lang="scss" scoped>
.road-map__line {
  width: 100%;
  height: 2px;
  background-color: #08112c;
}
.road-map__data {
  padding: 0 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dot-ele {
  width: 130px;
  padding-bottom: 14px;
  position: relative;
}
.road-title {
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  @media (max-width: 750px)  {
    font-size: 3.2vw;
    line-height: 4.8vw;
  }
}
.status-i {
  position: absolute;
  width: 16px;
  height: 16px;
  left: 50%;
  bottom: -8px;
  transform: translateX(-50%);
}
.road-map__top_dot {
  transform: translateX(65px);
  align-items: flex-end;
}
.road-map__bottom_dot {
  transform: translateX(-65px);
  align-items: flex-start;
  .dot-ele {
    width: 130px;
    padding-bottom: 0;
    padding-top: 14px;
    position: relative;
  }
  .status-i {
    bottom: auto;
    top: -8px;
  }
}

@media (max-width: 750px) {
  .road-map__list {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    height: 168vw;
  }
  .road-map__line {
    width: 2px;
    height: 100%;
  }
  .road-map__data {
    flex: 1;
    flex-direction: column;
    padding: 26.6667vw 0;
    transform: translateX(0);
  }
  .road-map__top_dot {
    transform: translateY(1.1333vw);
  }
  .road-map__bottom_dot {
    transform: translateY(-15.1333vw);
    .dot-ele {
      width: 100%;
      padding-bottom: 0;
      padding-top: 0;
      padding-left: 5.3333vw;
      padding-right: 0;
    }
    .status-i {
      left: -9px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .dot-ele {
    width: 100%;
    padding-bottom: 0;
    padding-right: 5.3333vw;
  }
  .status-i {
    right: -9px;
    top: 50%;
    left: auto;
    transform: translateY(-50%);
  }
}
</style>
