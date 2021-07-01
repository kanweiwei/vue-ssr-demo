import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const createStore = () => {
  return new Vuex.Store({
    state: () => {
      return {
        articles: [],
      };
    },
    mutations: {
      setArticles(state, data) {
        state.articles = data;
      },
    },
    actions: {
      async getArticles({ commit }) {
        const { data } = await axios.get(
          "https://conduit.productionready.io/api/articles",
          {
            params: {
              offset: 0,
              limit: 10,
            },
          }
        );
        commit("setArticles", data.articles);
      },
    },
  });
};
