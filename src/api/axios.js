import axios from "axios";
import { config } from "../config";

export default axios.create({
  //   baseURL: process.env.REACT_APP_BACKEND_URL,
  baseURL: config.api.ngrok,
  timeout: 30000,
});

export const axiosPrivate = axios.create({
  //   baseURL: process.env.REACT_APP_BACKEND_URL,
  baseURL: config.api.ngrok,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `JWT ${token}`,
  },
  timeout: 30000,
  withCredentials: true,
});
