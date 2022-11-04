/*
 * @lc app=leetcode.cn id=232 lang=typescript
 *
 * [232] 用栈实现队列
 */

// @lc code=start
class MyQueue {
  // 用于存放pop的栈
  private stackA: number[] = []
  // 用于存放push的栈
  private stackB: number[] = []

  push(x: number): void {
    this.stackB.push(x)
  }

  transform() {
    if (!this.stackA.length) {
      while (this.stackB.length) {
        const item = this.stackB.pop() as number
        this.stackA.push(item)
      }
    }
  }

  pop(): number {
    if (this.stackA.length) return this.stackA.pop() as number
    this.transform()
    return this.stackA.pop() as number
  }

  peek(): number {
    if (this.stackA.length) return this.stackA[this.stackA.length - 1] as number
    this.transform()
    return this.stackA[this.stackA.length - 1] as number
  }

  empty(): boolean {
    return !(this.stackA.length || this.stackB.length)
  }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
// @lc code=end

