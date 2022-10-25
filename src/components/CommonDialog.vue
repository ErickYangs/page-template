<template>
  <transition name="fadeBack" @after-leave="handleLeave">
    <div v-show="isShow" class="nou-dialog" ref="scrollDom" @click="handleClickModal">
      <div class="nou-dialog__container__wrapper">
        <transition name="fade">
          <div
            v-show="isShow"
            class="nou-dialog__container"
            :class="{...dialogClass, 'fixed-mobile':fixedMobile}"
            @click.stop
          >
            <img
              v-if="showClose"
              @click="close"
              class="nou-dialog__close"
              src="../assets/images/close.svg"
              alt="close"
            >
            <slot v-if="contentActive" />
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>
<script>
import { lock, unlock } from 'tua-body-scroll-lock';

export default {
  name: 'CommonDialog',
  props: {
    visible: {
      type: Boolean,
      require: false,
      default: true,
    },
    keepSlot: { // keep slot instead of recreated
      type: Boolean,
      require: false,
      default: false,
    },
    title: {
      type: String,
      require: true,
      default: '',
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    dialogClass: {
      type: Object,
      require: false,
      default: () => {
      },
    },
    showClose: {
      type: Boolean,
      require: false,
      default: true,
    },
    fixedMobile: { // fixed bottom when mobile
      type: Boolean,
      require: false,
      default: false,
    },
  },
  data() {
    return {
      isShow: false,
      contentActive: false,
    };
  },
  methods: {
    close() { // public
      unlock(this.$refs.scrollDom);
      this.isShow = false;
      this.$emit('update:visible', false);
    },
    handleClickModal() {
      if (this.closeOnClickModal) {
        this.close();
      }
    },
    show() {
      this.isShow = true;
      this.contentActive = true;
      this.$nextTick(() => {
        lock(this.$refs.scrollDom);
      });
    },
    handleLeave() {
      if (!this.keepSlot) { // destroy slot after leave
        this.contentActive = false; // avoid view change between transition
      }
      this.$emit('close');
    },
  },
  beforeDestroy() {
    unlock(this.$refs.scrollDom); // unlock when destroy custom
  },
  created() {
    if (this.keepSlot) {
      this.contentActive = true;
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.show();
      } else {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .nou-dialog {
    z-index: 999;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .9);
    cursor: initial;
    overflow: auto;
  }

  .nou-dialog__container__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100%;
  }

  .nou-dialog__container {
    box-sizing: content-box;
    position: relative;
    margin: 1rem 0;
    width: 3.9rem; // 450 total
    max-width: 100%;
    padding: 0.3rem;
    border-radius: 0.08rem;
    background: #121212;
    text-align: left;

    @media (max-width: 750px) {
      margin: 1rem .4rem;
      width: 5.9rem;
      padding: .4rem;

      &.fixed-mobile {
        position: fixed;
        top: initial;
        bottom: 0;
        left: 50%;
        margin: 0;
        transform: translate3d(-50%, 0, 0);
      }
    }
  }

  .nou-dialog__close {
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
    width: 24px;
    cursor: pointer;
    transition: opacity .3s;
    @media (max-width: 750px) {
      right: 0.48rem;
      top: 0.48rem;
      width: .28rem;
    }

    &:hover {
      opacity: .6;
    }
  }

  .title__wrapper {
    position: relative;
  }

  .title__border {
    margin-top: 0.2rem;
    border-bottom: var(--border-common);

    @media (max-width: 750px) {
      margin-top: .4rem;
    }
  }

  .nou-dialog__title {
    margin: 0;
    padding: 0;
    color: #000;
    font-size: 0.18rem;
    line-height: 0.25rem;
    font-weight: 500;
    @media (max-width: 750px) {
      font-size: .36rem;
      line-height: .42rem;
      padding-bottom: .4rem;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s;
    transform: translateZ(0);
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  .fadeBack-enter-active, .fadeBack-leave-active {
    transition: opacity .5s;
  }

  .fadeBack-enter, .fadeBack-leave-active {
    opacity: 0;
  }

</style>
