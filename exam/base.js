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
const deleteNull = (o, k, point) => {
    const type = typeGet(o);
    const isArray = type === 'Array';
    const isObject = type === 'Object';
    if (k !== undefined && (o === null || o === undefined)) delete point[k];
    if (!(isArray || isObject)) return;
    const t = isArray ? o : Object.keys(o);
    t.forEach((c, i) => {
        const k = isArray ? i : c;
        deleteNull(o[k], k, o);
    });
    return o;
}

// test obj
var obj = {
    a: null,
    b: [{ a: null, b: 11, c: [1, 2, 3] }, { a: null, b: 11, c: [1, 2, 3] }],
    c: {
        aa: 111,
        bb: [null, null, null, { dd: [{ aaaaa: 1111, bbbbb: null, ccccc: { dd: null, dd1: null, dd2: 1234, dd4: [null, null, null] } }] }],
        cc: null
    }

}

// const v = deleteNull(obj);
// console.log(JSON.stringify(v, null, 2));


const toRgb = (hex) => {
    const [r, g, b] = (hex.length < 6 ? hex.slice(1).replace(/\w{1}/gi, '$&$&,') : hex.slice(1).replace(/\w{2}/gi, '$&,')).split(',');
    return `rgb(${parseInt(r, 16)},${parseInt(g, 16)},${parseInt(b, 16)})`
}

/*  
    计算所有从根节点可以到达的路径
    [[1, 3, 6], [1, 4, 8, 13], ... ] 
 */
const getAllPath = (list) => {
    const res = [];
    list.sort((a, b) => a.id - b.id);
    list.forEach((i) => {
        i.path = [i.id];
    });
    for (let i = 0; i < list.length; i++) {
        const cr = list[i].children;
        if (cr && cr.length > 0) {
            cr.forEach((child) => {
                const targetC = ((id) => list.find((i) => i.id === id))(child);
                targetC.path.unshift(...list[i].path);
            });
        } else {
            res.push(list[i].path);
        }
    }
    return res;
}

const list = [
    { id: 6 },
    { id: 2, children: [5] },
    { id: 13 },
    { id: 5, children: [10, 11] },
    { id: 1, children: [2, 3, 4] },
    { id: 10 },
    { id: 8, children: [13] },
    { id: 4, children: [8, 9] },
    { id: 9 },
    { id: 3, children: [6, 7] },
    { id: 11, children: [14] },
    { id: 14 },
    { id: 7, children: [12] },
    { id: 12 }
]

// const result = getAllPath(list);
//输出结果: [[1,3,6],[1,4,9],[1,2,5,10],[1,3,7,12],[1,4,8,13],[1,2,5,11,14]]


const dfsTree = (arr) => {
    const dfs = (t) => {
        console.log(t);
        t.children && t.children.forEach(dfs);
    }
    arr.forEach(dfs);
}

// dfsTree(list)