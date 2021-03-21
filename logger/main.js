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
    if (!data) {
      console.log("No Data Specified");
      return;
    }
    let newNode = new TreeNode(data);
    if (this.root === null) {
      this.root = newNode;
      console.log(`node ${data} was added to the tree`);
    } else {
      this.insertNode(this.root, newNode);
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
    if (!data) {
      console.log("No Data Specified");
      return;
    }
    try {
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
    if (!data) {
      console.log("No Data Specified");
      return;
    }
    try {
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
    if (!data) {
      console.log("No Data Specified");
      return;
    }
    const removeNode = (node, data) => {
      try {
        if (!node) {
          console.log(data);
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
          node.right = removeNode(node.right, tempNode.data);
          return node;
        } else if (data < node.data) {
          node.left = removeNode(node.left, data);
          return node;
        } else {
          node.right = removeNode(node.right, data);
          return node;
        }
      } catch (e) {
        console.log(e);
      }
    };
    this.root = removeNode(this.root, data);
  }

  inorder(node, callback) {
    if (node) {
      node.left && this.inorder(node.left, callback);
      callback && callback(node.data);
      console.log(`Node: ${node.data}`);
      node.right && this.inorder(node.right, callback);
    }
  }

  preorder(node, callback) {
    if (node) {
      callback && callback(node.data);
      console.log(`Node: ${node.data}`);
      node.left && this.preorder(node.left, callback);
      node.right && this.preorder(node.right, callback);
    }
  }

  postorder(node, callback) {
    if (node) {
      node.left && this.postorder(node.left, callback);
      node.right && this.postorder(node.right, callback);
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

const console = (function (origCons) {
  return {
    log: function () {
      let args = Array.prototype.slice.call(arguments);

      // origCons.log.apply(this, args);
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
    }
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
bst.inorder(root);
console.log("preorder traversal:");
bst.preorder(root);
console.log("postorder traversal:");
bst.postorder(root);