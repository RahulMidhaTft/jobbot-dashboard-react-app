import axios, { AxiosInstance } from "axios"; //eslint-disable-line no-unused-vars
import axiosRetry from "axios-retry";
import { format } from "date-fns"; //eslint-disable-line

import { config } from "../config"; //eslint-disable-line no-unused-vars
import {
  camelizeInterceptor,
  decamelizeInterceptor,
  pageToOffsetInterceptor,
  reformatArrayInterceptor,
  saveOriginalInterceptor,
  errorInterceptor,
} from "../lib/axios-interceptors";

export const ApiKeys = {
  Dashboard: "dashboard",
  Profiles: "profiles",
  Profile: "profile",
  Subscriptions: "subscriptions",
};

class NgrokApi {
  constructor() {
    this.http = axios.create({
      // baseURL: config.api.ngrok,
      baseURL: process.env.REACT_APP_BACKEND_URL,
      timeout: 30000,
      headers: {},
    });

    axiosRetry(this.http, { retries: 3 });

    this.http.interceptors.response.use(camelizeInterceptor);
    this.http.interceptors.response.use(
      (response) => response,
      errorInterceptor
    );
    this.http.interceptors.response.use(saveOriginalInterceptor);

    this.http.interceptors.request.use(decamelizeInterceptor);
    this.http.interceptors.request.use(pageToOffsetInterceptor);
    this.http.interceptors.request.use(reformatArrayInterceptor);
  }

  setDefaultHeader = ({ header, value }) => {
    this.http.defaults.headers.common[header] = value;
  };

  removeDefaultHeader = (header) => {
    delete this.http.defaults.headers.common[header];
  };

  // login = (data) =>
  //   this.http.post("/dashboard/login/", { ...data });

  // getAllData = () => this.http.get("/dashboard/allData/");

  // getUser = () => this.http.get("/api/managers/me/"); // not available yet

  // getProfiles = () => this.http.get("/dashboard/profiles?offset=0");

  // getProfile = ({ id }) => this.http.get(`/dashboard/profile/${id}/`);

  // getSubscriptions = () => this.http.get("/dashboard/subs?offset=0");

  // getClicks = () => this.http.get("/dashboard/clicksdata/");

  // mock sever requests here
  login = (data) => this.http.post("/api/auth/login", { ...data });
  getAllData = () => this.http.get("/api/dashboard/count");
  getProfiles = () => this.http.get("/api/dashboard/data");
  getSubscriptions = () => this.http.get("/api/dashboard/data");
}

export const ngrokApi = new NgrokApi();
