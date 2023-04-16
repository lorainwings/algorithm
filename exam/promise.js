// 手写Promise实现, 成功通过PromiseA+规范的872条测试用例

const joinMicroTask = (callback) => {
    if ('queueMicrotask' in globalThis) return queueMicrotask(callback);
    const value = 1;
    const node = document.createTextNode(value);
    const options = { characterData: true };
    const observe = new MutationObserver(callback);
    observe.observe(node, options);
    node.data = (value + 1) % 2;
}

function Promise(executor) {
    this.status = 'pending';
    this.result = null;
    this.reason = null;
    this.onFulfilledCbs = [];
    this.onRejectedCbs = [];

    const resolve = value => {
        if (value instanceof Promise) {
            return value.then(resolve, reject);
        }
        // 此处resolve必须使用异步MicroTask, 保证多个onFulfilledCbs回调进入微任务排队(有顺序)
        // 不能在then函数的push(cb)的过程中, 因为会导致顺序错误
        joinMicroTask(() => {
            if (this.status === 'pending') {
                this.result = value;
                this.status = 'fulfilled';
                this.onFulfilledCbs.forEach(fn => fn(value));
            }
        });
    }

    // 此处reject必须使用异步MicroTask, 保证多个onFulfilledCbs回调进入微任务排队(有顺序)
    // 不能在then函数的push(cb)的过程中, 因为会导致顺序错误
    const reject = (reason) => {
        joinMicroTask(() => {
            if (this.status === 'pending') {
                this.reason = reason;
                this.status = 'rejected';
                this.onRejectedCbs.forEach(fn => fn(reason));
            }
        });
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}


const resolvePromise = (promise2, x, resolve, reject) => {
    if (x === promise2) {
        return reject(new TypeError('error due to circular reference'));
    }

    let resolveOrThrow = false;

    if (x instanceof Promise) {
        if (x.status === 'pending') {
            return x.then((v) => {
                resolvePromise(promise2, v, resolve, reject);
            }, reject);
        } else {
            return x.then(resolve, reject);
        }
    }

    // 类似于promise
    const isLikePromise = t => (t !== null && (typeof t === 'function' || typeof t === 'object'));
    // 如果返回的是疑似 Promise 类型
    if (isLikePromise(x)) {
        try {
            // 如果返回的是 Promise 类型，具有 then 方法
            // 判断Promise类型: x !== null && typeof x.then === 'function' && typeof x.catch === 'function'
            const thenable = x.then;
            if (typeof thenable === 'function') {
                thenable.call(x,
                    function (y) {
                        if (resolveOrThrow) return;
                        resolveOrThrow = true;
                        return resolvePromise(promise2, y, resolve, reject);
                    },
                    function (e) {
                        if (resolveOrThrow) return;
                        resolveOrThrow = true;
                        return reject(e);
                    });
            } else {
                return resolve(x);
            }
        } catch (e) {
            if (resolveOrThrow) return;
            resolveOrThrow = true;
            return reject(e);
        }
    } else {
        return resolve(x);
    }
}


// 原型上面不能使用箭头函数, 会导致this丢失
Promise.prototype.then = function (onFulfilled, onRejected) {
    let promise2;

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e };

    if (this.status === 'fulfilled') { // 真凶!单词错误!!!!
        return promise2 = new Promise((resolve, reject) => {
            joinMicroTask(() => {
                try {
                    const data = onFulfilled(this.result);
                    resolvePromise(promise2, data, resolve, reject);
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }

    if (this.status === 'rejected') {
        return promise2 = new Promise((resolve, reject) => {
            joinMicroTask(() => {
                try {
                    const error = onRejected(this.reason);
                    resolvePromise(promise2, error, resolve, reject);
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }

    if (this.status === 'pending') {
        return promise2 = new Promise((resolve, reject) => {
            this.onFulfilledCbs.push((value) => {
                try {
                    const data = onFulfilled(value);
                    resolvePromise(promise2, data, resolve, reject);
                }
                catch (e) {
                    return reject(e);
                }
            });


            this.onRejectedCbs.push((reason) => {
                try {
                    const error = onRejected(reason);
                    resolvePromise(promise2, error, resolve, reject);
                }
                catch (e) {
                    return reject(e);
                }
            });
        });
    }
}


Promise.prototype.catch = function (cb) {
    return this.then(null, cb);
}

Promise.resolve = function (data) {
    return new Promise((resolve) => resolve(data));
}

Promise.reject = function (error) {
    return new Promise((_, reject) => reject(error));
}

Promise.prototype.all = function (promiseArr) {
    if (!Array.isArray(promiseArr)) {
        throw new TypeError('The arguments should be an array!')
    }
    return new Promise((resolve, reject) => {
        try {
            let resolveResult = [];
            for (let i = 0; i < promiseArr.length; i++) {
                const p = promiseArr[i];
                const wp = p !== null && typeof p.then === 'function' && typeof p.catch === 'function' ? p : Promise.resolve(p);
                wp.then((data) => {
                    resolveResult.push(data);

                    if (resolveResult.length === promiseArr.length) {
                        return resolve(resolveResult);
                    }
                }, reject);
            };
        } catch (e) {
            return reject(e);
        }
    });
}

Promise.prototype.race = function (promiseArr) {
    if (!Array.isArray(promiseArr)) {
        throw new TypeError('The arguments should be an array!')
    }
    return new Promise((resolve, reject) => {
        try {
            promiseArr.forEach(item => {
                const witem = item !== null && typeof item.then === 'function' && typeof item.catch === 'function' ? item : Promise.resolve(item);
                witem.then(resolve, reject);
            });
        } catch (e) {
            return reject(e);
        }
    });
}


const _Promise = Promise;

//  测试官方用例的补丁
_Promise.deferred = function () {
    var result = {};
    result.promise = new _Promise(function (resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
}

module.exports = _Promise;