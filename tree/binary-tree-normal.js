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

// 二叉树的先中后序遍历普通版


// const preOrder = (r) => {
//     if (!r) return;
//     console.log(r.val);
//     preOrder(r.left);
//     preOrder(r.right);
// }

// 先序遍历  根->左->右
const preOrder = (r) => {
    if (!r) return;
    const stack = [r];
    while (stack.length) {
        const n = stack.pop()
        console.log(n);
        if (n.right) stack.push(n.right)
        if (n.left) stack.push(n.left)
    }
}


// const inOrder = (r) => {
//     if (!r) return;
//     inOrder(r.left);
//     console.log(r.val);
//     inOrder(r.right);
// }


// 中序遍历  左->根->右
const inOrder = (r) => {
    if (!r) return;
    const stack = [];
    let p = r;
    while (stack.length || p) {
        while (p) {
            stack.push(p);
            p = p.left;
        }
        const n = stack.pop();
        console.log(n.val);
        p = n.right;
    }

}


// const postOrder = (r) => {
//     if (!r) return;
//     postOrder(r.left);
//     postOrder(r.right);
//     console.log(r.val);
// }

// 后序遍历  左->右->根  
const postOrder = (r) => {
    if (!r) return;
    const stack = [r];
    const oStack = [];
    while (stack.length) {
        const n = stack.pop()
        oStack.push(n);
        if (n.left) stack.push(n.left)
        if (n.right) stack.push(n.right)
    }
    while(oStack.length){
        const o = oStack.pop();
        console.log(o.val);
    }

}

postOrder(btree)