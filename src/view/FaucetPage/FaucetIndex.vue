<template>
  <div class="faucet-lay">
    <div class="g-container">
      <div class="g-font-bold faucet_title">{{ t("faucet_title") }}</div>
      <div class="faucet_desc">
        {{ t("faucet_desc") }}<br />
        {{ t("token_number") }}
      </div>
      <div class="form">
        <div class="label">
          {{ t("testNet_address") }}
        </div>
        <input
          class="input__inner"
          type="text"
          v-model="address"
          :placeholder="t('place_desc')"
        />
        <CommonButton
          :disabled="disabled"
          type="submit"
          @click="handlerTransfer"
          :label="t('apply')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { getUserTransfer } from "../../api/coin";
import { ElNotification } from "element-plus";
import CommonButton from "../../components/CommonButton.vue";

const { t } = useI18n();

const address = ref("");
const disabled = ref(false);

const handlerTransfer = async () => {
  if (!address.value) {
    return ElNotification.error(t("no_address"));
  }
  disabled.value = true;
  try {
    const result = await getUserTransfer(address.value);
    if (result.Error !== 0) {
      ElNotification.error(t("apply_fail"));
    } else {
      ElNotification.success(t("apply_success"));
    }
  } catch (error) {
    ElNotification.error(t("apply_fail"));
  }
  disabled.value = false;
};
</script>

<style lang="scss" scoped>
.faucet-lay {
  width: 100%;
  min-height: 100vh;
  background: #08112c;
  padding-top: 180px;
  color: #fff;
}
.g-container {
  max-width: 700px;
}
.faucet_title {
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 8px;
}
.faucet_desc {
  font-size: 18px;
  line-height: 34px;
}
.form {
  margin-top: 40px;
}
.label {
  font-weight: 600;
}

.input__inner {
  outline: none;
  margin: 10px 0 40px;
  display: block;
  width: 100%;
  border: 1px solid #677181;
  border-radius: 10px;
  padding: 14px 12px;
}
</style>
