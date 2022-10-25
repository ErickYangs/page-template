import { createStore } from "vuex";

export default createStore({
  state: {
    useClient: null,
    userAddress: "",
    userWalletBalance: {},
  },
  getters: {},
  mutations: {
    SET_USE_CLIENT(state, payload) {
      state.useClient = payload;
    },
    SET_USER_ADDRESS(state, payload) {
      state.userAddress = payload;
    },
    SET_USER_WALLET_BALANCE(state, payload) {
      state.userWalletBalance = payload;
    },
  },
  actions: {},
  modules: {},
});
