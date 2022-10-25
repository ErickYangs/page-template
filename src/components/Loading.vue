<template>
  <div class="loading">
    <svg class="circular" viewBox="0 0 50 50">
      <circle
        cx="25px"
        cy="25px"
        r="12"
        fill="none"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  width: 0.8rem;
  display: inline-block;
  position: relative;
  border-radius: 50%;
  background: var(--green-background-dark);

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  .circular {
    position: absolute;
    top: 0;
    left: 0;
    animation: rotate 3s linear infinite;
  }

  circle {
    animation: circle-dash 3s ease-in-out infinite;
    stroke: var(--color-green);
  }
}

@keyframes circle-dash {
  0% {
    stroke-dasharray: 1, 125;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 60, 75;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 60, 75;
    stroke-dashoffset: -75px;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
