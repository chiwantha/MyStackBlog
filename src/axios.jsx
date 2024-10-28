import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://192.168.8.101:8800/server",
  withCredentials: true,
});
