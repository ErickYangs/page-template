<template>
  <div class="mobile_nav">
    <div class="link_box">
      <ElCollapse accordion>
        <ElCollapseItem v-for="(item, index) in navData" :key="index">
          <template #title>
            <div @click="gopagePath(item)">{{ item.title }}</div>
          </template>
          <div class="nav_item" v-for="(ele, idx) in item.list" :key="idx">
            <div @click="gopagePath(ele)" class="mobile_link">
              {{ ele.text }}
            </div>
          </div>
        </ElCollapseItem>
      </ElCollapse>
    </div>
  </div>
</template>

<script setup>
import userHeader from './useHeader';

const emits = defineEmits(['showNav'])

const { navData } = userHeader();

const gopagePath = (data) => {
  if (!data.url) {
    return;
  }
  emits('showNav');

  if (data.url.indexOf('docs') < 0) {
    window.open(data.url, '_self');
  } else if (data.target) {
    window.open(data.url, data.target);
  } else {
    window.open(data.url);
  }
}
</script>

<style lang="scss" scoped>
.mobile_nav {
  padding: 0 20px;

  .link_box {
    .top_link {
      font-size: 14px;
      color: #fff !important;
      font-weight: 600;
      height: 56px;
      line-height: 56px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
      background: #000;
    }
  }

  .nav_item {

    .mobile_link,
    a {
      display: block;
      line-height: 16px;
      padding-bottom: 24px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 13px;
      text-align: left;
      transition: all 0.5s ease;

      &:hover {
        opacity: 0.7;
      }

      .nav-wailian-img {
        width: 11px;
        margin-left: 4px;
        opacity: 0.6;
      }
    }
  }

  .el-collapse {
    border-top: none;
  }

  :deep(.el-collapse-item__header) {
    font-size: 14px;
    color: #fff !important;
    font-weight: 600;
    height: 56px;
    line-height: 56px;
    border-bottom: none !important;
    background: #000;

    .el-icon-arrow-right {
      opacity: 0.1;
    }

    .el-icon-arrow-right:before {
      content: '';
      color: #000;
    }
    .el-collapse-item__arrow {
      display: none;
    }
  }

  :deep(.el-collapse-item__wrap) {
    border-bottom: none !important;
  }

  :deep(.el-collapse-item__header.is-active) {
    border-bottom: none !important;
  }

  :deep(.el-collapse-item) {
    border-bottom: 1px solid #131419 !important;

    .el-collapse-item__content {
      padding-bottom: 0;
      background: #000;
    }
  }

  :deep(.el-collapse-item:nth-last-of-type(1)) {
    border-bottom: none !important;

    .el-collapse-item__header {
      border-bottom: none;
    }

    .el-collapse-item__wrap {
      border-bottom: none;
    }
  }
}
</style>
