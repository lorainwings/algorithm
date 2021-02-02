
import MinHeap from './index'


// 215.数组中的第k个最大的元素
// 时间复杂度O(logK), 空间复杂度就是堆的大小O(K);
const maxKthLargest = (nums, k) => {
    const heap = MinHeap();
    nums.forEach(n => {
        heap.insert(n);
        if (heap.size() > k) {
            heap.pop();
        }
    });
    return heap.peek();
}


// 347. 前k个高频元素
const topKFrequent = (nums, k) => {
    const map = new Map();
    nums.forEach(n => {
        map.set(n, map.has(n) ? map.get(n) + 1 : 1);
    });
    const h = new MinHeap();
    map.forEach((v, k) => {
        h.insert({ value: v, key: k }); //此处修改MinHeap类的比较方法
        if (h.size() > k) h.pop();
    });
    return h.heap.map(item => item.key);
}


// 23. 合并k个排序链表
const mergeKLists = (lists) => {
    // 首先重写MinHeap的部分方法
    class MinHeapExt extends MinHeap {
        constructor(...args) {
            super(...args);
        }
        shiftUp(index) {
            const pIndex = this.getParent(index);
            const parent = this.heap[pIndex];
            const current = this.heap[index];
            if (parent?.val > current?.val) {
                this.swap(pIndex, index);
                this.shiftUp(pIndex);
            }
        }
        shiftDown(index) {
            const leftIndex = getLeft(index);
            const rightIndex = this.getRight(index);
            if (this.heap[leftIndex]?.val < this.heap[index]?.val) {
                this.swap(leftIndex, index);
                this.shiftDown(leftIndex);
            }
            if (this.heap[rightIndex]?.val < this.heap[index]?.val) {
                this.swap(rightIndex, index);
                this.shiftDown(rightIndex);
            }
        }
        pop() {
            const topIndex = 0;
            if (this.size() === 1) return this.heap.shift();
            this.heap[topIndex] = this.heap.pop();
            this.shiftDown(topIndex);
            return this.heap[topIndex];
        }
    }
    class ListNode {
        constructor(val) {
            this.val = val;
            this.next = null;
        }
    }

    const res = new ListNode(0);
    const p = res;
    const h = new MinHeapExt();
    lists.forEach(l => {
        if (l) h.insert(l);
    });
    while (h.size()) {
        const n = h.pop();
        p.next = n;
        p = p.next;
        if (n.next) h.insert(n.next);
    }

    return res.next;
}


export default {
    maxKthLargest,
    topKFrequent,
    mergeKLists
}