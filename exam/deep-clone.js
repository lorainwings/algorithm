// 可遍历类型
const arrTag = "[object Array]";
const objTag = "[object Object]";
const mapTag = "[object Map]";
const setTag = "[object Set]";
const argTag = "[object Arguments]";
const strTag = "[object String]";

// 不可遍历类型
const boolTag = "[object Boolean]";
const numTag = "[object Number]";
const dateTag = "[object Date]";
const errTag = "[object Error]";
const regexpTag = "[object RegExp]";
const symbolTag = "[object Symbol]";
const funTag = "[object Function]";

// 将可遍历类型做个集合
const traversalArr = [arrTag, objTag, mapTag, setTag, argTag, strTag];

// 判断类型的函数(采用最全且无遗漏的判断方式)
function checkType(source) {
  return Object.prototype.toString.call(source);
}

// 拷贝RegExp的方法
function cloneReg(source) {
  const reFlags = /\w*$/;
  const result = new source.constructor(source.source, reFlags.exec(source));
  result.lastIndex = source.lastIndex;
  return result;
}

// 拷贝Date的方法
function cloneDate(source) {
  return new source.constructor(source.valueOf());
}

function deepClone(source, map = new Map()) {
  // 非对象直接返回
  if (source instanceof Object === false) return source;

  // 根据source类型初始化结果变量
  let target = Array.isArray(source) ? [] : {};

  /* ----------------处理环引用问题👇---------------- */
  // 已存在则直接返回(仅仅在环引用之间生效)
  if (map.get(source)) return map.get(source);

  // 不存在则第一次设置
  map.set(source, target);
  /* ----------------处理环引用问题👆---------------- */

  /* ----------------处理Map、Set、Date、RegExp深拷贝失效问题👇---------------- */
  const type = checkType(source);

  console.log(type);
  let emptyObj;

  // 如果是可遍历类型，直接创建空对象
  if (traversalArr.includes(type)) {
    emptyObj = new source.constructor();
  }

  // 处理Map类型
  if (type === mapTag) {
    source.forEach((value, key) => {
      emptyObj.set(key, deepClone(value, map));
    });
    return emptyObj;
  }

  // 处理Set类型
  if (type === setTag) {
    source.forEach((value) => {
      emptyObj.add(deepClone(value, map));
    });
    return emptyObj;
  }

  // 处理Date类型
  if (type === dateTag) return cloneDate(source);

  // 处理Reg类型
  if (type === regexpTag) return cloneReg(source);
  /* ----------------处理Map、Set、Date、RegExp深拷贝失效问题👆---------------- */

  for (let item in source) {
    // 判断是否是自身属性
    if (source.hasOwnProperty(item)) {
      // 判断数据i的类型
      // if (source[item] instanceof Object) {
      if (typeof source[item] === "obejct") {
        target[item] = deepClone(source[item], map);
      } else {
        target[item] = source[item];
      }
    }
  }
  return target;
}

const obj = {
  // 基本类型
  str: "test",
  num: 18,
  boolean: true,
  sym: Symbol("独一无二key"),

  // 引用类型(以下8种数据对象均需进行真正意义上的深拷贝)
  obj_object: { name: "squirrel" },
  arr: [123, "456"],
  func: (name, age) => console.log(`姓名：${name}，年龄：${age}岁`),

  map: new Map([
    ["t", 100],
    ["s", 200],
  ]),
  set: new Set([1, 2, 3]),
  date: new Date(),
  reg: new RegExp(/test/g),
};

// 形成环引用
obj.loop = obj;

const result = deepClone(obj);
console.log("手写deepClone结果:", result);
