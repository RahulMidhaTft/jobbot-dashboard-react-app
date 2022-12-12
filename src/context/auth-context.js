import React, { useCallback, useEffect, useState, createContext } from "react";

import { ngrokApi } from "../lib/api/ngrok-api";

export const AuthContext = createContext({
  logout: () => null,
  login: () => null,
  refreshUser: () => null,
  user: null,
  data: null,
  token: null,
  isLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);

  const logout = useCallback(() => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  }, []);

  const login = useCallback((token) => {
    setToken(token);
    localStorage.setItem("token", token);
  }, []);

  const refreshUser = async () => {
    const { data: user } = await ngrokApi.getUser();
    setUser(user);
  };

  useEffect(() => {
    if (token) {
      ngrokApi.setDefaultHeader({
        header: "Authorization",
        value: `JWT ${token}`,
      });

      // const fetchUser = async () => {
      //   try {
      //     const { data: user } = await ngrokApi.getUser();
      //     setUser(user);
      //     setIsLoading(false);
      //     setIsLoggedIn(true);
      //   } catch (error) {
      //     console.error(error);
      //     logout();
      //   }
      // };

      const fetchAllData = async () => {
        try {
          const { data } = await ngrokApi.getAllData();
          setData(data);
          setIsLoading(false);
          setIsLoggedIn(true);
        } catch (error) {
          if ([401, 403].includes(error.response?.status)) {
            logout();
          }
        }
      };

      // fetchUser();
      fetchAllData();
    }
  }, [token, logout]);

  return (
    <AuthContext.Provider
      value={{ data, user, token, isLoggedIn, logout, login, refreshUser }}
    >
      {isLoading && token ? null : children}
    </AuthContext.Provider>
  );
};
