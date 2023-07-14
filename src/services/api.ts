import axios from "axios";
import { AppError } from "@utils/AppError";

const api = axios.create({
  baseURL: "http://127.0.0.1:4000",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }
    return Promise.reject(error);
  }
);

export { api };