import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      accounts: [],
      categories: [],
      transactions: []
    },
    mutations: {
      setAccounts(state, accounts) {
        state.accounts = accounts;
      },
      setCategories(state, categories) {
        state.categories = categories;
      },
      setTransactions(state, transactions) {
        state.transactions = transactions;
      }
    },
    actions: {
      async loadAccounts({ commit }) {
        const accounts = await this.$axios.$get(
          "http://api.panimtechnology.com/api/accounts"
        );
        commit("setAccounts", accounts);
      },
      async loadCategories({ commit }) {
        const categories = await this.$axios.$get(
          "http://api.panimtechnology.com/api/categories"
        );
        commit("setCategories", categories);
      },
      async loadTransactions({ commit }) {
        const transactions = await this.$axios.$get(
          "http://api.panimtechnology.com/api/transactions"
        );
        commit("setTransactions", transactions);
      }
    },
    getters: {
      getAccounts(state) {
        return state.accounts;
      },
      getTransactions(state) {
        return state.transactions
      }
    }
  });
};
export default createStore;
