import Vue from "vue";
import Vuex from "vuex";
import { tmdbApi, apiKey, language } from "@/services/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categorias: null,
    filme: null,
    filmesBuscados: null,
    elencoBuscado: null,
    filmesPopulares: null,
    filmesDaCategoria: null,
  },
  mutations: {
    UPDATE_CATEGORIAS(state, payload) {
      state.categorias = payload;
    },
    UPDATE_FILME(state, payload) {
      state.filme = payload;
    },
    UPDATE_FILMES_BUSCADOS(state, payload) {
      state.filmesBuscados = payload;
    },
    UPDATE_FILMES_POPULARES(state, payload) {
      state.filmesPopulares = payload;
    },
    UPDATE_FILMES_DA_CATEGORIA(state, payload) {
      state.filmesDaCategoria = payload;
    },
    UPDATE_ELENCO_BUSCADO(state, payload) {
      state.elencoBuscado = payload;
    },
  },
  actions: {
    getCategorias(context) {
      return tmdbApi
        .get(`/genre/movie/list?api_key=${apiKey}&${language}`)
        .then((response) => {
          context.commit("UPDATE_CATEGORIAS", response.data);
        });
    },
    getFilme(context, payload) {
      return tmdbApi
        .get(`/movie/${payload}?api_key=${apiKey}&${language}`)
        .then((response) => {
          context.commit("UPDATE_FILME", response.data);
        });
    },
    getFilmesBuscados(context, payload) {
      return tmdbApi
        .get(`/search/movie?${payload}&api_key=${apiKey}&${language}`)
        .then((response) => {
          context.commit("UPDATE_FILMES_BUSCADOS", response.data);
        });
    },
    getElencoBuscado(context, payload) {
      return tmdbApi
        .get(`/search/person?${payload}&api_key=${apiKey}&${language}`)
        .then((response) => {
          context.commit("UPDATE_ELENCO_BUSCADO", response.data);
        });
    },
    getFilmesPopulares(context, payload) {
      return tmdbApi
        .get(
          `/movie/popular?api_key=${apiKey}&${language}${payload ? payload : ""
          }`
        )
        .then((response) => {
          context.commit("UPDATE_FILMES_POPULARES", response.data);
        });
    },
    getFilmesDaCategoria(context, idFilme, page) {
      return tmdbApi
        .get(
          `/discover/movie?page=${page ? page : 1
          }&api_key=${apiKey}&with_genres=${idFilme}&${language}`
        )
        .then((response) => {
          context.commit("UPDATE_FILMES_DA_CATEGORIA", response.data);
        });
    },
  },
  modules: {},
});
