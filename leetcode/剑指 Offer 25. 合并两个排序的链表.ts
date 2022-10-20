
/* *
 * Definition for singly-linked list.
 */
import { arrayToLinkList, ListNode } from '../helps'
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1: ListNode | null, l2: ListNode | null) {
  const head = new ListNode()
  let p = head
  // p指针始终比链表指针慢一步
  while (l1 && l2) {
    if (l1.val >= l2.val) {
      p.next = l2
      l2 = l2.next
    } else {
      p.next = l1
      l1 = l1.next
    }
    // 因此, 此处才是安全的
    p = p.next
  }
  p.next = l1 ? l1 : l2
  return head.next
};

const l1 = arrayToLinkList([1, 2, 4])
const l2 = arrayToLinkList([1, 3, 4])

console.log(mergeTwoLists(l1, l2)); 