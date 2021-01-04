// 有效的括号
const matchAvailableBrackets = (str) => {
    const len = str.length;
    if (str.replace(/\s/g, '').length % 2 !== 0) return false;
    const stack = [];
    const map = new Map([['(', ')'], ['[', ']'], ['{', '}']]);
    for (let i = 0; i < len; i++) {
        let c = str[i];
        if (map.get(c)) {
            stack.push(c);
        } else if (c === map.get(stack[stack.length - 1])) {
            stack.pop();
        }
    }
    if (stack.length === 0) return true;
    return false;
}

// 1.两数之和
const twoNumPlus = (arr, target) => {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
        if (map.has(target - arr[i])) {
            return [map.get(target - arr[i]), i]
        }
        map.set(arr[i], i);
    }
    return []
}


// 76.最小覆盖子串
const minCoverSubStr = (s, t) => {
    //S=ADOBECODEBANC   T=ABC
    let l = 0;
    let r = 0;
    let target = '';
    const map = new Map();
    for (let c of t) {
        map.set(c, 1);
    }
    let mapLen = map.size;
    while (r < s.length) {
        if (map.has(s[r])) {
            const len = map.get(s[r]);
            map.set(s[r], len - 1);
            if (map.get(s[r]) === 0) mapLen--;
        }
        while (mapLen === 0) {
            const nstr = s.slice(l, r + 1)
            if (nstr.length < target.length || !target) target = nstr;
            if (map.has(s[l])) {
                const len = map.get(s[l]);
                map.set(s[l], len + 1)
                if (map.get(s[l]) === 1) mapLen++;
            }
            l++;
        }
        r++;
    }
    return target;
}


module.exports = {
    matchAvailableBrackets,
    twoNumPlus,
    minCoverSubStr
}
