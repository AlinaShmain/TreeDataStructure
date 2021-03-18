class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  add(value) {
    // console.log("value", value)
    let node = new ListNode(value); //creating the node using class Node

    if (this.length === 0) {
      this.head = node; // If there are no nodes
      // node variable will be the first and head node in the list
    } else {
      let current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = new ListNode(value);
    }

    this.length++;
  }

  removeFromPosition(position) {
    if (position < 0 || position > this.length) {
      //verification on correct value of position like in the insertInPosition and getNodeByPosition
      return "Incorrect value of position";
    }

    let current = this.head;

    if (position === 0) {
      this.head = current.next;
    } else {
      let prev = null;
      let index = 0;

      while (index < position) {
        prev = current;
        current = current.next;
        index++;
      }

      prev.next = current.next;
    }

    this.length--;
    return current.value;
  }

  pollFirst() {
    return this.removeFromPosition(0);
  }

  isEmpty() {
    return this.length === 0;
  }

  print(callback) {
    let current = this.head;

    while (current) {
      //   console.log(current.value); // output the value of the node
      callback(current.value);
      current = current.next;
    }
  }
}

class TreeNode {
  constructor(data, left = null, right = null, parent = null) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.level = 0;
    this.parent = parent;
    this.drawPos = 0;
  }
}

