const { maxDepth, maxDepthCallee } = require('../tree/leetcode')

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
    // 测试用例1
    it('btree->3', () => {
        expect(maxDepth(btree)).toEqual(3);
    });
    it('btree1->5', () => {
        expect(maxDepth(btree1)).toEqual(5);
    });
});

describe('二叉树的最大深度DFS递归版', () => {
    // 测试用例1
    it('btree->3', () => {
        expect(maxDepthCallee(btree)).toEqual(3);
    });
    it('btree1->5', () => {
        expect(maxDepthCallee(btree1)).toEqual(5);
    });
});

