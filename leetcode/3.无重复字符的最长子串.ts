/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s: string) {
  let max = 0
  for (let p = 0; p < s.length; p++) {
    const m = new Map()
    for (let i = p; i < s.length; i++) {
      if (m.has(s[i])) {
        max = (i - p) > max ? i - p : max
        break;
      }
      m.set(s[i], i)
    }
  }
  return max
};
// @lc code=end

lengthOfLongestSubstring('abcabcbb')