const { typeGet, forEvery, isObject } = require('./utils')

// 防抖节流
const debounce = (fn, delay, flag, context = this) => {
    let timer = null;
    return (...args) => {
        if (flag && !timer) {
            fn.apply(context, args);
            return;
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    }
}


const throttle = (fn, delay, context = this) => {
    let timer = null, pre = 0;
    return (...args) => {
        if (Date.now() - pre > delay) {
            fn.apply(context, args);
            clearTimeout(timer);
            timer = null;
            pre = Date.now();
        } else if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
            }, delay);
        }
    }
}

// 删除对象里面的null
// TODO 未保存对象引用 ==> not working
const delObjectNull = (obj, key = '') => {
    const type = typeGet(obj);
    if (!(type === 'Array' || type === 'Object')) return;
    forEvery(obj, (v, k) => {
        const tv = typeGet(v);
        if (tv === 'Null') {
            delete obj[k];
        }
        else if (tv === 'Array' || type === 'Object') {
            const n = delObjectNull(v, k);
        }
    });
    return obj;
}

// test obj
var obj = {
    a: null,
    b: [{ a: null, b: 11, c: [1, 2, 3] }],
    c: {
        aa: 111,
        bb: [null, null, null],
        cc: null
    }

}

const v = delObjectNull(obj);
// console.log(JSON.stringify(v, null, 2));
