const { maxDepth, maxDepthCallee, minDepth, minDepthByArr, levelOrder,levelOrderWhile } = require('../tree/leetcode')

const btree = {
    val: 3,
    left: {
        val: 9,
        left: null,
        right: null
    },
    right: {
        val: 20,
        left: {
            val: 15,
            left: null,
            right: null
        },
        right: {
            val: 7,
            left: null,
            right: null
        }
    }
}

const btree1 = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 4,
            left: {
                val: 8,
                left: {
                    val: 10,
                    left: null,
                    right: null
                },
                right: null
            },
            right: {
                val: 9,
                left: null,
                right: null
            },
        },
        right: {
            val: 5,
            left: null,
            right: null
        }
    },
    right: {
        val: 3,
        left: {
            val: 6,
            left: null,
            right: null
        },
        right: {
            val: 7,
            left: null,
            right: null
        }
    }
}

describe('二叉树的最大深度BFS遍历版', () => {
    it('btree->3', () => {
        expect(maxDepth(btree)).toEqual(3);
    });
    it('btree1->5', () => {
        expect(maxDepth(btree1)).toEqual(5);
    });
});

describe('二叉树的最大深度DFS递归版', () => {
    it('btree->3', () => {
        expect(maxDepthCallee(btree)).toEqual(3);
    });
    it('btree1->5', () => {
        expect(maxDepthCallee(btree1)).toEqual(5);
    });
});

describe('二叉树的最小深度BFS遍历版', () => {
    it('btree->2', () => {
        expect(minDepth(btree)).toEqual(2);
    });
    it('btree1->3', () => {
        expect(minDepthByArr(btree1)).toEqual(3);
    });
});

describe('二叉树的最小深度二维数组版', () => {
    it('btree->2', () => {
        expect(minDepth(btree)).toEqual(2);
    });
    it('btree1->3', () => {
        expect(minDepthByArr(btree1)).toEqual(3);
    });
});

describe('二叉树的层序遍历', () => {
    it('btree->[[3], [9, 20], [15, 7]]', () => {
        expect(levelOrder(btree)).toEqual([[3], [9, 20], [15, 7]]);
    });
    it('btree1->[[1], [2, 3], [4, 5], [6, 7], [8, 9], [10]]', () => {
        expect(levelOrder(btree1)).toEqual([[1], [2, 3], [4, 5, 6, 7], [8, 9], [10]]);
    });
});

describe('二叉树的层序遍历双层while', () => {
    it('btree->[[3], [9, 20], [15, 7]]', () => {
        expect(levelOrderWhile(btree)).toEqual([[3], [9, 20], [15, 7]]);
    });
    it('btree1->[[1], [2, 3], [4, 5], [6, 7], [8, 9], [10]]', () => {
        expect(levelOrderWhile(btree1)).toEqual([[1], [2, 3], [4, 5, 6, 7], [8, 9], [10]]);
    });
});

