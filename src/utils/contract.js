import BigNumber from "bignumber.js";
import {
  ERC20_ABI,
  MINT_TABLE_ERC721_ABI,
  DEBT_TOKEN_ABI,
  CRYPTO_PUNKS_ABI,
} from "./abi";

// eslint-disable-next-line no-unused-vars
export const sendETHTransaction = async (
  client,
  account = "",
  contract = "",
  abiItem = {},
  params,
  isETH = false,
  agr = ""
) => {
  console.log("send");
  console.log("account", account);
  console.log("contract", contract);
  console.log("abiItem", abiItem);
  console.log("params", params);
  console.log("agr", agr);
  const web3 = client;
  let data = "";
  let value = "0";
  if (isETH) {
    // @ts-ignore
    if (params instanceof Array) {
      data = await web3.eth.abi.encodeFunctionCall(abiItem, params);
      // eslint-disable-next-line prefer-destructuring
      value = params[0];
    } else if (agr instanceof Array) {
      data = await web3.eth.abi.encodeFunctionCall(abiItem, agr);
      value = params;
    } else {
      data = await web3.eth.abi.encodeFunctionCall(abiItem, []);
      value = params;
    }
  } else {
    data = await web3.eth.abi.encodeFunctionCall(abiItem, params);
  }

  // @ts-ignore
  const nonce = await web3.eth.getTransactionCount(account);
  // @ts-ignore
  let gasPrice = await web3.eth.getGasPrice();
  //   if (dapp.isOnto) {
  //     gasPrice = 0;
  //   }
  console.warn("gasPrice", gasPrice);
  const signParams = {
    from: account || "",
    to: contract,
    value,
    // gas: 1000000,
    gasPrice,
    data,
    nonce,
  };
  let gas = await web3.eth.estimateGas(signParams);
  gas = new BigNumber(gas).times("1.2").toFixed(0);
  signParams.gas = gas;
  console.log("signParams", JSON.stringify(signParams));
  return new Promise((resolve, reject) => {
    web3.eth
      .sendTransaction(signParams)
      .on("transactionHash", async (res) => {
        console.log("res1", res);
        if (res.indexOf("0x") > -1) {
          //   const encode = SaltAddress(account, res);
          //   await selfApi.uploadHash(account, encode, res);
          resolve(res);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            err: res,
          });
        }
      })
      .on("error", (err) => {
        console.log("err2", err);
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          err,
        });
      });
  });
};

export const approveCheck = async (
  client,
  account = "",
  underlying_address = "",
  lock_address = "",
  float = 18
) => {
  const web3 = client;
  console.log("client", web3);
  // @ts-ignore
  console.log("underlying_address", underlying_address);
  const Token = new web3.eth.Contract(
    JSON.parse(ERC20_ABI),
    underlying_address
  );
  // console.log("Token", Token);
  // eslint-disable-next-line no-useless-catch
  try {
    console.log("account", account, "lock_address", lock_address);
    const balance = await Token.methods.allowance(account, lock_address).call();
    console.log("balance", balance);
    const minTokenAmountToApprove = new BigNumber("99")
      .shiftedBy(Number(float))
      .toString();
    if (Number(balance) < Number(minTokenAmountToApprove)) {
      return {
        flag: false,
        balance,
      };
    }
    return {
      flag: true,
      balance,
    };
  } catch (e) {
    throw e;
  }
};

export const approveCheckDebt = async (
  client,
  account = "",
  underlying_address = "",
  lock_address = "",
  float = 18
) => {
  const web3 = client;
  console.log("client", web3);
  // @ts-ignore
  console.log("underlying_address", underlying_address);
  const Token = new web3.eth.Contract(
    JSON.parse(DEBT_TOKEN_ABI),
    underlying_address
  );
  // console.log("Token", Token);
  // eslint-disable-next-line no-useless-catch
  try {
    console.log("account", account, "lock_address", lock_address);
    const balance = await Token.methods
      .borrowAllowance(account, lock_address)
      .call();
    console.log("balance", balance);
    const minTokenAmountToApprove = new BigNumber("99")
      .shiftedBy(Number(float))
      .toString();
    if (Number(balance) < Number(minTokenAmountToApprove)) {
      return {
        flag: false,
        balance,
      };
    }
    return {
      flag: true,
      balance,
    };
  } catch (e) {
    throw e;
  }
};

