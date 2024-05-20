const Node = require("./Node");
const fnCompare = require("../utils/fnCompare");

class LinkedList {
  #head;
  #count;
  #equalsFn;
  #Nod;
  constructor(equalsFn = fnCompare, Nod = Node) {
    this.#count = 0;
    this.#head = null;
    this.#equalsFn = equalsFn;
    this.#Nod = Nod;
  }

  #getIndexAt(index) {
    let curr = this.#head;
    let prev = null;
    for (let i = 0; i < index; i++) {
      prev = curr;
      curr = curr.next;
    }
    if (index === 0) return { prev: curr.next, curr };
    return { prev, curr };
  }

  // Insertion at any index
  insertAt(element, index) {
    if (index < 0 || index > this.#count) return null;
    const node = new this.#Nod(element);
    if (index === 0) {
      this.#head = node;
    } else {
      const { curr, prev } = this.#getIndexAt(index);
      prev.next = node;
      node.next = curr;
    }
    this.#count++;
    return node;
  }

  // Insertion at the end
  insert(element) {
    return this.insertAt(element, this.#count);
  }

  // Insertion at the end
  push(element) {
    return this.insertAt(element, this.#count);
  }

  // Deletion at any index
  removeAt(index) {
    if (index < 0 || index >= this.#count) return null;
    const { prev, curr } = this.#getIndexAt(index);
    if (index === 0) {
      this.#head = prev;
    } else {
      prev.next = curr.next;
    }
    this.#count--;
    return curr;
  }

  // Deletion at the end
  pop() {
    return this.removeAt(this.#count - 1);
  }

  // Find an element
  indexOf(element) {
    let curr = this.#head;
    let prev = null;
    for (let i = 0; i < this.#count; i++) {
      if (this.#equalsFn(element, curr.element)) return i;
      prev = curr;
      curr = prev.next;
    }
    return -1;
  }

  // Remove an element
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  // Check if the list is empty
  isEmpty() {
    return this.#count === 0;
  }

  // Size of the list
  size() {
    return this.#count;
  }

  // Get the head element
  getHead() {
    if (this.isEmpty()) return null;
    return this.#head?.element;
  }

  // Get the node
  getNode(element) {
    const index = this.indexOf(element);
    if (index < 0) return null;
    const node = this.#getIndexAt(index)?.curr;
    return node;
  }

  // Get the head node ref
  get head() {
    return this.#head;
  }

  // Clear the list
  clear() {
    this.#head = null;
    this.#count = 0;
  }

  // Stringify the list
  toString(separator = "") {
    if (this.isEmpty()) return "";
    let str = "";
    let curr = this.#head;
    let prev = null;
    for (let i = 0; i < this.#count; i++) {
      str +=
        i + 1 >= this.#count
          ? `${curr.element}`
          : `${curr.element}${separator}`;
      prev = curr;
      curr = prev.next;
    }
    return str;
  }
}

module.exports = LinkedList;
