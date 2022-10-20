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

const composeWhile = (...fns) => {
    return (...args) => {
        let result = fns.pop()(...args);
        while (fns.length) {
            const fn = fns.pop();
            result = fn(result);
        }
    }
}

// 手写中间件use
const express = () => {
    const stack = [];
    const app = () => {
        let i = 0;
        const next = () => {
            const fn = stack[i++];
            if (!fn) return;
            return fn(req, res, next);
        }
        next();
    }
    app.use = (task) => stack.push(task);
    return app;
}

// 柯里化
const currying = (fn, ...args) => {
    if (args.length >= fn.length) {
        return fn(...args);
    } else {
        return (...args2) => currying(fn, ...args, ...args2);
    }
}