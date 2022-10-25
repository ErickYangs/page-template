<template>
  <div>
    <div v-if="step === FormStep.Form">
      <slot />
    </div>
    <Success v-else-if="step === FormStep.Success" :hash="hash" />
    <CollateralizeSuccess
      v-else-if="step === FormStep.CollateralizeSuccessful"
      :hash="hash"
    />
    <Failed v-else-if="step === FormStep.Failed" :hash="hash" />
    <Pending v-else-if="step === FormStep.Pending" />
    <ApprovePending v-else-if="step === FormStep.ApprovePending" />
  </div>
</template>

<script setup>
import { FormStep } from "@/utils/enum";
import ApprovePending from "./ApprovePending.vue";
import CollateralizeSuccess from "./CollateralizeSuccess.vue";
import Failed from "./Failed.vue";
import Pending from "./Pending.vue";
import Success from "./Success.vue";

defineProps({
  hash: { type: String, required: true, default: "" },
  step: { type: String, required: true, default: FormStep.Form },
});
</script>
