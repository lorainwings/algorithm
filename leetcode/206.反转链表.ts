/*
 * @lc app=leetcode.cn id=206 lang=typescript
 *
 * [206] 反转链表
 */

// @lc code=start
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

function reverseList(head: ListNode | null): ListNode | null {
  let dummy = null
  let p1: ListNode | null = dummy, p2: ListNode | null = head
  while (p2) {
    const t = p2.next
    p2.next = p1
    p1 = p2
    p2 = t
  }
  return p1
};
// @lc code=end

