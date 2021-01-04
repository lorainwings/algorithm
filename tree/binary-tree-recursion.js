const btree = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 4,
            left: null,
            right: null
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

// 二叉树的先中后序遍历递归版

// 先序遍历  根->左->右
const preOrder = (r) => {
    if (!r) return;
    console.log(r.val);
    preOrder(r.left);
    preOrder(r.right);
}

// 中序遍历  左->根->右
const inOrder = (r) => {
    if (!r) return;
    inOrder(r.left);
    console.log(r.val);
    inOrder(r.right);
}

// 后序遍历  左->右->根
const postOrder = (r) => {
    if (!r) return;
    postOrder(r.left);
    postOrder(r.right);
    console.log(r.val);
}

postOrder(btree)