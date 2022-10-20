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

function reverseBetween(head: ListNode | null, left: number, right?: number): ListNode | null {
  const dummy: ListNode | null = new ListNode(undefined, head)
  let prev: ListNode | null,
    curr: ListNode | null = dummy
  let start, leftSide

  for (let i = 0; i < left - 1; i++) {
    curr &&= curr.next
  }
  // 翻转区间的前驱结点
  leftSide = curr
  // 翻转区间第一个节点
  start = prev = curr && curr.next
  // 翻转区间第二个节点
  curr = prev && prev.next

  while (curr && (right ? left++ < right : true)) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  leftSide!.next = prev
  start!.next = curr
  return dummy.next
};

/* test */
const r = reverseBetween(arrayToLinkList([3, 5]), 1)
console.log(r);


