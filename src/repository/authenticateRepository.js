import axios from "axios";
import { apiPaths } from "../constant/apiPaths";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export const authenticateRepository = {
  login: async ({ username, password }) => {
    const response = await axios.post(apiPaths.login, {
      username: username,
      password: password,
    });
    return response.data;
  },
  logout: async (refreshToken) => {
    const response = await axios.post(apiPaths.logout, {
      refreshToken: refreshToken,
    });
    return response.data;
  },
  signup: async (values) => {
    const response = await axios.put(apiPaths.signup, values);
    return response.data;
  },
};
