import { createSharedComposable, useWindowSize } from "@vueuse/core";
import { computed } from "vue";

const useIsMobile = () => {
  const { width } = useWindowSize();

  return computed(() => width.value <= 750);
};

export default createSharedComposable(useIsMobile);
