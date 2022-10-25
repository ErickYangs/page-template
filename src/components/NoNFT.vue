<template>
  <div>
    <h2 v-t="'no_nft_page_title'" />
    <div class="image-list">
      <a
        :href="item.externalLink"
        v-for="(item, idx) in list"
        :key="idx"
        target="_blank"
        rel="no referer, no opener"
      >
        <img :src="item.nftCoverImage" alt="" />
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  list: {
    type: Array,
    require: true,
    default: [],
  },
});
</script>

<style lang="scss" scoped>
h2 {
  width: 100%;
  max-width: 3.4rem;
  margin: 0 auto;
  text-align: center;
}
.image-list {
  margin-top: 0.3rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 0.3rem;
  grid-row-gap: 0.3rem;

  img {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 0.08rem;
    background: rgba(0, 175, 124, 0.2);
  }
}
</style>
