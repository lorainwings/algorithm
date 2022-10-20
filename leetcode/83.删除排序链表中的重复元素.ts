/*
@lc app=leetcode.cn id=83 lang=typescript
 *
[83] 删除排序链表中的重复元素
 */

// @lc code=start
/* *
 * Definition for singly-linked list.
 * class ListNode {
 *   val: number
 *   next: ListNode | null
 *   constructor(val?: number, next?: ListNode | null) {
 *     this.val = (val === undefined ? 0 : val)
 *     this.next = (next === undefined ? null : next)
 *   }
 * }
 */
import { arrayToLinkList, ListNode } from '../helps'

function deleteDuplicates(head: ListNode | null): ListNode | null {
  let c = head
  while (c && c.next) {
    if (c.val === c.next.val) {
      c.next = c.next.next
    } else {
      c = c.next
    }
  }
  return head
};
// @lc code=end

const r = deleteDuplicates(arrayToLinkList([1, 1, 2, 3, 3]))
console.log(r);