export const approveAction = async (
  client,
  account = "",
  underlying_address = "",
  lock_address = "",
  float = 18
) => {
  console.log("account", account);
  console.log("underlying_address", underlying_address);
  console.log("lock_address", lock_address);
  let amount = 999999999999999999;
  console.log("amount", amount);
  const web3 = client;
  const Token = new web3.eth.Contract(
    JSON.parse(ERC20_ABI),
    underlying_address
  );
  const tokenAmountToApprove = new BigNumber(amount)
    .shiftedBy(Number(float))
    .toString();
  console.log("tokenAmountToApprove", tokenAmountToApprove);
  const tx = await Token.methods
    .approve(lock_address, tokenAmountToApprove)
    .send({
      from: account,
    });
  console.log("approveAction tx", tx);
  // const encode = SaltAddress(account, tx.transactionHash);
  // await selfApi.uploadHash(account, encode, tx.transactionHash);
  return {
    tx,
  };
};

export const approveActionDebtAsync = async (
  client,
  account = "",
  underlying_address = "",
  lock_address = "",
  float = 18
) => {
  console.log("account", account);
  console.log("underlying_address", underlying_address);
  console.log("lock_address", lock_address);
  let amount = 999999999999999999;
  console.log("amount", amount);
  const web3 = client;
  const Token = new web3.eth.Contract(
    JSON.parse(DEBT_TOKEN_ABI),
    underlying_address
  );
  const tokenAmountToApprove = new BigNumber(amount)
    .shiftedBy(Number(float))
    .toString();
  console.log("tokenAmountToApprove", tokenAmountToApprove);
  return new Promise((resolve, reject) => {
    Token.methods
      .approveDelegation(lock_address, tokenAmountToApprove)
      .send({
        from: account,
      })
      .on("transactionHash", async (res) => {
        console.log("res1", res);
        if (res.indexOf("0x") > -1) {
          resolve(res);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            err: res,
          });
        }
      })
      .on("error", (err) => {
        console.log("err2", err);
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          err,
        });
      });
  });
};

export const approve721Action = async (
  client,
  account = "",
  underlying_address = "",
  lock_address = ""
) => {
  // console.log("account", account);
  // console.log("underlying_address", underlying_address);
  // console.log("lock_address", lock_address);
  const web3 = client;
  const Token = new web3.eth.Contract(
    JSON.parse(MINT_TABLE_ERC721_ABI),
    underlying_address
  );
  return new Promise((resolve, reject) => {
    Token.methods
      .setApprovalForAll(lock_address, true)
      .send({
        from: account,
      })
      .on("transactionHash", async (res) => {
        console.log("res1", res);
        if (res.indexOf("0x") > -1) {
          resolve(res);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            err: res,
          });
        }
      })
      .on("error", (err) => {
        console.log("err2", err);
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          err,
        });
      });
  });
};

export const approveCheckErc721 = async (
  client,
  account = "",
  underlying_address = "",
  lock_address = ""
) => {
  const web3 = client;
  // console.log("client", web3);
  // @ts-ignore
  // console.log("underlying_address", underlying_address);
  const Token = new web3.eth.Contract(
    JSON.parse(MINT_TABLE_ERC721_ABI),
    underlying_address
  );
  // console.log("Token", Token);
  // eslint-disable-next-line no-useless-catch
  try {
    // console.log("account", account, "lock_address", lock_address);
    const isAll = await Token.methods
      .isApprovedForAll(account, lock_address)
      .call();
    return isAll;
  } catch (e) {
    throw e;
  }
};

export const approveCryptoAction = async (
  client,
  account = "",
  underlying_address = "",
  lock_address = "",
  tokenId
) => {
  // console.log("account", account);
  // console.log("underlying_address", underlying_address);
  // console.log("lock_address", lock_address);
  const web3 = client;
  const Token = new web3.eth.Contract(
    JSON.parse(CRYPTO_PUNKS_ABI),
    underlying_address
  );
  return new Promise((resolve, reject) => {
    Token.methods
      .offerPunkForSaleToAddress(tokenId, "0", lock_address)
      .send({
        from: account,
      })
      .on("transactionHash", async (res) => {
        console.log("res1", res);
        if (res.indexOf("0x") > -1) {
          resolve(res);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            err: res,
          });
        }
      })
      .on("error", (err) => {
        console.log("err2", err);
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          err,
        });
      });
  });
};

export const approveCheckCrypto = async (
  client,
  account = "",
  underlying_address = "",
  lock_address = "",
  tokenId
) => {
  const web3 = client;
  // console.log("client", web3);
  // @ts-ignore
  // console.log("underlying_address", underlying_address);
  const Token = new web3.eth.Contract(
    JSON.parse(CRYPTO_PUNKS_ABI),
    underlying_address
  );
  // console.log("Token", Token);
  // eslint-disable-next-line no-useless-catch
  try {
    // console.log("account", account, "lock_address", lock_address);
    const result = await Token.methods.punksOfferedForSale(tokenId).call();
    if (result.isForSale && result.onlySellTo === lock_address) {
      return true;
    }
    return false;
  } catch (e) {
    throw e;
  }
};
