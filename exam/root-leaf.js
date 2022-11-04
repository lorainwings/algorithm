/**
 * 神策面试题
 * 打印所有从根节点到叶子节点的路径
 */

/**
 * 先序遍历, 中间值为不可变基础变量
 * @param {Array} array 
 */

const printRootToLeafRec = (array) => {
  const map = new Map()
  const res = []

  array.sort((a, b) => {
    map.set(a.id, a)
    map.set(b.id, b)
    return a.id - b.id
  })

  const next = (node, path = '') => {
    // 基础类型的变量可以保留父节点层级信息
    path += node.id
    if (!node.children) {
      // 叶子节点
      res.push(path.split('->').map(i => +i))
    } else {
      // 深度遍历
      path += '->'
      node.children.forEach((item) => {
        next(map.get(item), path)
      })
    }
  }

  next(map.get(1))
  return res
}

/**
 * 先序遍历, 中间值为可变对象
 * @param {Array} array 
 */

const printRootToLeafRecArr = (array) => {
  const map = new Map()
  const res = []

  array.sort((a, b) => {
    map.set(a.id, a)
    map.set(b.id, b)
    return a.id - b.id
  })

  const next = (node, path = []) => {
    // 深层次递归前, 不能破坏path的值, 后续应该用slice复制出新的值
    path.push(node.id)
    if (!node.children) {
      // 叶子节点
      res.push(path)
    } else {
      // 深度遍历
      node.children.forEach((item) => {
        next(map.get(item), path.slice())
      })
    }
  }

  next(map.get(1))
  return res
}

/**
 * 插值法
 * @param {Array} array 
 */
const printRootToLeaf = (array) => {
  const map = new Map()
  const res = []

  array.sort((a, b) => {
    map.set(a.id, a)
    map.set(b.id, b)
    return a.id - b.id
  })

  array.forEach(p => {
    p.path ? p.path.push(p.id) : p.path = [p.id]
    if (p.children) {
      p.children.forEach(c => {
        const cnode = map.get(c);
        (cnode.path ?? (cnode.path = [])).unshift(...p.path)
      })
    } else {
      res.push(p.path)
    }
  })

  return res
}


/* @test 测试代码 */
const array = [
  { id: 1, children: [2, 3, 4] },
  { id: 2, children: [5] },
  { id: 3, children: [6, 7] },
  { id: 4, children: [8, 9] },
  { id: 5, children: [10, 11] },
  { id: 6 },
  { id: 7, children: [12] },
  { id: 8, children: [13] },
  { id: 9 },
  { id: 10 },
  { id: 11, children: [14] },
  { id: 12 },
  { id: 13 },
  { id: 14 },
]

// const res = printRootToLeaf(array)
const res = printRootToLeafRec(array)
console.log('%c------>[LOG:]', 'color: fuchsia', res)

// [[1,2,5,10], [1,2,5,11,14], [1,3,6], [1,3,7,12]]
