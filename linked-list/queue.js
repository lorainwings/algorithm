const LinkedList = require('./ctor')


class Queue {
  constructor() {
    this.linkedList = new LinkedList()
  }

  enQueue(data) {
    this.linkedList.add(data)
  }

  deQueue() {
    return this.linkedList.remove(0)
  }
}