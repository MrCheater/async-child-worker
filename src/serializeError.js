export const serializeError = error => {
  if (error instanceof Error) {
    return Object.getOwnPropertyNames(error).reduce(function(result, key) {
      result[key] = error[key];
      return result;
    }, {});
  } else {
    return error;
  }
};
