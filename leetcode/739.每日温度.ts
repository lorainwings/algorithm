/*
 * @lc app=leetcode.cn id=739 lang=typescript
 * 默认传入的数组是递减的温度列表, 只要出现递增, 就将index存入stack, 用于后续处理
 * stack表示待未处理的下标集合
 * 每遍历到下一个值, 都与栈顶逐一对比
 * [739] 每日温度
 */

// @lc code=start
function dailyTemperatures(temperatures: number[]): number[] {
  const res: number[] = new Array(temperatures.length).fill(0)
  const stack: number[] = []
  temperatures.forEach((v, i, array) => {
    while (stack.length && array[stack[stack.length - 1]] < v) {
      const inx = <number>stack.pop()
      res[inx] = i - inx
    }
    stack.push(i)
  })
  return res
};
// @lc code=end


const res = dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])
console.log('res', res);  
