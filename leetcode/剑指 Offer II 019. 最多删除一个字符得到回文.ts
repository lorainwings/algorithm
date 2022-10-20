/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s: string) {
  const help = (si: number, ei: number) => {
    while (si < ei) {
      if (s[si] !== s[ei]) return false
      si++
      ei--
    }
    return true
  }

  let fp = 0
  let ep = s.length - 1
  while (fp < ep && s[fp] === s[ep]) {
    fp++
    ep--
  }

  // 左指针右移[left+1, right]
  // 右指针左移[left, right-1]
  if (help(fp + 1, ep) || help(fp, ep - 1)) return true

  return false
};