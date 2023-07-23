import axios from "axios";
import { AppError } from "@utils/AppError";

const api = axios.create({
  // ToDO: Change to use environment variables
  baseURL: "https://eujogoservice-production.up.railway.app/api",
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
