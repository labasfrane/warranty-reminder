import { DEFAULT_ERRORS } from "../constants/errors.constants";

function validators(object: any): any {
  const keys = Object.keys(object);
  const result = keys.reduce((acc: any, key: string) => {
    const error = DEFAULT_ERRORS[key] || key;
    const value = object[key]?.value || object[key];
    const message =
      typeof error === "function"
        ? error(object[key]?.message || value)
        : error;
    return { ...acc, [key]: { value, message } };
  }, {});

  return result;
}

export default validators;
