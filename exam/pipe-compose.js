// pipe函数实现
// pipe(f, g, h) 是一个 curry 化函数，它返回一个新的函数，这个新的函数将会完成 (...args) => h(g(f(...args))) 的调用
const pipe = (...fns) => (...args) => {
    return fns.reduce((result, fn) => {
        return fn(...result);
    }, args);
}

// node-compose函数实现
// 可以使用reduce(需要数组reverse),此处使用函数式编程递归 
// compose(fn1, fn2, fn3, fn4 ...) => fn1(fn2(fn3(fn4(args))))
const compose = (...fns) => {
    const fnLens = fns.length;
    let fnIndex = fns.length - 1;
    return function f(...args) {
        const result = fns[fnIndex].apply(this, args)
        if (fnIndex <= 0) {
            return result;
        }
        fnIndex--;
        return f(result);
    }
}