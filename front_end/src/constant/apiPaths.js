const baseURL = "localhost:8000/";
export const apiPaths = {
  login: baseURL + "authentication/login",
  logout: baseURL + "v1/auth/logout",
  getAll: baseURL + "comics/getall",
  getChapter: baseURL + "comics/chapters/",
  getImages: baseURL + "comics/chapter_img/",
  search: baseURL + "v1/search/",
  signup: baseURL + "authentication/signup",
};
