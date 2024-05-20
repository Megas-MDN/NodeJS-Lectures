class Queue {
  #count = 0;
  #first = 0;
  #items = {};
  constructor() {}

  // Insertion
  enqueue(...elements) {
    elements.forEach((element) => {
      this.#items[this.#count] = element;
      this.#count++;
    });
  }

  // Deletion
  dequeue() {
    if (this.isEmpty()) return undefined;
    const element = this.#items[this.#first];
    delete this.#items[this.#first];
    this.#first++;
    return element;
  }

  // Peek the first element
  peek() {
    return this.#items[this.#first];
  }

  // Size of the queue
  size() {
    return this.#count - this.#first;
  }

  isEmpty() {
    return this.size() === 0;
  }

  // Clear the queue
  clear() {
    this.#count = 0;
    this.#first = 0;
    this.#items = {};
  }

  // Convert the queue to string
  toString(separator = "") {
    return Object.values(this.#items).join(separator);
  }
}

module.exports = Queue;
