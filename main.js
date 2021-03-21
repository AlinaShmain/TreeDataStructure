class TreeNode {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  createRandomIntegerTree(numNodes) {
    const RANDOM_RANGE = 10 * numNodes;

    this.insert(Math.floor(Math.random() * Math.floor(RANDOM_RANGE)));

    let treeSize = this.countNodes(this.root);

    while (treeSize < numNodes) {
      let count = numNodes - treeSize;
      while (count-- > 0) {
        this.insert(Math.floor(Math.random() * Math.floor(RANDOM_RANGE)));
      }
      treeSize = this.countNodes(this.root);
    }

    return this;
  }

  countNodes(n) {
    if (n == null) return 0;
    return 1 + this.countNodes(n.left) + this.countNodes(n.right);
  }

  insert(data) {
    let newNode = new TreeNode(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  findMin() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  findMax() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }

  getRootNode() {
    return this.root;
  }

  find(data) {
    let current = this.root;
    while (current.data !== data) {
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current === null) {
        return null;
      }
    }
    return current;
  }

  isPresent(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) {
        return true;
      }
      data < current.data
        ? (current = current.left)
        : (current = current.right);
    }
    return false;
  }

  remove(data) {
    const removeNode = function (node, data) {
      if (node === null) return null;
      if (data === node.data) {
        if (node.left === null && node.right === null) return null;
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    };
    this.root = removeNode(this.root, data);
  }

  inorder(node, callback) {
    if (node !== null) {
      node.left && this.inorder(node.left, callback);
      callback && callback(node.data);
      node.right && this.inorder(node.right, callback);
    }
  }

  preorder(node, callback) {
    if (node !== null) {
      callback && callback(node.data);
      node.left && this.preorder(node.left, callback);
      node.right && this.preorder(node.right, callback);
    }
  }

  postorder(node, callback) {
    if (node !== null) {
      node.left && this.postorder(node.left, callback);
      node.right && this.postorder(node.right, callback);
      callback && callback(node.data);
    }
  }

  getDepth() {
    let node = this.root;
    let maxDepth = 0;
    const traverse = function (node, depth) {
      if (!node) return null;
      if (node) {
        maxDepth = Math.max(depth, maxDepth);
        traverse(node.left, depth + 1);
        traverse(node.right, depth + 1);
      }
    };
    traverse(node, 0);
    return maxDepth;
  }
}

const bst = new BinarySearchTree();
bst.createRandomIntegerTree(20);
let root = bst.getRootNode();
console.log("root", root);

bst.insert(7);

console.log("inorder traversal:");
bst.inorder(root, (data) => {
  console.log(data);
});
console.log("postorder traversal:");
bst.postorder(root, (data) => {
  console.log(data);
});
console.log("preorder traversal:");
bst.preorder(root, (data) => {
  console.log(data);
});

console.log("depth of the tree:", bst.getDepth());
console.log("min node:", bst.findMin());
console.log("max node:", bst.findMax());

bst.remove(4);
console.log(
  `node 4 is${bst.isPresent(4) ? "" : " not"} present in current tree`
);
console.log(
  `node 7 is${bst.isPresent(7) ? "" : " not"} present in current tree`
);
