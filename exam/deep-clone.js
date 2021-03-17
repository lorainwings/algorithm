const cloneDeep = original => {
    // 递归克隆种类
    const setType = 'Set';
    const mapType = 'Map';
    const arrayType = 'Array';
    const objectType = 'Object';
    const argsType = 'Arguments';

    // 特殊种类
    const symbolType = 'Symbol';
    const regexpType = 'RegExp';
    const functionType = 'Function';

    //通用构造种类
    const dateType = 'Date';
    const errorType = 'Error';
    const numberType = 'Number';
    const stringType = 'String';
    const booleanType = 'Boolean';

    // 深克隆类型集合
    const deepTypes = [setType, mapType, arrayType, objectType, argsType];

    // 获取值类型
    const getType = target => ({}).toString.call(target).slice(8, -1);

    // 区分引用值和原始值
    const isObject = target => target !== null && (typeof target === 'object' || typeof target === 'function');

    // 遍历对象和数组的通用forEach 
    const forEach = (target, iterator) => {
        const array = Array.isArray(target) ? target : Object.keys(target);
        let index = -1;
        const len = array.length;
        while (++index < len) {
            const key = array === target ? index : array[index];
            iterator(target[key], key);
        }
        return target;
    }

    // 生成新对象
    const objectInit = target => new target.constructor();

    // 克隆symbol
    const cloneSymbol = target => Object(({}).valueOf.call(target));

    // 克隆regexp
    const cloneRegexp = target => new target.constructor(target.source, target.flags);

    // 克隆function
    const cloneFunction = target => {

        /* const funcStr = target.toString();
        const paramReg = /(?<=([(=]|\b))[\w,\s\d]*(?=(\)([\s\n]*{)|\=>\2))/gi;
        const funcBodyReg = /(?<={)(.|\n)+(?=\})|(?<==>)([^{}])+(?=$)/gi;

        const [param] = paramReg.exec(funcStr) || [''];
        const [body] = funcBodyReg.exec(funcStr) || [''];

        if (target.prototype) {
            cloneFun = body ? new Function(...param.trim().split(','), body) : null;
        } else {
            cloneFun = eval(funcStr);
        } */

        const cloneFn = eval(target.toString());
        cloneFn.prototype = target.prototype;
        return cloneFun;

    }

    const cloneOtherType = target => {
        const type = getType(target);

        switch (type) {
            case 'Date':
            case 'Error':
            case 'Number':
            case 'String':
            case 'Boolean':
                return new target.constructor(target);
            case 'Symbol':
                return cloneSymbol(target);
            case 'RegExp':
                return cloneRegexp(target);
            case 'Function':
                return cloneFunction(target);
            default: return null;
        }
    }


    const clone = (target, map = new WeakMap()) => {
        let cloneTarget;
        const type = getType(target)

        if (!isObject(target)) {
            return target;
        }

        cloneTarget = deepTypes.includes(type) ? objectInit(target) : cloneOtherType(target);

        if (map.get(target)) return map.get(target);
        map.set(target, cloneTarget);


        if (type === 'Set') {
            target.forEach(value => cloneTarget.add(clone(value, map)));
            return cloneTarget;
        }

        if (type === 'Map') {
            target.forEach((value, key) => { cloneTarget.set(key, clone(value, map)) });
            return cloneTarget;
        }

        forEach(target, (value, key) => {
            cloneTarget[key] = clone(value, map);
        })
        return cloneTarget;
    }

    return clone(original);
}


//测试代码
console.group("====测试代码=====");

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

const objcopy = cloneDeep(obj);

for (const key in obj) {
    console.log(obj[key], `key:${key};  对比值:${obj[key] === objcopy[key]}`)
}
