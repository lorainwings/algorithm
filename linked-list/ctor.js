
/* 链表元素 */
class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}
/* head: 链表头元素, 空链表指向null
 * node: 链表的元素
 * size: 维护链表元素个数
 * add方法: 增加指定链表元素
 * remove方法: 删除指定链表元素
 * set方法: 改变指定链表元素
 * clear方法: 清除整个链表
 */
export default class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }

  _getNode(index) {
    if (index < 0 || index > this.size) return new Error('cross boundary')
    let p = this.head
    for (let i = 0; i < index; i++) {
      p = p.next
    }
    return p
  }

  add(index, element) {
    if (arguments.length === 1) {
      element = index
      index = this.size
    }

    if (index < 0 || index > this.size) return new Error('cross boundary')


    if (index === 0) {
      const h = this.head
      this.head = new Node(element, h)
    } else {
      const prev = this._getNode(index - 1)
      prev.next = new Node(element, prev.next)
    }

    this.size++
  }

  remove(index) {
    let rmNode = null
    if (index === 0) {
      rmNode = this.head
      if (!rmNode) return undefined
      this.head = rmNode.next
    }

    const prev = this._getNode(index - 1)
    rmNode = prev.next
    prev.next = rmNode.next
    this.size--
    return rmNode
  }

  set(index, element) {
    const c = this._getNode(index)
    c.element = element
  }

  get(index) {
    return this._getNode(index)
  }

  clear() {
    this.head = null
    this.size = 0
  }

}


const l = new LinkedList()

l.add('node1')
l.add('node2')
l.add(1, 'node3')

console.log(l);