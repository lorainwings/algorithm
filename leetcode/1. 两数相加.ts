import { arrayToLinkList, ListNode } from '../helps'

const twoSum = function (nums: number[], target: number) {
  const m = new Map()
  for (let i = 0; i < nums.length; i++) {
    const c = nums[i]
    if (m.has(target - c)) return [m.get(target - c), i]
    m.set(c, i)
  }
};


