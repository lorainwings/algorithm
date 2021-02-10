// 手写reduce函数
export const myReduce = (arr, cb, initVal) => {
    if (!Array.isArray(arr)) {
        throw new TypeError('Array.prototype.reduce called on null or undefined')
    }
    if (typeof cb !== 'function') {
        throw new TypeError(callback + 'is not a function')
    }
    result = initVal || arr[0];
    for (let i = initVal ? 0 : 1; i < arr.length; i++) {
        result = cb(result, arr[i]);
    }
    return result;
}