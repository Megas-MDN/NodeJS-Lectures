class Queue {
  #count = 0;
  #first = 0;
  #items = {};
  constructor() {}

  enqueue(...elements) {
    elements.forEach((element) => {
      this.#items[this.#count] = element;
      this.#count++;
    });
  }

  dequeue() {
    if (this.isEmpty()) return undefined;
    const element = this.#items[this.#first];
    delete this.#items[this.#first];
    this.#first++;
    return element;
  }

  peek() {
    return this.#items[this.#first];
  }

  size() {
    return this.#count - this.#first;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.#count = 0;
    this.#first = 0;
    this.#items = {};
  }

  toString(separator = "") {
    return Object.values(this.#items).join(separator);
  }
}

module.exports = Queue;
