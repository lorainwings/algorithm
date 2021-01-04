const arrToLinkedList = (arr) => {
    const list = {};
    let p = list;
    arr.forEach((v, i) => {
        p.val = v;
        p.next = i === arr.length - 1 ? null : {};
        p = p.next;
    });
    return list;
}

// 删除链表节点
const delNode = () => {
    const l1 = { val: 4 }
    const l2 = { val: 5 }
    const l3 = { val: 1 }
    const l4 = { val: 9 }
    l1.next = l2;
    l2.next = l3;
    l3.next = l4;
    // 需要删除l3
    l3.val = l3.next.val;
    l3.next = l3.next.next;
    return l1;
}


// 反转链表
// 输入: 1->2->3->4->5->null
// 输出: 5->4->3->2->1->null
const turnOverList = () => {
    const l1 = { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } }
    let p0 = null;
    let p1 = l1;
    while (p1) {
        const t = p1.next;
        p1.next = p0;
        p0 = p1;
        p1 = t;
    }
    return p0;
}

// 删除排序链表中的重复元素
// 输入: [1,1,2]->[1,2] 
// 输入: [1,1,2,3,3]->[1,2,3]
const delSortListRepeatNode = (list) => {
    let p = list;
    while (p && p.next) {
        if (p.val === p?.next?.val) {
            p.next = p.next.next;
        }
        p = p.next;
    }
    return list;
}

module.exports = {
    arrToLinkedList,
    delNode,
    turnOverList,
    delSortListRepeatNode
}