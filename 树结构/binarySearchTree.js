// 封装二叉搜索树（特点：左子树节点值 < 根节点，右子树节点值 > 根节点）
function BinarySearchTree() {
    // 节点类
    function Node(key) {
        this.key = key
        this.right = null
        this.left = null
    }

    this.root = null

    // 插入方法
    BinarySearchTree.prototype.insert = function (key) {
        // 1、根据key创建节点
        let newNode = new Node(key)

        if (this.root === null) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode)
        }

    }

    // 通过递归将newNode插入适当位置
    BinarySearchTree.prototype.insertNode = function (node, newNode) {
        if (newNode.key < node.key) { // 向左查找
            if (node.left === null) {
                node.left = newNode
            } else {
                this.insertNode(node.left, newNode)
            }
        } else { // 向右查找
            if (node.right === null) {
                node.right = newNode
            } else {
                this.insertNode(node.right, newNode)
            }
        }
    }

    // 先序遍历
    BinarySearchTree.prototype.preOrderTraversal = function (handler) {
        this.preOrderTraversalNode(this.root, handler)
    }

    BinarySearchTree.prototype.preOrderTraversalNode = function (node, handler) {
        if (node !== null) {
            // 1、处理经过的节点
            handler(node.key)
            // 2、查找经过节点的左子节点
            this.preOrderTraversalNode(node.left, handler)
            // 3、查找经过节点的右子节点
            this.preOrderTraversalNode(node.right, handler)
        }
    }

    // 中序遍历
    BinarySearchTree.prototype.midOrderTraversal = function (handler) {
        this.midOrderTraversalNode(this.root, handler)
    }

    BinarySearchTree.prototype.midOrderTraversalNode = function (node, handler) {
        if (node !== null) {
            // 1、查找经过节点的左子节点
            this.midOrderTraversalNode(node.left, handler)
            // 2、处理经过的节点
            handler(node.key)
            // 3、查找经过节点的右子节点
            this.midOrderTraversalNode(node.right, handler)
        }
    }

    // 后序遍历
    BinarySearchTree.prototype.postOrderTraversal = function (handler) {
        this.postOrderTraversalNode(this.root, handler)
    }

    BinarySearchTree.prototype.postOrderTraversalNode = function (node, handler) {
        if (node !== null) {
            // 1、查找经过节点的左子节点
            this.postOrderTraversalNode(node.left, handler)
            // 2、查找经过节点的右子节点
            this.postOrderTraversalNode(node.right, handler)
            // 3、处理经过的节点
            handler(node.key)
        }
    }

    // 寻找最小值
    BinarySearchTree.prototype.min = function () {
        let node = this.root
        while (node.left !== null) {
            node = node.left
        }
        return node.key
    }

    // 寻找最大值
    BinarySearchTree.prototype.max = function () {
        let node = this.root
        while (node.right !== null) {
            node = node.right
        }
        return node.key
    }

    // 搜索特定值
    BinarySearchTree.prototype.search = function (key) {
        let node = this.root
        // 方法一
        // 循环搜索key
        // while (node !== null) {
        //     if (key < node.key) {
        //         node = node.left
        //     } else if (key > node.key) {
        //         node = node.right
        //     } else {
        //         return true
        //     }
        // }
        // return false

        // 方法二
        // 递归搜索key
        return this.searchNode(key, node)
    }

    // 搜索特定节点
    BinarySearchTree.prototype.searchNode = function (key, node) {
        if (node === null) {
            return false
        }

        if (key<node.key) {
            node = node.left
            return this.searchNode(key, node)
        } else if (key>node.key) {
            node = node.right
            return this.searchNode(key, node)
        } else {
            return true
        }
    }

    // 删除节点
    BinarySearchTree.prototype.remove = function (key) {
        // 1、寻找要删除的节点
        // 1.1、定义变量保存信息
        let currentNode = this.root
        let parentNode = null
        let isLeftChild = true // 当前节点是否是父节点的左子节点，默认true
        // 1.2、开始寻找要删除的节点
        while(currentNode.key !== key) {
            parentNode = currentNode
            if (key<currentNode.key) {
                currentNode = currentNode.left
                isLeftChild = true
            }else {
                currentNode = currentNode.right
                isLeftChild = false
            }
            // 遍历到最后的节点，仍没有===key
            if (currentNode === null) return false
        }

        // 2、根据对应情况删除节点
        // 2.1、删除的节点是叶子结点(没有子节点)
        if (currentNode.left === null&&currentNode.right===null) {
            if (currentNode === this.root) {
                this.root = null
            }else if (isLeftChild) {
                parentNode.left = null
            } else {
                parentNode.right = null
            }
        } 

        // 2.2、 删除的节点有一个子节点
        else if (currentNode.right === null) { // currentNode只有左子节点
            //-- 2.1、currentNode 只存在<左节点>的情况
            //---- 2.1.1、currentNode 等于 root
            //---- 2.1.2、parentNode.left 等于 currentNode
            //---- 2.1.3、parentNode.right 等于 currentNode
            if (currentNode === this.root) this.root = currentNode.left
            else if (isLeftChild) {
                parentNode.left = currentNode.left
            } else {
                parentNode.right = currentNode.left
            }
        }
        else if (currentNode.left === null) { // currentNode只有右子节点
            //-- 2.2、currentNode 只存在<右节点>的情况
            //---- 2.1.1 currentNode 等于 root
            //---- 2.1.1 parentNode.left 等于 currentNode
            //---- 2.1.1 parentNode.right 等于 currentNode
            if (currentNode === this.root) this.root = currentNode.right
            else if (isLeftChild) {
                parentNode.left = currentNode.right
            } else {
                parentNode.right = currentNode.right
            }
        }

        // 2.3、 删除的节点有两个子节点
        else { 
            // 后继删除，即选择后继节点插入delNode的位置
            // 1、获取后继节点
            let successor = this.getSuccessor(currentNode)
            // 2、判断是否根节点
            if (currentNode === this.root) {
                this.root = successor
            }else if (isLeftChild) {
                parentNode.left = successor
            }else {
                parentNode.right = successor
            }

            // 3、将删除节点的左子树 = currentNode.left
            successor.left = currentNode.left
        }
    }

    // 找后继节点的方法
    // 后继节点特点：一定是delNode右子树的最小值，并且只比delNode的值大一点点
    BinarySearchTree.prototype.getSuccessor = function (delNode) {
        let successor = delNode
        let currentNode = delNode.right
        let successorParent = delNode
        // 循环查找
        while (currentNode !== null) {
            successorParent = successor
            successor = currentNode
            currentNode = currentNode.left
        }

        // 判断寻找的后继节点是否直接就是delNode的right节点
        if (successor !== delNode.right) {
            successorParent.left = successor.right
            successor.right = delNode.right
        }
        return successor
    }
}

let bst = new BinarySearchTree()
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)

// console.log(bst);

// 测试先序遍历
let res = ""
// bst.preOrderTraversal((key) => {
//     res += key + " "
// })
// console.log(res);

// // 测试中序遍历
// res = ""
// bst.midOrderTraversal((key) => {
//     res += key + " "
// })
// console.log(res);

// // 测试后序遍历
// res = ""
// bst.postOrderTraversal((key) => {
//     res += key + " "
// })
// console.log(res);

// console.log(bst.max());
// console.log(bst.min());
// console.log(bst.search(122));
bst.remove(9)
bst.remove(7)
bst.remove(15)
// // 测试后序遍历
res = ""
bst.postOrderTraversal((key) => {
    res += key + " "
})
console.log(res);
