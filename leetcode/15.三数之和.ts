/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums: number[]) {
  const len = nums.length
  const res = []
  nums = nums.sort((a, b) => a - b)
  for (let i = 0; i < len - 2; i++) {
    let fp = i + 1
    let ep = len - 1
    const cv = nums[i]
    if (i > 0 && cv === nums[i - 1]) continue

    while (fp < ep) {
      const sum = cv + nums[fp] + nums[ep]
      if (sum < 0) {
        fp++
        while (fp < ep && nums[fp] === nums[fp - 1]) {
          fp++
        }
      } else if (sum > 0) {
        ep--
        while (fp < ep && nums[ep] === nums[ep + 1]) {
          ep--
        }
      } else {
        res.push([cv, nums[fp], nums[ep]])
        fp++
        ep--
        while (fp < ep && nums[fp] === nums[fp - 1]) {
          fp++
        }
        while (fp < ep && nums[ep] === nums[ep + 1]) {
          ep--
        }
      }
    }
  }
  return res
};
// @lc code=end

// console.log(threeSum([0,0,0]));