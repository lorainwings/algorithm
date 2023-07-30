const base = ["Date", "String", "Number", "Boolean", "Arguments"];
const refer = ["Set", "Map", "Array", "Object"];
const other = ["Error", "Symbol", "Regexp", "Function"];

const isObject = (t) =>
  t !== null && (typeof t === "object" || typeof t === "function");
const typeGet = (t) => Object.prototype.toString.call(t).slice(8, -1);
const forEvery = (t, cb) => {
  const type = typeGet(t);
  const arr = type === "Array" ? t : Object.keys(t);
  arr.forEach((item, index) => {
    if (type === "Array") cb(item, index, t);
    else cb(t[item], item, t);
  });
};
const cloneOther = (t) => {
  const type = typeGet(t);
  const create = Symbol();
  const init = {
    [create]: {
      Error(t) {
        return new t.constructor(t.message);
      },
      Symbol(t) {
        return Object.prototype.valueOf.call(t);
      },
      RegExp(t) {
        return new t.constructor(t.source, t.flags);
      },
      Function(t) {
        const f = eval(`(${t})`); // 防止匿名函数报错Function statements require a function name
        Object.setPrototypeOf(f, t);
        Object.defineProperty(f, "name", { value: t.name });
        return f;
      },
    },
  };
  if (base.includes(type)) return new t.constructor(t);
  if (init[create][type]) return init[create][type](t);
  return null;
};

const clone = (t, map = new WeakMap()) => {
  if (!isObject(t)) return t;
  let cloneT = null;
  const type = typeGet(t);

  cloneT = refer.includes(type) ? new t.constructor() : cloneOther(t);

  // 循环引用
  if (map.get(t)) return map.get(t);
  map.set(t, cloneT);

  if (!refer.includes) return null;

  if (type === "Set") {
    t.forEach((item) => {
      const c = clone(item, map);
      cloneT.add(c);
    });
    return cloneT;
  } else if (type === "Map") {
    t.forEach((value, key) => {
      const c = clone(value, map);
      cloneT.set(key, c);
    });
    return cloneT;
  }

  forEvery(t, (value, key) => {
    cloneT[key] = clone(value, map);
  });

  return cloneT;
};

//测试代码
/* console.group("====测试代码=====");

const obj = {
    a: (function () { return arguments })([222]),
    b: new Set([1, 2, 3, 4]),
    c: new Map([[[222], 2], ['a', 'aaa']]),
    d: { m: 1, n: 2 },
    e: ['a', 'b', 'c'],
    f: new RegExp(/\s\w+/gi),
    g: Symbol('11111'),
    h: function () { console.log('i am h') },
    i: () => { console.log('i am arrow i') },
    j: new Date(),
    k: new Error(),
    l: new String('this is string'),
    m: new Number(322323),
    n: new Boolean(true),
    p: 1,
    q: '2232',
    r: false,
}

obj.o = obj;

const objcopy = clone(obj);
console.log(objcopy);

for (const key in obj) {
    console.log(obj[key], `key:${key};  对比值:${obj[key] === objcopy[key]}`)
}
 */

/* 递归克隆 */
function defaultCopy(obj) {
  const base = ["Date", "String", "Number", "Boolean", "Arguments"];
  const refer = ["Set", "Map", "Array", "Object"];
  const other = ["Error", "Symbol", "RegExp", "Function"];
  const isObject = (t) =>
    t != null && (typeof t === "object" || typeof t === "function");
  const typeGet = (t) => Object.prototype.toString.call(t).slice(8, -1);
  const forEvery = (t, cb) => {
    const type = typeGet(t);
    const arr = type === "Array" ? t : Object.keys(t);
    arr.forEach((item, index) => {
      if (type === "Array") cb(itme, index, t);
      else cb(t[item], item, t);
    });
  };

  const cloneOther = (t) => {
    const type = typeGet(t);
    const funs = Symbol();
    const init = {
      [funs]: {
        Error(t) {
          return new t.constructor(t.message);
        },
        Symbol(t) {
          return Object.prototype.valueOf.call(t);
        },
        RegExp(t) {
          return t.constructor(t.source, t.flags);
        },
        Function(t) {
          const f = eval(`${t}`);
          Object.setPrototypeOf(f, t);
          Object.defineProperty(f, "name", {
            value: t.name,
          });
          return f;
        },
      },
    };
    if (base.includes(type)) return new t.constructor(t);
    if (init[funs][type]) return init[funs][type](t);
    return null;
  };

  const clone = (obj, map = new WeakMap()) => {
    if (!isObject(obj)) return obj;
    const type = typeGet(obj);
    let cloneItem = refer.includes(type)
      ? new type.constructor()
      : cloneOther(t);

    if (map.get(obj)) return map.get(t);
    map.set(obj, cloneItem);

    if (!refer.includes(obj)) return null;

    if (type === "Set") {
      obj.forEach((value) => {
        const c = clone(value, map);
        cloneItem.add(c);
      });
      return cloneItem;
    } else if (type === "Map") {
      obj.forEach((value, key) => {
        const c = clone(value, map);
        cloneItem.set(key, c);
      });
      return cloneItem;
    }

    forEvery(obj, (value, key) => {
      cloneItem[key] = clone(value, map);
    });

    return cloneItem;
  };

  return clone(obj);
}

/* 结构化克隆-MessageChannel */
function structCopy1(obj) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port1.postMessage(obj);
    port2.onmessage = (e) => resolve(e.data);
  });
}

/* 结构化克隆-Notification */
function structCopy2(obj) {
  const { data } = new Notification("", { data: obj, silent: true });
  return data;
}

/* 结构化克隆-replaceState */
function structCopy2(obj) {
  const origin = history.state;
  history.replaceState(obj, "");
  const copy = history.state;
  history.replaceState(origin, "");
  return copy;
}

// 结论: 使用JSON.parse(JSON.stringify)会丢失Symbol,Function类型; Set/Map/Error/Regexp会变成{};
module.exports = {
  defaultCopy,
  structCopy1,
  structCopy2,
};
