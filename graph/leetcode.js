// 克隆图
// Define for a Node
class Node {
    constructor(val, neighbors) {
        this.val = val === undefined ? 0 : val;
        this.neighbors = neighbors === undefined ? [] : neighbors;
    }
}

// 133. 克隆一个图, 先深度优先遍历, 同时存储克隆节点
const cloneGraph = (node) => {
    if (!node) return;
    const visted = new Map();
    const dfs = (n) => {
        const cpn = new Node(n);
        visted.set(n, cpn);
        n.neighbors?.forEach(ne => {
            if (!visted.has(ne)) {
                dfs(ne);
            }
            // 只有Visted中存在的节点, 才会进入到下面这个逻辑;不存在又会递归, 知道visted中存在为止;
            cpn.neighbors.push(visted.get(ne));
        });
    }
    dfs(node);
    return visted.get(node).val;
}

// 133. 使用广度优先遍历克隆图
const cloneGraphBFS = (node) => {
    if (!node) return;
    const queue = [node];
    const visted = new Map([[node, new Node(node)]]);
    if (queue.length) {
        const n = queue.shift();
        n.neighbors?.forEach(ne => {
            const cpn = new Node(ne);
            if (!visted.has(ne)) {
                queue.push(ne);
                visted.set(ne, cpn);
            }
            cpn.neighbors.push(visted.get(ne));
        });
    }
    return visted.get(node).val;
}

module.exports = {
    cloneGraph,
    cloneGraphBFS
}