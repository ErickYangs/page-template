<template>
  <div class="header-lay">
    <img @click="router.push('/')" src="../assets/images/logo.svg" alt="" />
    <nav class="nav">
      <div v-for="item in nav.list" :key="item.t_key" class="nav__item">
        <a
          class="t-link"
          :class="{ disabled: item.children }"
          :href="item.link || 'javascript:void(0)'"
          :target="item.children ? '' : item.inner ? '_self' : '_blank'"
        >
          {{ t(item.t_key) }}
        </a>
        <div
          v-if="item.children"
          :key="`${item.t_key}child`"
          class="nav__item__sub"
        >
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
    </nav>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import nav from "./nav.json";
const router = useRouter();
const { t } = useI18n();
</script>
<style lang="scss" scoped>
.header-lay {
  width: 100%;
  height: 60px;
  background: #08112c;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 8;
  display: flex;
  align-items: center;
  padding: 0 60px;
  @media (max-width: 750px) {
    height: 16vw;
  }
}
.nav {
  margin-left: 80px;
}
.nav__item {
  margin-left: 40px;
  height: 60px;
  line-height: 60px;
  position: relative;
  display: inline-block;

  &:hover {
    .nav__item__sub {
      display: block;
    }
  }
}

.nav__item__sub {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 100px;
  background: #161f34;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.05));
  border-radius: 10px;
  padding: 0 0;
}

.nav__item__sub__item {
  display: block;
  padding: 12px;
}

.t-link {
  cursor: default;
  white-space: nowrap;
  font-size: 14px;
  line-height: 16px;
  text-decoration: none;
  color: #677181;
  transition: color 0.314s;
  font-weight: 600;

  &:not(.disabled) {
    cursor: pointer;
    color: #677181;
    &:hover {
      //   color: var(--theme);
      background: linear-gradient(
        90deg,
        #b6f3d7 0%,
        #66e6b0 41.67%,
        #e2f37a 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
}
</style>
