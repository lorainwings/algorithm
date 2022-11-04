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

/**
 * 给节点添加flag 
 * @param head 
 * @returns { ListNode | null }
 */
function detectCycle(head: ListNode | null): ListNode | null {
  let p: ListNode & { flag?: true } | null = head
  while (p) {
    if (p.flag) return p
    p.flag = true
    p = p.next
  }
  return null
};

/**
 * 快慢指针法
 * 快指针移动2S距离, 慢指针移动S距离, 相遇就是一圈, 所以入口就是相遇点的下一个点
 * 路程: 设a为入环的前一段距离, b为slow已走过的环距离, c为相遇点到入环点的距离, b + c刚好为一环
 *    fast: a + n(b + c) + b
 *    slow: a + b
 * 当fast每次走两步,slow每次走一步, 任意时刻, fast 指针走过的距离都为 slow 指针的 2 倍:
 *    2(a + b) = a + n(b + c) + b
 *    a = c + (n − 1)(b + c)
 * @param head 
 * @returns { ListNode | null }
 */
