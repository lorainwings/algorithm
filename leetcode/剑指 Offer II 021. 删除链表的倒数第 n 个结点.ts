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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let dummy = new ListNode(undefined, head)
  let slow: ListNode | null = dummy
  let fast: ListNode | null = dummy
  while (fast && n >= 0) {
    fast = fast.next
    n--
  }
  while (slow && fast) {
    slow = slow.next
    fast = fast.next
  }
  if (slow && slow.next) {
    slow.next = slow.next.next
  }
  return dummy.next
};


/* test */
const r = removeNthFromEnd(arrayToLinkList([1, 2, 3, 4, 5]), 2)
console.log(r);