// 递归版
const fibonacci = (n) => {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

// 优化循环版本
const fibonacciFor = (n) => {
  let n1 = 1;
  let n2 = 1;
  if (n === 1 || n === 2) return 1;
  for (let i = 2; i < n; i++) {
    [n1, n2] = [n2, n1 + n2];
  }
  return n2;
};

//0、1、1、2、3、5、8、13、21、34
const fibonacciLoop = (n, a = 0, b = 1) => {
  while (n--) {
    [a, b] = [b, a + b];
  }
  return a;
};

// 尾递归优化版
const fibonacciTail = (n, a = 0, b = 1) => {
  if (n === 0) return a;
  return fibonacciTail(n - 1, b, a + b);
};
