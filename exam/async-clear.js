/**
 * 一个异步函数是异步的, 后续调用了它的函数都会被传染成异步
 * 该例子来解决异步的传染性, 为了调用getInfo, 后续都搞成了异步
 * @returns Promise
 */

/*
async function getInfo() {
  return await fetch('https://api.github.com/users/lorainwings')
}

async function m1() {
  return await getInfo()
}

async function m2() {
  return await m1()
}

async function m3() {
  return await m2()
}

async function main() {
  const info = await m3()
  console.log(info)
}
 */

function getInfo() {
  return fetch("https://api.github.com/users/lorainwings");
}

function m1() {
  return getInfo();
}

function m2() {
  return m1();
}

function m3() {
  return m2();
}

function main() {
  const info = m3();
  console.log("info", info);
}

/**
 * 如何实现上面代码同步调用
 * 手写一个执行函数, 来消除异步函数的传染性
 * @param {Function} fn 原来的函数
 */
function runSync(fn) {
  const originFetch = globalThis.fetch;
  const cache = [];
  let i = 0;

  globalThis.fetch = (...args) => {
    if (cache[i]) {
      // 最终执行完成, 还原原来的fetch
      window.fetch = originFetch;
      if (cache[i].status === "fulfilled") return cache[i].data;
      else if (cache[i].status === "rejected") return cache[i].err;
    }
    const result = {
      status: "pending",
      data: null,
      err: null,
    };
    cache[i++] = result;
    const r = originFetch(...args)
      .then((r) => r.json())
      .then(
        (succ) => {
          result.data = succ;
          result.status = "fulfilled";
        },
        (fail) => {
          result.err = fail;
          result.status = "rejected";
        }
      );
    throw r;
  };

  try {
    fn();
  } catch (e) {
    if (e instanceof Promise) {
      const reRun = () => {
        i = 0;
        fn();
      };
      e.then(reRun, reRun);
    }
  }
}

// 测试
runSync(main);
