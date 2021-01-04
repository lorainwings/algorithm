const matchAvailableBrackets = (str) => {
    const len = str.length;
    if (str.replace(/\s/g, '').length % 2 !== 0) return false;
    const stack = [];
    for (let i = 0; i < len; i++) {
        let c = str[i];
        if (c === '{' || c === '(' || c === '[') {
            stack.push(c);
        } else if (c === '}' && stack[stack.length - 1] === '{' || c === ')' && stack[stack.length - 1] === '(' || c === ']' && stack[stack.length - 1] === '[') {
            stack.pop();
        }
    }
    if (stack.length === 0) return true;
    return false;
}


module.exports = {
    matchAvailableBrackets
}
