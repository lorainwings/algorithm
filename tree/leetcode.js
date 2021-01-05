
//104二叉树的最大深度 bfs实现
const maxDepth = (root) => {
    let depth = 0;
    if (!root) return depth;
    const stack = [root];
    while (stack.length) {
        depth++;
        let level = stack.length;
        while (level > 0) {
            const n = stack.shift();
            if (n.left) { stack.push(n.left); };
            if (n.right) { stack.push(n.right); };
            level--;
        }
    }
    return depth;
}

// 104二叉树的最大深度 dfs实现
const maxDepthCallee = (root) => {
    let depth = 0;
    const dfs = (n, d) => {
        if (n === null) return;
        depth = Math.max(d, depth);
        if (n.left) dfs(n.left, d + 1);
        if (n.right) dfs(n.right, d + 1);
    }
    dfs(root, 1);
    return depth;
}

// 111二叉树的最小深度BFS实现(第一种解法)
const minDepth = (root) => {
    let depth = 0;
    if (!root) return depth;
    const stack = [root];
    while (stack.length) {
        depth++;
        let level = stack.length;
        while (level > 0) {
            const n = stack.shift();
            if (!n.left || !n.right) return depth;
            if (n.left) { stack.push(n.left); };
            if (n.right) { stack.push(n.right); };
            level--;
        }
    }
    return depth;
}

// 111二叉树的最小深度BFS实现(第二种解法)
const minDepthByArr = (root) => {
    let depth = 0;
    if (!root) return depth;
    const stack = [[root, 1]]; // 用二维数组, 保存层级
    while (stack.length) {
        const [n, level] = stack.shift();
        if (!n.left || !n.right) return level;
        if (n.left) { stack.push([n.left, level + 1]); };
        if (n.right) { stack.push([n.right, level + 1]); };
    }
}

// 102二叉树的层序遍历(第一种解法)
const levelOrder = (root) => {
    const level = [];
    if (!root) return level;
    const stack = [[root, 0]];
    while (stack.length) {
        const [n, l] = stack.shift();
        if (level[l]) level[l].push(n.val);
        else level[l] = [n.val];
        if (n.left) stack.push([n.left, l + 1]);
        if (n.right) stack.push([n.right, l + 1]);
    }
    return level;
}

// 102二叉树的层序遍历(第二种解法)
const levelOrderWhile = (root) => {
    const level = [];
    if (!root) return level;
    const stack = [root];
    while (stack.length) {
        let childLen = stack.length; // 每层的开始都是所有的儿子
        level.push([]);
        while (childLen--) { // 该循环内部都是同一层级
            const n = stack.shift();
            level[level.length - 1].push(n.val);
            if (n.left) { stack.push(n.left); };
            if (n.right) { stack.push(n.right); };
        }
    }
    return level;
}

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

module.exports = {
    maxDepth,
    maxDepthCallee,
    minDepth,
    minDepthByArr,
    levelOrder,
    levelOrderWhile
}
