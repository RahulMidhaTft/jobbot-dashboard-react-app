export const formatMoney = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};

export const thousandsToK = (value) => {
  return value > 999 ? value / 1000 + "K" : value;
};
