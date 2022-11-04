/*
 * @lc app=leetcode.cn id=155 lang=typescript
 *
 * [155] 最小栈
 */

// @lc code=start
class StackNode<T = number> {
  public val: T;
  public min: T

  constructor(val: T, min: T) {
    this.val = val
    this.min = min
  }
}

/**
 * 不借助新空间, 直接利用当前stack
 */
class MinStack {
  private stack: StackNode[] = []

  push(val: number): void {
    const min = !this.stack.length || this.getTop().min > val
      ? val
      : this.getTop().min
    this.stack.push(new StackNode(val, min))
  }

  pop(): void {
    this.stack.pop()
  }

  getTop(): StackNode {
    const last = this.stack.length - 1
    return this.stack[last]
  }

  top(): number {
    return this.getTop().val
  }

  getMin(): number {
    return this.getTop().min
  }
}



/**
 * 借助新空间完成
 */
class MinStackTwo {
  private stack: number[] = []
  private stackHelps: number[] = []

  push(val: number): void {
    this.stack.push(val)
    if (!this.stackHelps.length || this.getHelpsTop() > val) this.stackHelps.push(val)
  }

  pop(): void {
    const st = this.stack.pop()
    if (this.getHelpsTop() === st) this.stackHelps.pop()
  }

  getHelpsTop(): number {
    const last = this.stackHelps.length - 1
    return this.stackHelps[last]
  }

  top(): number {
    const last = this.stack.length - 1
    return this.stack[last]
  }

  getMin(): number {
    return this.getHelpsTop()
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
// @lc code=end

