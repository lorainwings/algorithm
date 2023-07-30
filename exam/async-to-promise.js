// async function async1() {
//   await async2()
//   console.log('A')
// }

// 改写成等价模式
function async1() {
  Promise.resolve(async2()).then(() => {
    console.log("A");
  });
}

// async function async2() {
//   return new Promise((resolve, reject) => {
//     resolve(1)
//   })
// }

// 改写成等价模式
function async2() {
  return new Promise((resolve, reject) => {
    resolve(1);
  })
    .then((v) => v)
    .then((v) => v);
}

async1();

new Promise((resolve) => {
  console.log("B");
  resolve(2);
})
  .then(() => {
    console.log("C");
  })
  .then(() => {
    console.log("D");
  });

/*
总结如下:

async函数在抛出返回值时，会根据返回值类型开启不同数目的微任务
  - return结果值：非thenable、非promise（不等待）
  - return结果值：thenable（等待 1个then的时间）
  - return结果值：promise（等待 2个then的时间）

await右值类型区别
  - 接非 thenable 类型，会立即向微任务队列添加一个微任务then，但不需等待
  - 接 thenable 类型，需要等待一个 then 的时间之后执行
  - 接Promise类型(有确定的返回值)，会立即向微任务队列添加一个微任务then，但不需等待
    TC 39 对await 后面是 promise 的情况如何处理进行了一次修改，移除了额外的两个微任务，在早期版本，依然会等待两个 then 的时间

  */

/* ************分割线*********** */

/* 按照结论改写如下 */
/* async方式一: */
async function testA() {
  return 1;
}
// 等价于
function testA1() {
  return Promise.resolve(1);
}

/* async方式二: */
async function testB() {
  return {
    then(cb) {
      cb();
    },
  };
}
// 等价于
function testB1() {
  return Promise.resolve((v) => v).then((cb) => {
    cb();
  });
}

/* async方式三 */
async function testC() {
  return new Promise((resolve, reject) => {
    resolve();
  });
}
//等价于
function testC1() {
  return new Promise((resolve, reject) => {
    resolve();
  })
    .then((v) => v)
    .then((v) => v);
}

/* async方式四 */
async function testC() {
  return new Promise((resolve, reject) => {
    resolve();
  }).then(() => 1);
}
//等价于, 这种情况只会额外多出一个空的微任务
function testC1() {
  return new Promise((resolve, reject) => {
    resolve();
  })
    .then(() => 1)
    .then((v) => v);
}

/* ************分割线*********** */

/* await方式一: */
async function test() {
  console.log(1);
  await 123;
  console.log(2);
}
// 等价于
function test() {
  console.log(1);
  Promise.resolve(123).then(() => {
    console.log(2);
  });
}

/* await方式二: */
async function test() {
  console.log(1);
  await {
    then(cb) {
      cb();
    },
  };
  console.log(2);
}
//等价于
function test() {
  console.log(1);
  Promise.resolve((v) => v)
    .then((cb) => {
      cb();
    })
    .then(() => {
      console.log(2);
    });
}

/* await方式三: */
async function test() {
  console.log(1);
  await new Promise((resolve, reject) => {
    resolve();
  });
  console.log(2);
}
/*
按照理论应该等价于2个then的新promise, 早期版本也确实如此, 但是经过
TC 39(ECMAScript标准制定者) 对await 后面是 promise 的情况如何处理进行了一次修改，移除了额外的两个微任务，在早期版本，依然会等待两个 then 的时间
有大佬翻译了官方解释：更快的 async 函数和 promises[1]，但在这次更新中并没有修改 thenable 的情况
*/
// 现在等价于第一种方式
function test() {
  console.log(1);
  new Promise((resolve, reject) => {
    resolve();
  }).then(() => {
    console.log(2);
  });
}

/* ********************************************这是分界线************************************************************* */

/* 复杂测试题 */
async function async1() {
  console.log("1");
  await 12;
  console.log(12);
  await async2();
  console.log("AAA");
}

async function async2() {
  console.log("3");
  await {
    then(cb) {
      console.log("13");
      cb();
    },
  }; // 2个then
  return new Promise(async (resolve, reject) => {
    console.log("4");
    await new Promise((rs) => {
      console.log(15);
      rs();
    }).then(() => {
      console.log(16);
    });
    console.log("21");
    /*   await 17;
    console.log("22"); */
    resolve();
  });
}

console.log("5");

setTimeout(() => {
  console.log("6");
}, 0);

async1();

new Promise((resolve) => {
  console.log("7");
  resolve();
})
  .then(() => {
    console.log("8");
  })
  .then(() => {
    console.log("9");
  })
  .then(() => {
    console.log("10");
  })
  .then(() => {
    console.log("18");
  })
  .then(() => {
    console.log("19");
  })
  .then(() => {
    console.log("20");
  })
  .then(() => {
    console.log("23");
  })
  .then(() => {
    console.log("24");
  });
console.log("11");

/* 执行结果 */
// 5  1  7  11  12  3  8  13  9  4  15  10  16  18  21  19  20  AAA  23  24  6
