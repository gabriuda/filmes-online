import axios from "axios";

export const apiKey = "ec490a7c79c446c6e9ea970a40364670";
export const language = "language=pt-BR";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const tmdbApi = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },

  async getFilmesBuscados(endpoint) {
    const response = await axiosInstance.get(
      `/search/movie?${endpoint}&api_key=${apiKey}&${language}`
    );
    return response.data;
  },
  async getFilmesCategoria(endpoint) {
    const response = await axiosInstance.get(
      `/discover/movie?api_key=${apiKey}&with_genres=${endpoint}&${language}`
    );
    return response.data;
  },
};
