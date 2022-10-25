import request from "./request.js";

export const getUserTransfer = async (address) => {
  return request({
    url: "/api/v1/asset/transfer/" + address,
  });
};
