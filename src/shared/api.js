import axios from "axios";

// Create instance
let instance = axios.create({
  baseURL: `http://localhost:5000/api/`,
});

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default instance;
