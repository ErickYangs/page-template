import { getLocalStr, getTimes, getFixed, getFixedLocal, isEq } from "./count";

export const getDollarLabel = (val) => `$${getLocalStr(val)}`;

export const getPercentLabel = (val) =>
  `${getLocalStr(Number(getTimes(getFixed(val, 4), 100)))}%`;

export const getTokenCount = (val, fixedNum = 4) => {
  if (!val) {
    return "0";
  }
  const result = getFixed(val, fixedNum);
  if (isEq(result, 0) && !isEq(val, 0)) {
    // 0.000000123 => 0.0000001
    const len = val.split(".")[1].search(/[^0]/) + 1;
    return getFixed(val, len);
  }
  return getFixedLocal(val, fixedNum);
};

export const formatLongStr = (val, mid = "...", start = 4, end = 4) => {
  if (val.length <= start + end) {
    return val;
  }
  return `${val.substr(0, start)}${mid}${val.substr(val.length - end, end)}`;
};
