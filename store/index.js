import Vuex from "vuex";

export const state = {
  account: {},
  accounts: [],
  categories: [],
  transactions: [],
};

export const getters = {
  getAccount: (state) => state.account,
  getAccounts: (state) => state.accounts,
  getTransactions: (state) => state.transactions,
  getCategories: (state) => state.categories,
};

export const mutations = {
  SET_ACCOUNT(state, account) {
    state.account = account;
  },
  SET_ACCOUNT_NAME(state, name) {
    state.account.name = name;
  },
  SET_ACCOUNTS(state, accounts) {
    state.accounts = accounts;
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_TRANSACTIONS(state, transactions) {
    state.transactions = transactions;
  },
};

export const actions = {
  async editAccount({ commit }, account) {
    return this.$axios.$put("/accounts/" + account.id, {
      name: account.name,
    });
  },
  async loadAccount({ commit }, id) {
    this.$axios
      .$get("/accounts/" + id)
      .then((response) => commit("SET_ACCOUNT", response));
  },
  async loadAccounts({ commit }) {
    const accounts = await this.$axios.$get("/accounts");
    commit("SET_ACCOUNTS", accounts);
  },
  async deleteAccount({ commit, dispatch }, id) {
    this.$axios
      .$delete("/accounts/" + id)
      .then((response) => dispatch("loadAccounts"));
  },
  async loadCategories({ commit }) {
    const categories = await this.$axios.$get("/categories");
    commit("SET_CATEGORIES", categories);
  },
  async deleteCategory({ commit, dispatch }, id) {
    this.$axios
      .$delete("/categories/" + id)
      .then((response) => dispatch("loadCategories"));
  },
  async loadTransactions({ commit }, month) {
    const transactions = await this.$axios.$get("/transactions?type=" + month);
    commit("SET_TRANSACTIONS", transactions);
  },
  async deleteTransaction({ commit, dispatch }, id) {
    this.$axios
      .$delete("/transactions/" + id)
      .then((response) => dispatch("loadTransactions"));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
