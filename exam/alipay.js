/**
 
题目列表：

1. 复制数组

2. 将输入的数组组装成一颗树状的数据结构，时间复杂度越小越好。要求程序具有侦测错误输入的能力

3. 实现一个简单的模板引擎

4. 实现 onChange(obj, callback) ，当 obj 变化时（新增、删除、修改、查找），调用 callback 函数

5、 给定一个只包含 '(', ')', ', ', '[' and ']'的字符串 ，判断这个字符串是否满足下列条件：
1) 左括号必须用相同类型的右括号闭合。 2) 左括号必须以正确的顺序闭合。 3) 注意空字符串可被认为是有效字符串


答题要求：

本地完成作答粘回系统即可，如遇系统问题，也可通过邮件发送到 leikaijian.lkj@alibaba-inc.com

 */

// const assert = require('power-assert');

const testResults = [];
//==============================答题部分 start==============================

/********************第 1 题**********************/
// 复制数组

function duplicate(input) {
    if (!Array.isArray(input)) return new TypeError('input is not array!');
    if (input.length === 0) return [];
    return [...input, ...input]
}

/*******单测部分*******/
try {
    assert.deepEqual(duplicate([1, 2, 3]), [1, 2, 3, 1, 2, 3]);
    assert(duplicate([]).length === 0);

    testResults[0] = '通过';
} catch {
    testResults[0] = '不通过';
}

/********************第 2 题**********************/
// 将输入的数组组装成一颗树状的数据结构，时间复杂度越小越好。要求程序具有侦测错误输入的能力

function transform(arr) {
    if (!Array.isArray) return new TypeError('input is not array!');
    const map = new Map();
    const roots = [];
    arr.forEach(item => map.set(item.id, item));
    arr.forEach(item => {
        const pid = item.parentId;
        const parent = map.get(pid);
        if (pid) {
            if (parent) {
                if (pid > item.id) {
                    let c = map.get(pid);
                    while (c) {
                        if (c === item) return [];
                        c = map.get(c.parentId);
                    };
                }
                parent.children = parent.children ? [...parent.children, item] : [item]
            }
        } else {
            roots.push(map.get(item.id));
        }
    });
    return roots;
}

/*******单测部分*******/
try {
    assert.deepEqual(
        transform([
            { id: 1, name: 'i1' },
            { id: 2, name: 'i2', parentId: 1 },
            { id: 4, name: 'i4', parentId: 3 },
            { id: 3, name: 'i3', parentId: 2 },
        ]),
        [
            {
                id: 1,
                name: 'i1',
                children: [
                    {
                        id: 2,
                        name: 'i2',
                        parentId: 1,
                        children: [
                            {
                                id: 3,
                                name: 'i3',
                                parentId: 2,
                                children: [
                                    {
                                        id: 4,
                                        name: 'i4',
                                        parentId: 3,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]
    );

    assert.deepEqual(
        transform([
            { id: 1, name: 'i1' },
            { id: 2, name: 'i2', parentId: 1 },
            { id: 4, name: 'i4', parentId: 3 },
            { id: 3, name: 'i3', parentId: 2 },
            { id: 11, name: 'i11', parentId: 'UFO' },
        ]),
        [
            {
                id: 1,
                name: 'i1',
                children: [
                    {
                        id: 2,
                        name: 'i2',
                        parentId: 1,
                        children: [
                            {
                                id: 3,
                                name: 'i3',
                                parentId: 2,
                                children: [
                                    {
                                        id: 4,
                                        name: 'i4',
                                        parentId: 3,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]
    );

    assert.deepEqual(
        transform([
            { id: 1, name: 'i1', parentId: 4 },
            { id: 2, name: 'i2', parentId: 1 },
            { id: 3, name: 'i3', parentId: 2 },
            { id: 4, name: 'i4', parentId: 3 },
        ]),
        []
    );

    testResults[1] = '通过';
} catch {
    testResults[1] = '不通过';
}

/********************第 3 题**********************/
// 实现一个简单的模板引擎。

// var tpl = template('hey there {{ name }}');
// var div = document.createElement('div');
// div.innerHTML = tpl({ name: 'Neo' });
// document.body.appendChild(div);

function template(tpl) { }

try {
    assert.equal(
        template('hey there {{ name }}')({ name: 'Neo' }),
        'hey there Neo'
    );

    assert.equal(
        template('hey there {{ name }} {{ age }}')({ name: 'Neo', age: '11' }),
        'hey there Neo 11'
    );

    testResults[2] = '通过';
} catch {
    testResults[2] = '不通过';
}

/********************第 4 题**********************/
// 实现 onChange(obj, callback) ，当 obj 变化时（新增、删除、修改、查找），调用 callback 函数

function onChange(objToWatch, onChangeFunction) {
    if (typeof objToWatch !== "object") {
        throw TypeError("objToWatch must be a object");
    }

    return new Proxy(objToWatch, {
        get(target, propKey, receiver) {
            onChangeFunction();
            const result = Reflect.get(target, propKey, receiver);
            if (typeof result === "object") {
                return onChange(result, onChangeFunction);
            }
            return result;
        },
        set(target, propKey, value, receiver) {
            onChangeFunction();
            return Reflect.set(target, propKey, value, receiver);
        },
        deleteProperty(target, propKey) {
            onChangeFunction();
            delete target[propKey];
            return true;
        }
    });
}

try {
    let counter = 0;
    const logger = () => {
        counter++;
    };
    const obj = { a: { b: { c: { d: 'xxoo' } } } };
    const proxy = onChange(obj, logger);

    console.log(proxy.a); // logger called here in get trap
    assert(counter === 1);

    console.log(proxy.a.b.c.d);
    assert(counter === 5);

    proxy.a = 'b'; // logger called here as well in set trap
    assert(counter === 6);

    delete proxy.a; // logger called here in deleteProperty trap
    assert(counter === 7);

    testResults[3] = '通过';
} catch {
    testResults[3] = '不通过';
}

/********************第 5 题**********************/
// 给定一个只包含 '(', ')', '{', '}', '[' and ']'的字符串 ，判断这个字符串是否满足下列条件：
// 1) 左括号必须用相同类型的右括号闭合。
// 2) 左括号必须以正确的顺序闭合。
// 3) 注意空字符串可被认为是有效字符串。
// 示例："()" => true, "()[]{}" => true, "(]" => false, "([)]" => false, "{[]}" => true

function isValid(s) {
    const len = s.length;
    if (s.replace(/[^\(\)\[\]\{\}]/g, '').length % 2 !== 0) return false;
    const stack = [];
    for (let i = 0; i < len; i++) {
        let c = s[i];
        if (c === '{' || c === '(' || c === '[') {
            stack.push(c);
        } else if (c === '}' && stack[stack.length - 1] === '{' || c === ')' && stack[stack.length - 1] === '(' || c === ']' && stack[stack.length - 1] === '[') {
            stack.pop();
        }
    }
    if (stack.length === 0) return true;
    return false;
}

try {
    assert(isValid(''));
    assert(isValid('()'));
    assert(isValid('()[]{}'));
    assert(isValid('(}') === false);
    assert(isValid('{[]()}'));

    testResults[4] = '通过';
} catch {
    testResults[4] = '不通过';
}

//==============================答题部分 end================================

// console.log(testResults);


module.exports = {
    transform,
    onChange
}