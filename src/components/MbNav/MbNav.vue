<template>
  <div>
    <a
      v-if="item.link"
      class="t-link"
      :class="{ disabled: item.children }"
      :href="item.link || 'javascript:void(0)'"
      :target="item.children ? '' : item.inner ? '_self' : '_blank'"
    >
      {{ t(item.t_key) }}
    </a>
    <a
      v-else
      class="t-link"
      :class="{ disabled: item.children }"
      :href="item.link || 'javascript:void(0)'"
      :target="item.children ? '' : item.inner ? '_self' : '_blank'"
      @click="handlerShow"
    >
      {{ t(item.t_key) }}
      <img src="../../assets/images/chevron-down.svg" alt="" />
    </a>
    <div class="sub-t" v-if="item.children && showList">
      <a
        v-for="sub in item.children"
        :key="sub.t_key"
        class="nav__item__sub__item t-link"
        :href="sub.link || 'javascript:void(0)'"
        :target="sub.inner ? '_self' : '_blank'"
        rel="noreferrer noopener"
      >
        {{ t(sub.t_key) }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

defineProps({
  item: { type: Object, required: true },
});

const { t } = useI18n();

const showList = ref(false);

const handlerShow = () => {
  showList.value = !showList.value;
};
</script>

<style lang="scss" scoped>
.t-link {
  display: block;
  text-align: right;
  font-size: 3.7333vw;
  height: 14.9333vw;
  line-height: 14.9333vw;
  color: #677181;
  text-align: right;
  cursor: default;
  text-decoration: none;
  box-sizing: border-box;
  font-weight: 600;
}
.nav__item__sub__item {
  display: block;
  height: 10.1333vw;
  line-height: 10.1333vw;
}
</style>
