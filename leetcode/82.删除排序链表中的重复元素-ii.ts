/*
 * @lc app=leetcode.cn id=82 lang=typescript
 *
 * [82] 删除排序链表中的重复元素 II
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
import { arrayToLinkList, ListNode } from '../helps'

function deleteDuplicates(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(undefined, head)
  let n = dummy
  // 循环用来确定下一个next的指向
  while (n.next && n.next.next) {
    if (n.next.val === n.next.next.val) {
      // 相等删除重复值
      const v = n.next.val
      while (n.next && n.next.val === v) {
        // 删除元素
        n.next = n.next.next
      }
    } else {
      // 不等继续遍历
      n = n.next
    }
  }

  return dummy.next
};
// @lc code=end
