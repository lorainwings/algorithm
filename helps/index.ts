class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

const arrayToLinkList = <T extends number[]>(arr: T): ListNode => {
  const r = new ListNode()
  let p: ListNode | null = r
  arr.map((item, i) => {
    if (p) {
      p.val = item;
      p.next = i === arr.length - 1 ? null : new ListNode()
      p = p.next
    }
  })
  return r
}
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

export {
  ListNode,
  TreeNode,
  arrayToLinkList
}