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

  createRandomIntegerTree(numNodes = 10) {
    const RANDOM_RANGE = 10 * numNodes;

    this.insert(Math.floor(Math.random() * Math.floor(RANDOM_RANGE)));

    let treeSize = this.countNodes();

    while (treeSize < numNodes) {
      let count = numNodes - treeSize;
      while (count-- > 0) {
        this.insert(Math.floor(Math.random() * Math.floor(RANDOM_RANGE)));
      }
      treeSize = this.countNodes();
    }

    return this;
  }

  countNodes() {
    let node = this.root;
    let num = 0;
    let count = function (n, num) {
      if (n == null) return 0;
      num = 1 + count(n.left) + count(n.right);
      return num;
    };
    num = count(node, num);
    console.log(`There are ${num} nodes in the current tree`);
    return num;
  }

  insert(data) {
    try {
      if (!data) throw new NoDataError();

      let newNode = new TreeNode(data);
      if (this.root === null) {
        this.root = newNode;
        console.log(`node ${data} was added to the tree`);
      } else {
        this.insertNode(this.root, newNode);
      }
    } catch (e) {
      console.log(e);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data == node.data) {
      console.log(`node ${newNode.data} have already exists in the tree`);
      return null;
    } else if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
        console.log(`node ${newNode.data} was added to the tree`);
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
        console.log(`node ${newNode.data} was added to the tree`);
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  findMin() {
    try {
      let current = this.root;
      if (!current) throw new EmptyError();
      while (current.left !== null) {
        current = current.left;
      }
      console.log(`Min node: ${current.data}`);
      return current.data;
    } catch (e) {
      console.log(e);
    }
  }

  findMax() {
    try {
      let current = this.root;
      if (!current) throw new EmptyError();
      while (current.right !== null) {
        current = current.right;
      }
      console.log(`Max node: ${current.data}`);
      return current.data;
    } catch (e) {
      console.log(e);
    }
  }

  getRootNode() {
    try {
      if (!this.root) {
        throw new EmptyError();
      }
      console.log(`root of the tree: ${this.root.data}`);
      return this.root;
    } catch (e) {
      console.log(e);
    }
  }

  find(data) {
    try {
      if (!data) throw new NoDataError();

      let current = this.root;

      if (!current) {
        throw new EmptyError();
      }

      while (current.data !== data) {
        if (data < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
        if (!current) {
          console.log(`node ${data} was not found in the tree`);
          return null;
        }
      }
      console.log(`node ${current.data} was found`);
      return current;
    } catch (e) {
      console.log(e);
    }
  }

  isPresent(data) {
    try {
      if (!data) throw new NoDataError();

      let current = this.root;
      let present = false;
      if (!current) throw new EmptyError();
      while (current) {
        if (data === current.data) {
          present = true;
          break;
        }
        data < current.data
          ? (current = current.left)
          : (current = current.right);
      }
      console.log(
        `node ${data} is${present ? "" : " not"} present in current tree`
      );
      return present;
    } catch (e) {
      console.log(e);
    }
  }

  remove(data) {
    try {
      if (!data) throw new NoDataError();
    } catch (e) {
      console.log(e);
      return;
    }
  
    this.root = this.removeNode(this.root, data);
  }

  removeNode(node, data) {
    try {
      if (!node) {
        if (node !== this.root)
          console.log(`there is no such node ${data} in the tree`);
        else throw new EmptyError();
        return null;
      }
      if (data === node.data) {
        if (node.left === null && node.right === null) {
          console.log(`node ${data} was removed from the tree`);
          return null;
        }
        if (node.left === null) {
          console.log(`node ${data} was removed from the tree`);
          return node.right;
        }
        if (node.right === null) return node.left;
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = this.removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = this.removeNode(node.left, data);
        return node;
      } else {
        node.right = this.removeNode(node.right, data);
        return node;
      }
    } catch (e) {
      console.log(e);
    }
  }

  inorderTraverse(node, callback) {
    if (node) {
      node.left && this.inorderTraverse(node.left, callback);
      callback && callback(node.data);
      console.log(`Node: ${node.data}`);
      node.right && this.inorderTraverse(node.right, callback);
    }
  }

  preorderTraverse(node, callback) {
    if (node) {
      callback && callback(node.data);
      console.log(`Node: ${node.data}`);
      node.left && this.preorderTraverse(node.left, callback);
      node.right && this.preorderTraverse(node.right, callback);
    }
  }

  postorderTraverse(node, callback) {
    if (node) {
      node.left && this.postorderTraverse(node.left, callback);
      node.right && this.postorderTraverse(node.right, callback);
      callback && callback(node.data);
      console.log(`Node: ${node.data}`);
    }
  }

  getDepth() {
    try {
      let node = this.root;
      if (!node) {
        throw new EmptyError();
      }
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

      console.log(`depth of the tree: ${maxDepth}`);
      return maxDepth;
    } catch (e) {
      console.log(e);
    }
  }
}

function EmptyError(message) {
  this.name = "EmptyError";
  this.message = message || "Tree is empty";
  this.stack = new Error().stack;
}
EmptyError.prototype = Object.create(Error.prototype);
EmptyError.prototype.constructor = EmptyError;

function NoDataError(message) {
  this.name = "NoDataError";
  this.message = message || "No Data Specified";
  this.stack = new Error().stack;
}
NoDataError.prototype = Object.create(Error.prototype);
NoDataError.prototype.constructor = NoDataError;

const console = (function (origCons) {
  return {
    log: function () {
      let args = Array.prototype.slice.call(arguments);

      for (let i = 0; i < args.length; i++) {
        if (args[i] instanceof Error) {
          origCons.log.call(
            this,
            `Sorry, the operation cannot be completed\nType of the error: ${args[i].name}\nMessage: ${args[i].message}`
          );
        } else {
          origCons.log.call(this, args[i]);
        }
      }

      const date = new Date();
      origCons.log.call(
        this,
        `Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\n`
      );
    },
  };
})(global.console !== undefined ? global.console : window.console);

const bst = new BinarySearchTree();
bst.createRandomIntegerTree(20);
bst.getDepth();
bst.countNodes();
bst.insert(7);
bst.insert(8);
bst.findMin();
bst.findMax();
bst.isPresent(7);
bst.isPresent(4);
let root = bst.getRootNode();

bst.remove(8);
bst.find(8);
bst.find(7);

console.log("inorder traversal:");
bst.inorderTraverse(root);
console.log("preorder traversal:");
bst.preorderTraverse(root);
console.log("postorder traversal:");
bst.postorderTraverse(root);
