<template>
  <div
    class="button"
    :class="{
      block: block,
      go: type === 'go',
      span: type === 'span',
      primary: type === 'primary',
      submit: type === 'submit',
      link: type === 'link',
      insure: type === 'insure',
    }"
    @click="clickHandler"
    role="button"
    :aria-disabled="disabled ? 'true' : 'false'"
    tabIndex="0"
    :aria-label="label"
  >
    <img
      v-if="disabled"
      class="loading"
      src="../assets/images/ellipse.svg"
      alt=""
    />
    <slot>
      <span class="button__label">{{ label }}</span>
      <i v-if="type === 'go'" class="iconfont iconArrow_Right icon--go"></i>
    </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: [String, Number], required: true },
  disabled: { type: Boolean, required: false, default: false },
  block: { type: Boolean, required: false, default: false },
  type: { type: String, required: false, default: "primary" },
});
const emit = defineEmits(["click"]);

const clickHandler = (e) => {
  if (props.disabled) {
    return;
  }
  emit("click", e);
};
</script>

<style lang="scss" scoped>
.button {
  display: inline-block;
  cursor: pointer;
  transition: opacity 0.3s, background-color 0.3s;
  outline: none;

  &.block {
    display: block;
  }

  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.3;
  }

  &.go {
    .button__label {
      vertical-align: middle;
      color: var(--color-green);
      font-size: 0.2rem;
      font-weight: 500;
      line-height: 0.2rem;

      @media (max-width: 750px) {
        font-size: 0.3rem;
        line-height: 0.4rem;
      }
    }

    &:not([aria-disabled="true"]) {
      &:hover,
      &:focus {
        opacity: 0.6;

        .icon--go {
          transform: translateX(0.1rem);
        }
      }
    }
  }

  &.span {
    padding: 0.07rem 0.2rem;
    line-height: 0.18rem;
    background: var(--green-background);
    color: rgba(0, 175, 124, 1);
    font-size: 0.14rem;

    @media (max-width: 750px) {
      font-size: 0.26rem;
    }
  }

  &.primary {
    padding: 0.12rem 0.2rem;
    border-radius: 0.08rem;
    border: 2px solid var(--color-green);
    color: #fff;
    font-size: 0.14rem;
    line-height: 0.2rem;
    font-weight: 700;
    transition: all 0.3s;

    &:not([aria-disabled="true"]) {
      &:hover,
      &:focus {
        opacity: 0.8;
      }
    }

    @media (max-width: 750px) {
      font-size: 0.26rem;
      line-height: 0.9rem;
      padding: 0;
      height: 0.9rem;
    }
  }

  &.submit {
    font-size: 0.14rem;
    font-weight: 600;
    text-align: center;
    background: linear-gradient(
      90deg,
      #00d67c 0%,
      #b6f3d7 66.15%,
      #dbf059 100%
    );
    height: 0.46rem;
    line-height: 0.46rem;
    width: 100%;
    border-radius: 0.08rem;

    &[aria-disabled="true"] {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &:not([aria-disabled="true"]) {
      &:hover,
      &:focus {
        background: linear-gradient(
          90deg,
          rgba(0, 214, 124, 0.6) 0%,
          rgba(182, 243, 215, 0.6) 66.15%,
          rgba(219, 240, 89, 0.6) 100%
        );
      }
    }
    @media (max-width: 750px) {
      font-size: 0.26rem;
      height: 0.9rem;
      line-height: 0.9rem;
    }
  }

  &.link {
    font-size: 0.12rem;
    line-height: 0.17rem;
    color: var(--color-green);

    &:not([aria-disabled="true"]) {
      &:hover,
      &:focus {
        opacity: 1;
        text-decoration: underline;
      }
    }

    @media (max-width: 750px) {
      font-size: 0.24rem;
      line-height: 0.28rem;
    }
  }

  &.insure {
    padding: 0.1rem 0.2rem;
    border-radius: 0.04rem;
    background: #c93e6c;
    font-size: 0.14rem;
    line-height: 0.2rem;
    font-weight: 500;
    transition: all 0.3s;

    &:not([aria-disabled="true"]) {
      &:hover,
      &:focus {
        opacity: 1;
        background: #ff2a70;
      }
    }

    @media (max-width: 750px) {
      font-size: 0.26rem;
      line-height: 0.38rem;
    }
  }
}

.icon--go {
  margin-left: 0.1rem;
  font-size: 0.14rem;
  color: var(--color-green);
  vertical-align: middle;
  transition: transform 0.3s;
  display: inline-block;

  @media (max-width: 750px) {
    font-size: 0.26rem;
  }
}
.loading {
  margin-right: 0.12rem;
  animation: rotate 2s infinite linear;
  height: 12px;
}

@keyframes rotate {
  from {
    transform: rotate(0);
    transform-origin: left center;
  }

  to {
    transform: rotate(360deg);
    transform-origin: left center;
  }
}
</style>
