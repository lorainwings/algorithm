/*
 * @lc app=leetcode.cn id=257 lang=typescript
 *
 * [257] 二叉树的所有路径
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
// import { TreeNode } from '../helps'

function binaryTreePaths(root: TreeNode | null): string[] {
  const res: string[] = []

  const next = (root: TreeNode | null, path: string) => {
    if (!root) return
    path += `${root.val}`
    if (!root.left && !root.right) { // 叶子节点
      res.push(path)
    } else {
      path += '->'
      next(root.left, path)
      next(root.right, path)
    }
  }

  next(root, '')
  return res
};
// @lc code=end
const tree = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: {
      val: 5,
      left: null,
      right: null
    }
  },
  right: {
    val: 3,
    left: null,
    right: null
  }
}

console.log('res', binaryTreePaths(tree));
