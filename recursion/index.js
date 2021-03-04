const fibonacci = (n) => {
    if (n <= 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 蹦床函数
const trampoline = (fn) => {
    let active = false;
    let value = null;
    const argsArr = [];
    return function (...args) {
        argsArr.push(args);
        if(!active) {
            active = true;
            while (argsArr.length) {
                value = fn.apply(this, argsArr.shift());
            };
            active = false;
            return value;
        }
    }
}

module.exports = {
    fibonacci,
    trampoline
}
