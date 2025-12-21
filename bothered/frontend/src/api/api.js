import axios from "axios";

const api = axios.create({
  baseURL: "https://bothered.onrender.com",
});

export default api;
