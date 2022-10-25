import BigNumber from "bignumber.js";
import { isNumber } from "@/utils/index";
import { TokenFloat } from "./enum";

BigNumber.set({
  EXPONENTIAL_AT: [-50, 50],
  DECIMAL_PLACES: 30,
});

const runMethod = (method, a, b) => new BigNumber(a)[method](b).toString();

export const isEq = (a, b) => new BigNumber(a).eq(b);
export const isLt = (a, b) => new BigNumber(a).lt(b);
export const isLte = (a, b) => new BigNumber(a).lte(b);
export const isGt = (a, b) => new BigNumber(a).gt(b);
export const isGte = (a, b) => new BigNumber(a).gte(b);

export const getMax = (a, b) => BigNumber.max(a, b).toString();

export const getDiv = (a, b) => runMethod("div", a, b); // /

export const getTimes = (a, b) => runMethod("times", a, b); // x

export const getTimesZero = (a, b) => {
  if (!a || !b || a === "0" || b === "0") {
    return "0";
  }
  return new BigNumber(a).times(b).toString();
};

export const getPlus = (a, b) => runMethod("plus", a, b); // +

export const getMinus = (a, b) => runMethod("minus", a, b); // -

export const getPow = (a, b) => runMethod("pow", a, b); //

export const getFixed = (val, fixed = 2, trailingZeros = false) => {
  const numStr = val || "0";
  if (trailingZeros) {
    return new BigNumber(numStr).toFixed(fixed);
  }
  return new BigNumber(numStr).decimalPlaces(fixed).toString();
};

export const getFixedLocal = (val, fixed = 2, trailingZeros = false) => {
  const numStr = val || "0";
  if (trailingZeros) {
    return new BigNumber(numStr).toFixed(fixed);
  }
  return new BigNumber(numStr).decimalPlaces(fixed).toNumber().toLocaleString();
};

export const getFixedFloor = (val, fixed = 2) => {
  const numStr = val || "0";
  const BN = BigNumber.clone();
  BN.config({ ROUNDING_MODE: BigNumber.ROUND_FLOOR });
  return new BN(numStr).decimalPlaces(fixed).toString();
};

export const getFixedFloorLocal = (val, fixed = 2) => {
  const numStr = val || "0";
  const BN = BigNumber.clone();
  BN.config({ ROUNDING_MODE: BigNumber.ROUND_FLOOR });
  return new BN(numStr).decimalPlaces(fixed).toNumber().toLocaleString();
};

export const getPercent = (a, b) => {
  // 0-1
  if (isEq(b, "0")) {
    return isGt(a, b) ? "1" : "0";
  }
  const result = getDiv(a, b);
  return getFixed(result, 4);
};

export const getLocalStr = (val) => new BigNumber(val).toFormat(2);
export const getIntegerLocalStr = (val) => Number(val).toLocaleString();

export const getIsInvalidInput = (numString) => {
  if (!numString.length) {
    return true;
  }
  const num = Number(numString);
  return !isNumber(num) || num <= 0;
};

export const getAmount = (amount, token, isFToken = false) => {
  if (isFToken) {
    return getTimes(amount, 10 ** 8);
  }
  return getTimes(amount, 10 ** TokenFloat[token]);
};
