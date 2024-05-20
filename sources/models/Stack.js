class Stack {
  #count = 0;
  #items = {};
  constructor() {
    this.#count = 0;
    this.#items = {};
  }

  // Insertion at the end
  push(...elements) {
    elements.forEach((el) => {
      this.#items[this.#count] = el;
      this.#count++;
    });
  }

  // Deletion at the end
  pop() {
    if (this.isEmpty()) return undefined;
    this.#count--;
    const element = this.#items[this.#count];
    delete this.#items[this.#count];
    return element;
  }

  // Check if the stack is empty
  isEmpty() {
    return this.#count === 0;
  }

  // Clear the stack
  clear() {
    this.#items = {};
    this.#count = 0;
  }

  // Size of the stack
  size() {
    return this.#count;
  }

  // Peek the first element
  peek() {
    return this.#items[this.#count - 1];
  }

  // Convert the stack to string
  toString(separator = "") {
    return Object.values(this.#items).join(`${separator}`);
  }
}

module.exports = Stack;
