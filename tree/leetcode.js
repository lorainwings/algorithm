
//二叉树的最大深度 bfs实现
const maxDepth = (root) => {
    let depth = 0;
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

// 二叉树的最大深度 dfs实现
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

module.exports = {
    maxDepth,
    maxDepthCallee
}