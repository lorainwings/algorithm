
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

