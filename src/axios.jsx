import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://192.168.8.100:8800/server",
  withCredentials: true,
});
