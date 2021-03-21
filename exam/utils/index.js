const typeGet = t => Object.prototype.toString.call(t).slice(8, -1);

const isObject = t => t !== null && (typeof t === 'object' || typeof t === 'function')

const forEvery = (t, iterator) => {
    const type = typeGet(t);
    const items = type !== 'Array' ? Object.keys(t) : t;
    items.forEach((v, k) => {
        const key = type === 'Array' ? k : v;
        iterator(t[key], key, t);
    });
    return t;
}


module.exports = {
    typeGet,
    forEvery,
    isObject
}