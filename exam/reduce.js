// 手写reduce函数
export const myReduce = (arr, cb, initVal) => {
  if (!Array.isArray(arr)) {
    throw new TypeError("Array.prototype.reduce called on null or undefined");
  }
  if (typeof cb !== "function") {
    throw new TypeError(callback + "is not a function");
  }
  const initIdx = initVal === undefined ? ((result = arr[1]), 1) : 0;
  for (let i = initIdx; i < arr.length; i++) {
    result = cb(result, arr[i], i, arr);
  }
  return result;
};

export const mockReduce = (arr, cb, init) => {
  if (!Array.isArray(arr)) {
    throw new TypeError("Array.prototype.reduce called on null or undefined");
  }
  if (typeof cb !== "function") {
    throw new TypeError(cb + "is not a function");
  }
  const initIdx = initVal === undefined ? ((result = arr[1]), 1) : 0;
  arr.slice(initIdx).forEach((item, idx) => {
    result = cb(result, item, idx + initIdx, arr);
  });
  return result;
};
