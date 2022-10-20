/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
import { arrayToLinkList, ListNode } from '../helps'

// 翻转链表 多指针法
function reverseList(head: ListNode | null): ListNode | null {
  let prev = null
  let curr = head

  while (curr) {
    const next = curr.next

    curr.next = prev
    prev = curr
    curr = next
  }
  return prev
}
console.log(reverseList(arrayToLinkList([1, 2, 3, 4, 5])));
