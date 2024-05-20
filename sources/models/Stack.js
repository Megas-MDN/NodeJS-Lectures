class Stack {
  #count = 0;
  #items = {};
  constructor() {
    this.#count = 0;
    this.#items = {};
  }

  push(...elements) {
    elements.forEach((el) => {
      this.#items[this.#count] = el;
      this.#count++;
    });
  }

  pop() {
    if (this.isEmpty()) return undefined;
    this.#count--;
    const element = this.#items[this.#count];
    delete this.#items[this.#count];
    return element;
  }

  isEmpty() {
    return this.#count === 0;
  }

  clear() {
    this.#items = {};
    this.#count = 0;
  }

  size() {
    return this.#count;
  }

  peek() {
    return this.#items[this.#count - 1];
  }

  toString(separator = "") {
    return Object.values(this.#items).join(`${separator}`);
  }
}

module.exports = Stack;
