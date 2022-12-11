export const endpoints = {
  dashboard: {
    count: "/api/dashboard/count", // mockUrl
    // count: "/dashboard/allData", // ngrokApiUrl

    data: "/api/dashboard/data", // mockUrl
    // data: "/dashboard/profiles?offset=0", // ngrokApiUrl
  },
  auth: {
    login: "/api/auth/login", // mockUrl
    // login: "/dashboard/login", // ngrokApiUrl

    logout: "/api/auth/logout", // mockUrl
    // logout: "/dashboard/logout", // ngrokApiUrl
  },
};
