import axios from "axios";
import { apiPaths } from "../constant/apiPaths";

export const productRepository = {
  getAllComics: async () => {
    const response = await axios.get(apiPaths.getAll);
    return response.data;
  },
  getChaptersByName: async (title) => {
    const response = await axios.get(apiPaths.getChapter + title);
    return response.data;
  },
  getComicImages: async (title) => {
    const response = await axios.get(apiPaths.getImages + title);
    return response.data;
  },
  searchProducts: async (keyword) => {
    const response = await axios.get(apiPaths.search, {
      params: {
        keyword: keyword,
      },
    });
    return response.data;
  },
};
