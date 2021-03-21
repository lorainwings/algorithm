
// 实现new
const _new = (Ctor, ...args) => {
    // Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
    // 等同于obj.__proto__ = Ctor.prototype, 即创建一个以Ctro.prototype为原型的对象
    const obj = Object.create(Ctor.prototype);
    const result = Ctor.call(obj, ...args);
    return typeof result === 'object' && result !== null ? result : obj;
}

// ES5实现继承完整实现
const inherit = (Parent, Child) => {
    // 继承原型
    Child.prototype = Object.create(Parent.prototype, {
        constructor: { value: Child }
    });
    // 存储超类
    Child.super = Parent;
    // 继承静态属性
    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(Child, Parent);
    } else if (Child.__proto__) {
        Child.__proto__ = Parent;
    } else {
        for (let key in Parent) {
            if (Parent.hasOwnProperty(key) && !(key in Child)) {
                Child[key] = Parent[key];
            }
        }
    }

    // 仍旧存在的问题
    // 上面静态属性继承存在一个问题:在陈旧浏览器中，属性和方法的继承我们是静 态拷⻉的，继承完后续父类的改动不会自动同步到子类。这是不同于正常面向对 象思想的。但是这种组合式继承，已经相对完美、优雅。
}


// 扩展: 寄生组合继承Date

function SubDate(...args) {
    // 使用apply调用bind需要传递2个绑定参数
    const dateInst = new (Function.prototype.bind.apply(Date, [Date]))(...args)
    // dateInst.__proto__ = SubDate.prototype;
    Object.setPrototypeOf(dateInst, SubDate.prototype);
    return dateInst;
}
Object.setPrototypeOf(SubDate.prototype, Date.prototype);
// test

const sd = new SubDate(new Date());