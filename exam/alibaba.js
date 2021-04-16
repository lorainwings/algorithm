/************************************** 代码分界线 ***************************************/


/*
  问题：// 实现事件处理器 EventEmitter ，有如下功能
  const event = new EventEmitter();
  // 绑定事件
  event.on(name, callback);
  // 取消绑定
  event.off(name);
  // 只绑定一次
  event.once(name);
  // 触发事件
  event.trigger(name, data)
*/
class EventEmitter {
    constructor() {
        this.event = Object.create(null);
    }

    on(name, callback) {
        if (!this.event[name]) {
            this.event[name] = [];
        }
        this.event[name].push(callback);
    }

    trigger(name, data) {
        if (!this.event[name]) return;
        this.event[name].forEach((fn) => {
            fn(data);
        });
    }

    once(name, callback) {
        const cb = (...args) => {
            callback(...args);
            this.off(name, cb);
        };
        this.on(name, cb);
    }

    off(name, offcb) {
        if (!this.event[name]) return;
        const index = this.event[name].findIndex(fn => offcb === fn);
        this.event[name].splice(index, 1);
        if (!this.event[name].length) {
            delete this.event[name];
        }
    }
}
/**
  问题：// 实现 onChange(obj, callback) ，当 obj 变化时（新增、删除、修改、查找），调用 callback 函数
  需要满足以下断言
  let counter = 0;
  const logger = () => {
    counter++;
  };
  const obj = {
   a: {
     b: {
       c: {
         d: "xxoo"
        }
      }
    }
  };
  const proxy = onChange(obj, logger);
  console.log(proxy.a); // logger called here in get trap
  assert(counter === 1);
  console.log(proxy.a.b.c.d);
  assert(counter === 5);
  proxy.a = "b"; // logger called here as well in set trap
  assert(counter === 6);
  delete proxy.a; // logger called here in deleteProperty trap
  assert(counter === 7);
*/
function onChange(obj, callback) {
    if (typeof obj !== "object") return new TypeError("obj is not an object");
    const options = {
        get(target, prop, receiver) {
            callback();
            const result = Reflect.get(target, prop, receiver);
            if (typeof result === "object") {
                return onChange(result, callback);
            }
            return result;
        },
        set(target, prop, value, receiver) {
            callback();
            return Reflect.set(target, prop, value, receiver);
        },
        deleteProperty(target, prop) {
            callback();
            delete target[prop];
            return true;
        }
    }
    return new Proxy(obj, options);
}
//lastPromise实现
//业务需求中，经常有 只需要最后一次请求的结果（比如搜索）编写一个高阶函数，传递旧请求方法（执行后返回 promise），返回一个新方法。
//连续触发时，若上一次 promise 执行未结束则直接废弃，只有最后一次 promise 会触发then/reject。
// 测试示例
/* let count = 1;
let promiseFunction = () => {
    return new Promise((rs) =>
        window.setTimeout(() => {
            rs(count++);
        })
    );
};
let lastFn = lastPromise(promiseFunction).promise;
lastFn().then(console.log); // 无输出
lastFn().then(console.log); // 无输出
lastFn().then(console.log); // 3 */
// 请实现

const lastPromise = (promiseFunction) => {
    let trackNum = 0;
    let finishNum = 0;
    const promise = () => {
        trackNum++;
        return new Promise((resolve, reject) => {
            const resolvePromise = (fn, v) => {
                finishNum++;
                trackNum === finishNum && fn(v)
            }
            promiseFunction().then(v => {
                resolvePromise(resolve, v)
            }, e => {
                resolvePromise(reject, e)
            })
        })
    }
    return { promise }
}

/**
  问题：将输入的数组组装成一颗树状的数据结构，时间复杂度越小越好。要求程序具有侦测错误输入的能力
  需要满足以下断言
  assert.deepEqual(
    transform([
      { id: 1, name: "i1" },
      { id: 2, name: "i2", parentId: 1 },
      { id: 4, name: "i4", parentId: 3 },
      { id: 3, name: "i3", parentId: 2 }
    ]),
    [
      {
        id: 1,
        name: "i1",
        children: [
          {
            id: 2,
            name: "i2",
            parentId: 1,
            children: [
              {
                id: 3,
                name: "i3",
                parentId: 2,
                children: [
                  {
                    id: 4,
                    name: "i4",
                    parentId: 3
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  );
  assert.deepEqual(
    transform([
      { id: 1, name: "i1" },
      { id: 2, name: "i2", parentId: 1 },
      { id: 4, name: "i4", parentId: 3 },
      { id: 3, name: "i3", parentId: 2 },
      { id: 11, name: "i11", parentId: "UFO" }
    ]),
    [
      {
        id: 1,
        name: "i1",
        children: [
          {
            id: 2,
            name: "i2",
            parentId: 1,
            children: [
              {
                id: 3,
                name: "i3",
                parentId: 2,
                children: [
                  {
                    id: 4,
                    name: "i4",
                    parentId: 3
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  );
  assert.deepEqual(
    transform([
      { id: 1, name: "i1", parentId: 4 },
      { id: 2, name: "i2", parentId: 1 },
      { id: 3, name: "i3", parentId: 2 },
      { id: 4, name: "i4", parentId: 3 }
    ]),
    []
  );
*/
function transform(arr) {
    if (!Array.isArray) return new TypeError('arr is not an array!');
    const map = new Map();
    const trees = [];
    const detectCycle = (o, t) => {
        const p = map.get(o.parentId);
        if (!p) return false;
        if (p === t) return true;
        return detectCycle(p, t);
    }
    arr.forEach(c => map.set(c.id, c));
    arr.forEach(c => {
        const pid = c.parentId;
        const parent = map.get(pid);
        if (!pid) {
            trees.push(map.get(c.id));
        }
        else if (parent) {
            if (pid > c.id && detectCycle(c, c)) return [];
            parent.children = parent.children ? [...parent.children, c] : [c]
        }
    });
    return trees;
}

/************************************** 代码分界线 ***************************************/