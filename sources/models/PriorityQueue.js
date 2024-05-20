class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(vertex, priority) {
    this.values.push({ vertex, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  isEmpty() {
    return this.values.length === 0;
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

module.exports = PriorityQueue;
