// 手写call
Function.prototype.myCall = (ctx, ...args) => {
    if (this === Function.prototype) {
        return TypeError(`不允许使用原型来使用call`);
    }
    ctx = ctx || window;
    const fn = Symbol();
    ctx[fn] = this;
    const result = ctx[fn](...args);
    delete ctx[fn];
    return result;
}

// 手写apply
Function.prototype.myApply = (ctx, args) => {
    if (this === Function.prototype) {
        return TypeError(`不允许使用原型来使用apply`);
    }
    ctx = ctx || window;
    const fn = Symbol();
    ctx[fn] = this;
    const result = Array.isArray(args) ? ctx[fn](...args) : ctx[fn]();
    delete ctx[fn];
    return result;
};

// 手写bind
Function.prototype.myBind = (ctx, ...args) => {
    if (this === Function.prototype) {
        return TypeError(`不允许使用原型来使用bind`);
    }
    const fn = this;
    return function F(...args1) {
        return fn.apply(this instanceof F ? this : ctx, args.concat(args1));
    }
}


