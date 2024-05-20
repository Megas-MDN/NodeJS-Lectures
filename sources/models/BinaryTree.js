const Node = require("./NodeTree");
const fnCompare = (a, b) => (a === b ? 0 : a > b ? 1 : -1);

class BinaryTree {
  #compareFn;
  #root;
  constructor(compareFn = fnCompare) {
    this.#compareFn = compareFn;
    this.#root = null;
  }
  insert(key) {
    if (this.#root === null) {
      this.#root = new Node(key);
      return;
    }
    this.insertNode(this.#root, key);
  }
  insertNode(node, key) {
    if (this.#compareFn(key, node.key) < 0) {
      if (node.left === null) {
        node.left = new Node(key);
        return;
      }
      return this.insertNode(node.left, key);
    }
    if (this.#compareFn(key, node.key) > 0) {
      if (node.right === null) {
        node.right = new Node(key);
        return;
      }
      return this.insertNode(node.right, key);
    }
  }

  #searchNode(node, key) {
    if (node === null) return false;
    if (this.#compareFn(key, node.key) === 0) return true;
    if (this.#compareFn(key, node.key) < 0)
      return this.#searchNode(node.left, key);
    if (this.#compareFn(key, node.key) > 0)
      return this.#searchNode(node.right, key);
  }

  search(key) {
    return this.#searchNode(this.#root, key);
  }

  #removeNode(node, key) {
    if (node === null) return null;
    if (this.#compareFn(key, node.key) < 0) {
      node.left = this.#removeNode(node.left, key);
      return node;
    }
    if (this.#compareFn(key, node.key) > 0) {
      node.right = this.#removeNode(node.right, key);
      return node;
    }
    if (node.left === null && node.right === null) {
      node = null;
      return node;
    }
    if (node.left === null) {
      node = node.right;
      return node;
    }
    if (node.right === null) {
      node = node.left;
      return node;
    }
    const aux = this.#minNode(node.right);
    node.key = aux.key;
    node.right = this.#removeNode(node.right, aux.key);
    return node;
  }

  remove(key) {
    this.#root = this.#removeNode(this.#root, key);
  }

  #inOrderTraversalNode(node, callback) {
    if (!node) return;
    this.#inOrderTraversalNode(node.left, callback);
    callback(node.key);
    this.#inOrderTraversalNode(node.right, callback);
  }
  inOrderTraversal(callback) {
    this.#inOrderTraversalNode(this.#root, callback);
  }
  preOrderTraversal(callback) {
    this.#preOrderTraversalNode(this.#root, callback);
  }
  #preOrderTraversalNode(node, callback) {
    if (!node) return;
    callback(node.key);
    this.#preOrderTraversalNode(node.left, callback);
    this.#preOrderTraversalNode(node.right, callback);
  }
  preOrderTraversal(callback) {
    this.#preOrderTraversalNode(this.#root, callback);
  }

  #postOrderTraversalNode(node, callback) {
    if (!node) return;
    this.#postOrderTraversalNode(node.left, callback);
    this.#postOrderTraversalNode(node.right, callback);
    callback(node.key);
  }
  postOrderTraversal(callback) {
    this.#postOrderTraversalNode(this.#root, callback);
  }

  #minNode(node) {
    if (node === null) return null;
    if (node.left === null) return node.key;
    return this.#minNode(node.left);
  }
  min() {
    return this.#minNode(this.#root);
  }

  #maxNode(node) {
    if (node === null) return null;
    if (node.right === null) return node.key;
    return this.#maxNode(node.right);
  }
  max() {
    return this.#maxNode(this.#root);
  }
  toString({ order = 0, separator = " " } = {}) {
    let result = "";
    switch (order) {
      case 0:
        this.inOrderTraversal((key) => {
          result += key + separator;
        });
        break;

      case 1:
        this.preOrderTraversal((key) => {
          result += key + separator;
        });
        break;
      case 2:
        this.postOrderTraversal((key) => {
          result += key + separator;
        });
        break;
      default:
        break;
    }

    return result;
  }
}

module.exports = BinaryTree;
