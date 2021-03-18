// 缓存算法

// fifo
class Fifo {
    constructor(limit) {
        this.limit = limit;
        this.caches = new Map();
        this.keys = [];
    }

    add(k, v) {
        if (!this.caches.get(k)) {
            if (this.keys.length === this.limit) {
                this.caches.delete(this.keys.shift());
            }
            this.keys.push(k);
        }
        this.caches.set(k, v);
    }

    get(k) {
        if (!this.caches.has(k)) return -1;
        return this.caches.get(k);
    }
}
// fifo optimize
class Fifo {
    constructor(limit) {
        this.limit = limit;
        this.caches = new Map();
    }

    add(k, v) {
        if (!this.caches.get(k)) {
            if (this.caches.size === this.limit) {
                const first = this.caches.keys().next().value;
                this.caches.delete(first);
            }
        } else {
            this.caches.delete(k); // 已经有了必须删除
        }
        this.caches.set(k, v);
    }

    get(k) {
        if (!this.caches.has(k)) return -1;
        return this.caches.get(k);
    }
}

// LRU map实现
class LRU {
    constructor(limit) {
        this.limit = limit;
        this.caches = new Map();
    }
    set(k, v) {
        if (!this.caches.get(k)) {
            if (this.caches.size === this.limit) {
                // 获取到Map中第一个数据的key值，即最近最少访问的key，删之
                // const first = this.caches().keys().next().value;
                const [[firstk]] = this.caches;
                this.caches.delete(firstk);
            }
        } else {
            this.caches.delete(k);
        }
        this.caches.set(k, v);
    };
    get(k) {
        if (!this.caches.has(k)) return -1;

        const v = this.caches.get(k);
        this.caches.delete(k);
        this.caches.set(k, v);
        return v;
    }
}