const {
  Stack,
  Queue,
  BinaryTree,
  LinkedList,
  WeightedGraph,
} = require("../models/_index");

class MinMaxStack {
  #minStack = new Stack();
  #maxStack = new Stack();
  #stack = new Stack();
  constructor() {}

  push(element) {
    this.#stack.push(element);
    if (this.#minStack.isEmpty() || element <= this.#minStack.peek()) {
      this.#minStack.push(element);
    }
    if (this.#maxStack.isEmpty() || element >= this.#maxStack.peek()) {
      this.#maxStack.push(element);
    }
  }

  pop() {
    if (this.#minStack.peek() === this.#stack.peek()) {
      this.#minStack.pop();
    }
    if (this.#maxStack.peek() === this.#stack.peek()) {
      this.#maxStack.pop();
    }
    return this.#stack.pop();
  }

  getMin() {
    return this.#minStack.peek();
  }

  getMax() {
    return this.#maxStack.peek();
  }
}

const stack = new MinMaxStack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
stack.push(6);
stack.push(7);
stack.push(8);
stack.push(9);
stack.push(10);

stack.pop(); // 10
stack.pop(); // 9

console.log("Min: ", stack.getMin(), "Max: ", stack.getMax()); // Min: 1 Max: 8

const isBinaryTree = (root) => {
  function isleafnode(root) {
    if (root.left == null && root.right == null) return true;
    return false;
  }

  if (root == null) return true;
  let q = new Queue();
  q.enqueue(root);
  while (q.size() != 0) {
    root = q.peek();
    q.dequeue();
    if (root == null) return false;

    if (isleafnode(root) == false) {
      q.enqueue(root.left);
      q.enqueue(root.right);
    }
  }

  return true;
};

const binaryTree = new BinaryTree();
binaryTree.insert(10);
binaryTree.insert(5);
binaryTree.insert(3);
binaryTree.insert(15);
binaryTree.insert(20);
binaryTree.insert(8);

console.log(isBinaryTree(binaryTree.root)); // true

const notBstTree = {
  root: {
    value: 42,
    right: {
      value: 50,
      right: {
        value: 11,
      },
    },
    left: {
      value: 5,
      right: {
        value: 42,
        right: {
          value: 19,
        },
      },
    },
  },
};

console.log(isBinaryTree(notBstTree.root)); // false

const graph = new WeightedGraph();

graph.addingVertex("A");
graph.addingVertex("B");
graph.addingVertex("C");
graph.addingVertex("D");

graph.addingEdge("A", "B", 4);
graph.addingEdge("A", "C", 2);
graph.addingEdge("B", "C", 1);
graph.addingEdge("B", "D", 5);
graph.addingEdge("C", "D", 8);

const startVertex = "A";
const endVertex = "D";
const shortestPathDijkstra = graph.dijkstra(startVertex, endVertex);
console.log(
  `${startVertex} from to ${endVertex} using Dijkstra's algorithm:`,
  shortestPathDijkstra,
); // [ 'A', 'C', 'B', 'D' ]

const shortestPathBFS = graph.bfsShortestPath(startVertex, endVertex);
console.log(`${startVertex}  from to ${endVertex} using BFS:`, shortestPathBFS); //  [ 'A', 'B', 'D' ]

const cycleLinkedListChecked = (head) => {
  let ponter01 = head;
  let ponter02 = head;

  while (ponter01 && ponter02) {
    ponter01 = ponter01.next;
    ponter02 = ponter02?.next?.next;

    if (ponter01 === ponter02) {
      return true;
    }
  }

  return false;
};

const list = new LinkedList();
list.insert(1);
list.insert(2);
list.insert(3);
list.insert(4);
list.insert(5);
list.insert(6);
list.insert(7);
list.insert(8);
list.insert(9);
list.insert(10);

console.log(cycleLinkedListChecked(list.head)); // not cycle

const node = list.getNode(5);
node.next = list.head; // cycle list
console.log(cycleLinkedListChecked(list.head));
