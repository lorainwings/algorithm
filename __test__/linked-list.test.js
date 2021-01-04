const { arrToLinkedList, delNode, turnOverList, delSortListRepeatNode } = require('../linked-list')

describe('删除链表中给定的元素', () => {
    // 测试用例1
    it('[4,5,1,9]->[4,5,9', () => {
        expect(delNode()).toEqual({ val: 4, next: { val: 5, next: { val: 9 } } });
    });
});

describe('翻转链表', () => {
    // 测试用例1
    it('[1->2->3->4->5->null]===>[5->4->3->2->1->null]', () => {
        expect(turnOverList()).toEqual({ val: 5, next: { val: 4, next: { val: 3, next: { val: 2, next: { val: 1, next: null } } } } });
    });
});

describe('删除排序链表中的重复元素', () => {
    // 测试用例1
    it('[1,1,2]->[1,2] ', () => {
        const list = arrToLinkedList([1, 1, 2]);
        const res = arrToLinkedList([1, 2]);
        expect(delSortListRepeatNode(list)).toEqual(res);
    });

    it('[1,1,2,3,3]->[1,2,3]', () => {
        const list = arrToLinkedList([1, 1, 2, 3, 3]);
        const res = arrToLinkedList([1, 2, 3]);
        expect(delSortListRepeatNode(list)).toEqual(res);
    });
});