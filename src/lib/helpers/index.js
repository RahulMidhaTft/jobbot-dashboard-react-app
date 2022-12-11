import { curry, gte, is } from "ramda";

export * from "./number-helpers";
export * from "./date-helpers";

export const removeHtmlTags = (str) => {
  return str.replace(/(<([^>]+)>)|((&lt;([^&]+)&gt;))/gi, "");
};

export function pageToOffset(page, limit) {
  return limit * (page - 1);
}

export const isWithin = curry((min, max, value) => {
  const isNumber = is(Number);
  return (
    isNumber(min) &&
    isNumber(max) &&
    isNumber(value) &&
    gte(value, min) &&
    gte(max, value)
  );
});

export const in400s = isWithin(400, 499);
export const in500s = isWithin(500, 599);

export function parseParams(querystring) {
  const params = new URLSearchParams(querystring);

  const obj = {};

  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key);
    } else {
      obj[key] = params.get(key);
    }
  }

  return obj;
}
