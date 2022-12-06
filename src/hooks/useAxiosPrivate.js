import { useContext, useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import AuthContext from "../store/auth-context";

export const useAxiosPrivate = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // Add interceptors here
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers?.["Authorization"]) {
          config.headers = {
            Authorization: `Bearer ${authContext.token}`,
          };
        }
        return config;
      },
      (error) => Promise.reject(error)
    );


    return () => {
      axiosPrivate.interceptors.response.eject(requestIntercept);
    };
  }, [authContext]);

  return axiosPrivate;
};
