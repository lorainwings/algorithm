// 堆是一颗完全二叉树(每层完全填满,最后一层如果不满,只缺少右边)
// ================================================================== //
// 堆分为最大堆和最小堆
// 最大堆: 父节点均大于等于子节点
// 最小堆: 父节点均小于等于子节点
// js中使用数组来表示堆; 节点的值为数组值, 位置为下标;
// 任意节点左侧子节点位置: 2*index+1, 任意节点右侧子节点位置: 2*index+2
// 任意节点的父节点位置: (index-1)/2
// ================================================================== //
// 堆的作用:  快速找出最大值和最小值, 因为时间复杂度O(1)
// 但凡遇到第k个最大(小)元素, 均使用堆来解决


// 最小堆
class MinHeap {
    heap = [];

    getLeft(index) {
        return 2 * index + 1;
    }

    getRight() {
        return 2 * index + 2;
    }

    getParent(index) {
        return index - 1 >> 1;
    }

    swap(pIndex, index) {
        [this.heap[pIndex], this.heap[index]] = [this.heap[index], this.heap[pIndex]]
    }

    shiftUp(index) {
        const pIndex = this.getParent(index);
        const parent = this.heap[pIndex];
        const current = this.heap[index];
        if (parent > current) {
            this.swap(pIndex, index);
            this.shiftUp(pIndex);
        }
    }

    shiftDown(index) {
        const leftIndex = getLeft(index);
        const rightIndex = this.getRight(index);
        if (this.heap[leftIndex] < this.heap[index]) {
            this.swap(leftIndex, index);
            this.shiftDown(leftIndex);
        }
        if (this.heap[rightIndex] < this.heap[index]) {
            this.swap(rightIndex, index);
            this.shiftDown(rightIndex);
        }
    }

    insert(n) {
        this.heap.push(n);
        this.shiftUp(this.heap.lenght - 1);
    }

    // 直接删除堆顶会破坏堆结构, 只能用尾部元素来替换堆顶, 最后再来下移
    pop() {
        const topIndex = 0;
        this.heap[topIndex] = this.heap.pop();
        this.shiftDown(topIndex);
    }

    // 获取堆顶
    peek() {
        return this.heap[0];
    }

    // 获取堆大小
    size() {
        return this.heap.length;
    }
}


module.exports = MinHeap;