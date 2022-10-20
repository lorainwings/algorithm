/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1: Array<number>, m: number, nums2: Array<number>, n: number) {
  let pn1 = m - 1
  let pn2 = n - 1
  let p = m + n - 1
  while (pn1 >= 0 && pn2 >= 0) {
    nums1[p] = nums1[pn1] > nums2[pn2]
      ? nums1[pn1--]
      : nums2[pn2--]
    p--
  }
  while (pn2 >= 0) {
    nums1[p--] = nums2[pn2--]
  }
  return nums1
};
// @lc code=end
/* var nums1 = [0], m = 0, nums2 = [1], n = 1
const v = merge(nums1, m, nums2, n)
console.log(v); */