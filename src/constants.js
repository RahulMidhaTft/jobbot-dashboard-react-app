export const LOCALES = ["en"];

export const PROBLEMS = {
  NONE: "NONE",
  CLIENT_ERROR: "CLIENT_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",
  CONNECTION_ERROR: "CONNECTION_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  CANCEL_ERROR: "CANCEL_ERROR",
};

export const DURATIONS = {
  DEFAULT: 5000,
  MEDIUM: 10000,
};

export const TIMEOUT_ERROR_CODES = ["ECONNABORTED"];
export const NODEJS_CONNECTION_ERROR_CODES = [
  "ENOTFOUND",
  "ECONNREFUSED",
  "ECONNRESET",
];

export const ACCENT_COLORS = [
  "#e4cfce",
  "#e6dccf",
  "#e1e6cf",
  "#d3e6cf",
  "#cfe6d8",
  "#cfe6e6",
  "#cfd8e6",
  "#d3cfe7",
  "#e2cfe7",
  "#e5dacf",
];

export const COLORS = {
  GRAY_100: "#f8f9fa",
  GRAY_200: "#e9ecef",
  GRAY_300: "#dee2e6",
  GRAY_500: "#adb5bd",
  GRAY_600: "#6c757d",
  GRAY_700: "#495057",
  GRAY_900: "#212529",
  MAASTRICHTBLUE: "#011627",
  MALIBU: "#99d5fa",
  ALICEBLUE: "#f5faff",
  DODGERBLUE: "#20a4f3",
  RED: "#fe5f55",
  // todo make uppercase
  primary: "#0738da",
  gunmetal: "#262d3d",
  manatee: "#969cac",
  getWhite: (opacity = 1) => `rgba(255,255,255,${opacity})`,
  getBlack: (opacity = 1) => `rgba(0,0,0,${opacity})`,
};

export const STYLES = {
  NONE: "none",
  LEFT: "left",
  DEFAULT: "default",
  POINTER: "pointer",
  SOLID: "solid",
  SHADOW_RED: "0 0 0 0.125rem rgb(254 95 85 / 25%)",
  SHADOW_BLUE: "0 0 0 0.125rem rgb(32 164 243 / 25%)",
  SHADOW_GRAY: "0 0 4px 0 #dee2e6",
};

export const KeyCodes = {
  Enter: 13,
};

export const SEARCH_DEBOUNCE_TIMEOUT = 400;

export const ALERT_COLORS = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
};
