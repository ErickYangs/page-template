<template>
  <div class="drop-down" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="main-title" @click="info.url && openPage(info.url)">
      <div class="names">{{ info.title }}</div>
    </div>
    <transition name="pull-up">
      <div v-if="dropShowing && info.list" class="drop-list">
        <div class="minwidths">
          <div class="user-set" v-for="(item, index) in info.list" :key="index" @click="gopageNav(item)">
            {{ item.text }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  info: Object
})
const dropShowing = ref(false);

const gopageNav = (data) => {
  if (data.url === '/') return;
  if (data.target) {
    window.open(data.url, data.target);
  } else {
    window.open(data.url, '_self');
  }
}

const openPage = (url) => {
  if (url.indexOf('docs') < 0) {
    window.open(url, '_self');
  } else {
    window.open(url);
  }
}

const handleMouseEnter = () => {
  dropShowing.value = true;
}
const handleMouseLeave = () => {
  dropShowing.value = false;
}

</script>

<style lang="scss" scoped>
.drop-down {
  position: relative;
  height: 100%;
  margin: 0 auto;

  .main-title {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .names {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.15rem;
      height: 0.28rem;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      min-width: 0.6rem;
      transition: color 0.6s;
      cursor: pointer;

      &:hover {
        color: rgba(255, 255, 255, 1);
      }
    }
  }

  .drop-list {
    overflow: hidden;
    position: absolute;
    right: -60%;
    top: 100%;
    background: #1c1c1c;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);
    border-radius: 4px;

    .user-set {
      min-width: 2rem !important;
      padding: 0 0.24rem;
      text-align: left;
      color: #fff;
      border-bottom: 1px solid #121212;
      border-top: 1px solid #121212;
      cursor: pointer;
      transition: all 0.6s;
      word-break: break-all;

      &:hover {
        background: #121212;
      }

      &:nth-of-type(n+1) {
        border-top: none;
      }
    }

    .user-set {
      height: 0.48rem;
      line-height: 0.48rem;
      font-size: 0.12rem;
      text-align: center;
    }
  }
}

.pull-up-enter-active,
.pull-up-leave-active {
  transform: translateY(0);
  opacity: 1;
  transition: transform 300ms ease, opacity 300ms ease;
}

.pull-up-enter,
.pull-up-leave-active {
  opacity: 0;
  transform: translateY(20px);
}
</style>
