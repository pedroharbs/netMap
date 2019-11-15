import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000"
});

api.interceptors.request.use(config => {
  const token = "Bearer " + localStorage.getItem("authToken");
  config.headers.Authorization = token;

  return config;
});

export default api;
