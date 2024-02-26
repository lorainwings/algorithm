const arr = [
  { id: 12, parent_id: 1, name: "朝阳区" },
  { id: 241, parent_id: 24, name: "田林街道" },
  { id: 31, parent_id: 3, name: "广州市" },
  { id: 13, parent_id: 1, name: "昌平区" },
  { id: 2421, parent_id: 242, name: "上海科技绿洲" },
  { id: 21, parent_id: 2, name: "静安区" },
  { id: 242, parent_id: 24, name: "漕河泾街道" },
  { id: 22, parent_id: 2, name: "黄浦区" },
  { id: 11, parent_id: 1, name: "顺义区" },
  { id: 2, parent_id: 0, name: "上海市" },
  { id: 24, parent_id: 2, name: "徐汇区" },
  { id: 1, parent_id: 0, name: "北京市" },
  { id: 2422, parent_id: 242, name: "漕河泾开发区" },
  { id: 32, parent_id: 3, name: "深圳市" },
  { id: 33, parent_id: 3, name: "东莞市" },
  { id: 3, parent_id: 0, name: "广东省" },
];

// 方式一: 递归
function arrToTreeByRec(arr, parentId = 0) {
  return arr
    .filter((it) => it.parent_id === parentId)
    .map((c) => ({ ...c, children: arrToTreeByRec(arr, c.id) }));
}
console.log("---arrToTreeByRec", arrToTreeByRec(arr));

// 方式二: 循环
function arrToTreeByLoop(arr, parentId = 0) {
  // 1. 创建映射
  const map = {};
  const result = [];
  // 不对原数组进行修改
  arr.forEach((it) => (map[it.id] = { ...it }));

  arr.forEach((it) => {
    // 根节点直接存储
    if (it.parent_id === parentId) {
      result.push(map[it.id]);
    } else {
      // 不是根节点
      const itp = map[it.parent_id];
      itp.children
        ? itp.children.push(map[it.id])
        : (itp.children = [map[it.id]]);
    }
  });

  return result;
}
console.log("---arrToTrrByLoop", arrToTreeByLoop(arr));

// 方式三: 优化循环
function arrToTreeBestLoop(arr, parentId = 0) {
  // 1. 创建映射
  const map = {};
  const result = [];
  arr.forEach((it) => {
    map[it.id] ??= {};
    // 顺序原因, 需要重新合并children
    map[it.id] = map[it.id].children
      ? { ...it, children: map[it.id].children }
      : { ...it };

    if (it.parent_id === parentId) {
      result.push(map[it.id]);
    } else {
      map[it.parent_id] ??= {};
      map[it.parent_id].children ??= [];
      map[it.parent_id].children.push(map[it.id]);
    }
  });
  return result;
}
console.log("---arrToTreeBestLoop", arrToTreeBestLoop(arr));
