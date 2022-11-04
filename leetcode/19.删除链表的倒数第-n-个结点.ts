import { arrayToLinkList, ListNode } from '../helps'
/*
 * @lc app=leetcode.cn id=19 lang=typescript
 *
 * [19] 删除链表的倒数第 N 个结点
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
// 倒数第n个, 就是正数m-n+1个
// 使用快慢指针, 快指针提前走n步, 当快指针到链表尾部, 他们相差刚刚是n步
// 此时, 慢指针指向的就是倒数第N个元素
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let dummy: ListNode | null = new ListNode(undefined, head)
  let slow: ListNode | null = dummy
  let fast: ListNode | null = dummy

  while (n-- !== 0 && fast) {
    fast = fast.next
  }

  while (fast && fast.next) {
    fast = fast.next
    slow = slow!.next
  }

  if (slow && slow.next) slow.next = slow.next.next

  return dummy.next
};
// @lc code=end

const l1 = arrayToLinkList([1, 2, 3, 4, 5])

console.log(removeNthFromEnd(l1, 2)); 
