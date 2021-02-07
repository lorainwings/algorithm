//图可以使用邻接表和邻接矩阵等来表示


// 邻接表
const graph = {
    0: [1, 2],
    1: [2],
    2: [0, 3],
    3: [3]
}


// 图的深度遍历
// n是指图的遍历入口
const dfsG = (n) => {
    const visted = new Set();
    const dfs = (n) => {
        console.log(n);
        visted.add(n);
        graph[n].forEach(c => {
            if (!visted.has(c)) {
                dfs(c)
            }
        })
    }
    dfs(n);
}

// 图的广度遍历
const bfsG = (n) => {
    const queue = [n];
    const visted = new Set(queue); // 要将首先访问的先加入
    while (queue.length) {
        const c = queue.shift();
        console.log(c);
        graph[c].forEach(item => {
            if (!visted.has(item)) {
                queue.push(item);
                visted.add(item);
            }
        });
    }
}

// dfsG(2)

// 最小距离(Dijkstra)狄克斯特拉算法
const Dijkstra = () => {
    const processed = new Map();
    const find_lowest_cost_node = (costs) => {
        let lowest_cost = 0;
        let lowest_cost_node = null;
        costs.forEach(node => {
            const cost = costs[node]
            if (cost < lowest_cost && !processed.has(node)) {
                lowest_cost = cost
                lowest_cost_node = node
            }
        })
        return lowest_cost_node
    }

    let node = find_lowest_cost_node(costs)
    while (!node) {
        cost = costs[node]
        neighbors = graph[node]
        for (n in neighbors.keys()) {
            new_cost = cost + neighbors[n]
            if (costs[n] > new_cost) {
                costs[n] = new_cost;
                parents[n] = node;
            }
        }
        processed.set(node)
        node = find_lowest_cost_node(costs)
    }
}