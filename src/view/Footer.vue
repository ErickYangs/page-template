<template>
  <div class="footer">
    <a href="https://discord.gg/yZeArHW9mQ" target="_blank">
      <img src="../assets/images/social_discord.svg" alt="" />
    </a>
    <a href="https://twitter.com/goshen_network" target="_blank">
      <img src="../assets/images/social_twitter.svg" alt="" />
    </a>
    <a href="https://medium.com/@goshen" target="_blank">
      <img src="../assets/images/social_blog.svg" alt="" />
    </a>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 60px;
  padding: 0 60px;
  background: #08112c;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  a {
    margin-right: 40px;
    width: 20px;
    height: 20px;
    display: block;
    img {
      display: block;
    }
  }
  @media (max-width: 750px) {
    height: 16vw;
    padding: 0 16vw;
    justify-content: center;
    a {
      margin-right: 8vw;
      &:nth-last-of-type(1) {
        margin-right: 0;
      }
    }
  }
}
</style>