const RANDOM_RANGE = 1000;
const H_SPREAD = 3;

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.depth = 0;
    this.currDrawLevel = -1;
    this.currSpaceCount = -1;
  }

  /******** Functions to create a random binary search tree *********/

  createRandomIntegerTree(numNodes) {
    const RANDOM_RANGE = 10 * numNodes;

    this.insert(Math.floor(Math.random() * Math.floor(RANDOM_RANGE)));
    // console.log(this);

    let treeSize = this.countNodes(this.root);
    // console.log("treeSize", treeSize);
    while (treeSize < numNodes) {
      let count = numNodes - treeSize;
      while (count-- > 0) {
        this.insert(Math.floor(Math.random() * Math.floor(RANDOM_RANGE)));
        // console.log("count");
        // this.inorder(this.root, ", ", (data) => { console.log(data)});
      }
      treeSize = this.countNodes(this.root);
      //   console.log("treeSize", treeSize);
    }

    return this;
  }

  // Inserts a given number into the BST
  insert(data) {
    let newNode = new TreeNode(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data == node.data) return;
    if (newNode.data < node.data) {
      if (node.right == null) {
        node.right = newNode;
        node.right.parent = node;
      } else {
        this.insertNode(node.right, newNode);
      }
    } else {
      if (node.left == null) {
        node.left = newNode;
        node.left.parent = node;
      } else {
        this.insertNode(node.left, newNode);
      }
    }
  }

  //   insertNode(node, newNode) {
  //     if (newNode.data < node.data) {
  //       if (node.left === null) {
  //         node.left = newNode;
  //         node.left.parent = node;
  //       } else {
  //         this.insertNode(node.left, newNode);
  //       }
  //     } else {
  //       if (node.right === null) {
  //         node.right = newNode;
  //         node.right.parent = node;
  //       } else {
  //         this.insertNode(node.right, newNode);
  //       }
  //     }
  //   }

  /************ Actual functions that print the tree like a tree ********************/
  drawTree() {
    console.log("\n\nLevel order traversal of tree:");
    let depth = this.getDepth(this.root);
    // console.log("depth", depth);
    this.setLevels(this.root, 0);
    // this.inorder(this.root, ", ", (node) => {
    //   console.log(`node data: ${node.data} node level: ${node.level}`);
    // });

    let depthChildCount = new Array(depth + 1);

    let q = new LinkedList();
    q.add(this.root.left);
    q.add(this.root.right);
    // console.log("linked list", q);

    // draw root first
    this.root.drawPos = Math.pow(2, depth - 1) * H_SPREAD;
    // console.log("drawPos", this.root.drawPos);
    this.currDrawLevel = this.root.level;
    this.currSpaceCount = this.root.drawPos;
    console.log(this.getSpace(this.root.drawPos) + this.root.data);

    // console.log("linked list", q);

    while (!q.isEmpty()) {
      let ele = q.pollFirst();
      // console.log("elem", ele);
      this.drawElement(ele, depth, q);
      if (ele == null) continue;
      q.add(ele.left);
      q.add(ele.right);
    }
    // console.log("\n");
  }

  drawElement(ele, depth, q) {
    if (ele == null) return;

    if (ele.level != this.currDrawLevel) {
      this.currDrawLevel = ele.level;
      this.currSpaceCount = 0;
      //   console.log("currDrawLevel", this.currDrawLevel);
      for (let i = 0; i < depth - ele.level + 1; i++) {
        //   console.log(i);
        let drawn = 0;
        if (ele.parent.left != null) {
          drawn = ele.parent.drawPos - 2 * i - 2;
          console.log(this.getSpace(drawn) + "/");
        }
        if (ele.parent.right != null) {
          let drawn2 = ele.parent.drawPos + 2 * i + 2;
          console.log(this.getSpace(drawn2 - drawn) + "\\");
          drawn = drawn2;
        }
        let doneParent = ele.parent;
        // for (sibling in q) {

        // let current = q.head;

        // while (current) {
        //   if (current.value == null) continue;
        //   if (current.value.parent == doneParent) continue;
        //   doneParent = current.value.parent;
        //   if (current.value.parent.left != null) {
        //     let drawn2 = current.value.parent.drawPos - 2 * i - 2;
        //     console.log(this.getSpace(drawn2 - drawn - 1) + "/");
        //     drawn = drawn2;
        //   }
        //   if (sibling.parent.right != null) {
        //     let drawn2 = current.value.parent.drawPos + 2 * i + 2;
        //     console.log(this.getSpace(drawn2 - drawn - 1) + "\\");
        //     drawn = drawn2;
        //   }

        //   current = current.next;
        //   console.log("end");
        // }
        q.print((sibling) => {
          //   console.log("sibling", sibling);
          if (sibling == null) return;
          //   console.log("hey")
          if (sibling.parent == doneParent) return;
          doneParent = sibling.parent;
          if (sibling.parent.left != null) {
            let drawn2 = sibling.parent.drawPos - 2 * i - 2;
            console.log(this.getSpace(drawn2 - drawn - 1) + "/");
            drawn = drawn2;
          }
          if (sibling.parent.right != null) {
            let drawn2 = sibling.parent.drawPos + 2 * i + 2;
            console.log(this.getSpace(drawn2 - drawn - 1) + "\\");
            drawn = drawn2;
          }
        });

        // }
        console.log("\n");
      }
    }
    let offset = 0;
    let numDigits = Math.ceil(Math.log10(ele.data));
    if (ele.parent.left == ele) {
      ele.drawPos =
        ele.parent.drawPos - H_SPREAD * (depth - this.currDrawLevel + 1);
      //offset = 2;
      offset += numDigits / 2;
    } else {
      ele.drawPos =
        ele.parent.drawPos + H_SPREAD * (depth - this.currDrawLevel + 1);
      //offset = -2;
      offset -= numDigits;
    }

    console.log(
      this.getSpace(ele.drawPos - this.currSpaceCount + offset) + ele.data
    );
    this.currSpaceCount = ele.drawPos + numDigits / 2;
  }

  // Utility functions
  //   inOrderInteger(sep) {
  //     if (left != null) left.inOrderInteger(sep);
  //     console.log(idata + sep);
  //     if (right != null) right.inOrderInteger(sep);
  //   }

  inorder(node, sep, callback) {
    if (node !== null) {
      !node.left && this.inorder(node.left, sep, callback);
      //   callback(node.data + sep);
      callback(node);
      //   console.log(node.data);
      !node.right && this.inorder(node.right, sep, callback);
    }
  }

  getDepth(n) {
    if (n == null) return 0;
    n.depth = 1 + Math.max(this.getDepth(n.left), this.getDepth(n.right));
    return n.depth;
  }

  countNodes(n) {
    if (n == null) return 0;
    return 1 + this.countNodes(n.left) + this.countNodes(n.right);
  }

  setLevels(r, level) {
    if (r == null) return;
    r.level = level;
    this.setLevels(r.left, level + 1);
    this.setLevels(r.right, level + 1);
  }

  getSpace(i) {
    let s = "";
    while (i-- > 0) s += " ";
    return s;
  }
}

// Creates a random tree and prints it like a tree
let bst = new BinarySearchTree();
// 31, 33, 35, 43, 55, 65, 69, 70, 88, 89, 115, 122, 127, 129, 139, 155, 179, 181, 184, 187,
// bst.insert(31);
// bst.insert(33);
// bst.insert(35);
// bst.insert(43);
// bst.insert(55);
// bst.insert(65);
// bst.insert(69);
// bst.insert(70);
bst.createRandomIntegerTree(20);
// bst.inOrderInteger(", ");
bst.drawTree();
