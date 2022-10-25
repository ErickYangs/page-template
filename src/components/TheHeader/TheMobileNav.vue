<template>
  <div>
    <div class="mobile_Top_nav" :class="{
      isheight: isShow
    }" ref="mobile_Top_nav">
      <div class="top_title shadowb" :class="{ shadowb: !isShow }" id="shadowb_title">
        <div class="show_nav" :class="{
          isactive: isShow
        }" v-if="isShowNav" ref="show_nav" @click="showNav">
          <i></i>
          <i></i>
        </div>
        <img src="../../assets/images/sLogo.png" alt @click="router.push('/')" />
      </div>
      <div class="top_nav_box" :class="{
        openbg: isShow
      }" id="top_nav_box">
        <mobile-nav class="mobile_footer_nav" @showNav="showNav" :isShowLang="isShowLang" />
      </div>
    </div>
  </div>
</template>

<script setup>
// // import dapp from '@/utils/dapp';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MobileNav from './MbNavList.vue';
const router = useRouter()
const isShow = ref(false);
const isShowLang = ref(true);
const isShowNav = ref(true);

const showNav = () => {
  isShow.value = !isShow.value;
}
</script>

<style lang="scss" scoped>
.mobile_Top_nav {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  height: 0;
  transition: background-color 0.6s;
  z-index: 105;

  .top_title {
    padding: 18px 18px;
    background: #000;
    display: flex;
    justify-content: center;
    position: relative;

    img {
      display: block;
      height: 24px;
      cursor: pointer;
      transform: translateX(4px);
    }

    padding-right: 27px;
  }

  .top_title.shadowb {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
  }

  .show_nav {
    width: 18px;
    height: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    cursor: pointer;
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);

    i {
      display: block;
      width: 18px;
      height: 2px;
      border-radius: 1px;
      background: #fff;
      transition: all 0.3s ease-in-out;
    }
  }

  .show_nav.isactive {
    i:nth-of-type(1) {
      transform: translateY(5px) rotate(45deg);
    }

    i:nth-of-type(2) {
      transform: translateY(-3px) rotate(-45deg);
    }
  }

  .top_nav_box {
    background: #000;
    display: none;
    padding-bottom: 20px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .top_nav_box.openbg {
    display: block;
    opacity: 1;
  }
}

.mobile_Top_nav.isheight {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
