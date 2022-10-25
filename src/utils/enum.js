export const WalletType = {
  META_MASK: "metamask",
  ONTO_EX: "onto-ex",
  WALLET_CONNECT: "wallet-connect",
  COINBASE: "coinbase",
  META_X: "meta-x",
};

export const CacheName = {
  Login: "wing-login-address",
  WalletType: "wallet-type",
};

export const FormStep = {
  Form: "form",
  Pending: "pending",
  ApprovePending: "approve_pending",
  Success: "success",
  Failed: "failed",
  CollateralizeSuccessful: "collateralize_successful",
};

export const AuctionSelectOption = {
  Active: "active",
  Liquidated: "liquidated",
};

export const MyAuctionSelectOption = {
  MyBids: "my_bids",
  MyLiquidation: "my_liquidation",
};

export const DefaultTimer = 3000;
export const DefaultTimerLong = 8000;

export const RESERVE_BALANCE = "0.1";

export const DEBT_PERCENT = "0.01";

export const TokenFloat = {
  ETH: 18,
  WING: 9,
};

export const ContractAddress = {
  WETHGateway: import.meta.env.VITE_APP_WETHGateway,
  PUNKGateway: import.meta.env.VITE_APP_PUNKGateway,
  BWETH: import.meta.env.VITE_APP_BToken,
  WING: import.meta.env.VITE_APP_WING,
  INSURANCE_POOL: import.meta.env.VITE_APP_INSURANCE_POOL,
  BEND_PROTOCOL: import.meta.env.VITE_APP_BEND_PROTOCOL,
  DEBT_TOKEN: import.meta.env.VITE_APP_DEBT_TOKEN,
};

export const NFTTypeSelectOption = {
  erc721: "erc721",
  punk: "punk",
};
