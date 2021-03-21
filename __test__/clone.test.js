const { clone } = require('../exam/clone');

describe('深克隆一个对象', () => {
    it('测试用例1', () => {
        const obj = {
            a: (function () { return arguments })([222]),
            b: new Set([1, 2, 3, 4]),
            c: new Map([[[222], 2], ['a', 'aaa']]),
            d: { m: 1, n: 2 },
            e: ['a', 'b', 'c'],
            f: new RegExp(/\s\w+/gi),
            g: Symbol('11111'),
            h: function () { console.log('i am h') },
            i: () => { console.log('i am arrow i') },
            j: new Date(),
            k: new Error(),
            l: new String('this is string'),
            m: new Number(322323),
            n: new Boolean(true),
            p: 1,
            q: '2232',
            r: false,
        }
        obj.o = obj;

        expect(clone(obj)).toEqual(obj);
    })
});