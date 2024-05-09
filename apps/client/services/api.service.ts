import axios from "axios";

const baseURL =
  "http://localhost:3000/api" || process?.env?.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL,
});

export default api;
