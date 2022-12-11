import humps from "humps";
import axios from "axios";
import { cond, always, __, includes, T } from "ramda";
import {
  PROBLEMS,
  TIMEOUT_ERROR_CODES,
  NODEJS_CONNECTION_ERROR_CODES,
} from "../constants";

import { in400s, in500s, pageToOffset } from "./helpers";

export function saveOriginalInterceptor(res) {
  res.originalData = res.data;
  return res;
}

export function camelizeInterceptor(res) {
  if (res.data instanceof window.Blob) {
    return res;
  }

  res.data = humps.camelizeKeys(res.data, (key, convert, options) => {
    if (key === "_id") return key;
    return convert(key, options);
  });
  return res;
}

export function decamelizeInterceptor(req) {
  req.data = humps.decamelizeKeys(req.data);
  req.params = humps.decamelizeKeys(req.params);
  return req;
}

export function pageToOffsetInterceptor(req) {
  if (req.params && req.params.page) {
    const { page, limit, ...params } = req.params;
    const offset = pageToOffset(page, limit);
    req.params = { ...params, offset, limit };
  }

  return req;
}

export function errorInterceptor(error) {
  if ("onLine" in window.navigator) {
    const { onLine } = window.navigator;

    error.onLine = onLine;
  }

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    error.response.data = humps.camelizeKeys(error.response.data);
    error.problem = getProblemFromStatus(error.response.status);
    return Promise.reject(error);
  } else {
    // Something happened in setting up the request that triggered an Error
    error.problem = getProblemFromError(error);
    return Promise.reject(error);
  }
}

const getProblemFromStatus = (status) => {
  return cond([
    [in400s, always(PROBLEMS.CLIENT_ERROR)],
    [in500s, always(PROBLEMS.SERVER_ERROR)],
    [T, always(PROBLEMS.UNKNOWN_ERROR)],
  ])(status);
};

const getProblemFromError = (error) => {
  if (error.message === "Network Error") return PROBLEMS.NETWORK_ERROR;
  if (axios.isCancel(error)) return PROBLEMS.CANCEL_ERROR;

  return cond([
    [includes(__, TIMEOUT_ERROR_CODES), always(PROBLEMS.TIMEOUT_ERROR)],
    [
      includes(__, NODEJS_CONNECTION_ERROR_CODES),
      always(PROBLEMS.CONNECTION_ERROR),
    ],
    [T, always(PROBLEMS.UNKNOWN_ERROR)],
  ])(error.code);
};

export function reformatArrayInterceptor(req) {
  if (req.params) {
    Object.keys(req.params).forEach((key) => {
      if (Array.isArray(req.params[key])) {
        req.params[key] = req.params[key].join(",");
      }
    });
  }
  return req;
}
