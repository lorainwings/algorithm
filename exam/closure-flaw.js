const o = (function () {
  const obj = {
    a: 1,
    b: 2,
  };

  return {
    get(k) {
      return obj[k];
    },
  };
})();

// 闭包漏洞
// 不修改上面代码的情况下, 修改内部obj的值
Object.defineProperty(Object.prototype, "noexist", {
  get() {
    return this;
  },
});

console.log("%c------>[LOG:]", "color: fuchsia", o.get("noexist"));

// 解决办法
// 1. 将obj的原型设为空
Object.setPrototypeOf(obj, null);

// 2. get函数增加判断逻辑
({
  get(k) {
    if (Object.hasOwn(obj, k)) {
      return obj[k];
    }
    return undefined;
  },
});
