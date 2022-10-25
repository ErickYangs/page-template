<template>
    <div class="header">
        <a :href="homeLink" rel="no referer, no opener">
            <img class="header__logo" src="../../assets/images/logo.svg" alt="wing">
        </a>
        <Nav class="header__nav" :list="navData" />

    </div>
</template>


<script setup>
import userHeader from './useHeader';
import Nav from './Nav.vue';

const { navData, homeLink } = userHeader();
</script>

<style lang="scss" scoped>
.header {
    margin-left: auto;
    margin-right: auto;
    max-width: 1280px;
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    height: 90px;
    line-height: 90px;

    &>* {
        align-self: center;
    }

    @media (max-width: 984px) {
        display: none;
    }
}

.header__logo {
    height: 28px;
    vertical-align: middle;
}

.header__nav {
    margin-left: auto;
}
</style>
