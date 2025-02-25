import { ParamType } from "../model/url";
import { v4 as uuidv4 } from "uuid";

export function getScreenWidth() {
  return window.innerWidth;
}

export function parseMalformedQueryString(str: string) {
  const result: ParamType[] = [];

  const queryStart = str.indexOf("?");
  if (queryStart === -1) return [];

  const queryString = str.slice(queryStart + 1);
  const pairs = queryString.split("&");

  pairs.forEach((pair) => {
    let [key, value] = pair.split("=");
    if (key === undefined || key.trim() === "") key = " ";
    if (value === undefined) value = " ";

    result.push({
      id: uuidv4(),
      checked: true,
      key: key,
      value: value,
      description: "",
    });
  });

  return result;
}

export function toRemoveQueryString(url: string, obj: ParamType) {
  if (!obj || !obj.key || !obj.value) return url;

  const queryStart = url.indexOf("?");
  if (queryStart === -1) return url;

  const base = url.slice(0, queryStart);
  const queryString = url.slice(queryStart + 1);

  let params = queryString.split("&");

  params = params.filter((param) => param !== `${obj.key}=${obj.value}`);

  return params.length ? `${base}?${params.join("&")}` : base;
}

export function toAddQueryString(url: string, obj: ParamType) {
  if (!obj || !obj.key || !obj.value) return url;

  const queryStart = url.indexOf("?");
  if (queryStart === -1) return `${url}?${obj.key}=${obj.value}`;

  return `${url}&${obj.key}=${obj.value}`;
}
