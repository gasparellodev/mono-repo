import axios from "axios";

const api = axios.create({
  // ToDO: Change to use environment variables
  baseURL: "https://eujogoservice-production.up.railway.app/api",
});

export { api };
