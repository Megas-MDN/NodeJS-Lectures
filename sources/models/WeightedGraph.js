const PriorityQueue = require("./PriorityQueue");

class WeightedGraph {
  constructor() {
    this.matrix = {};
  }

  addingVertex(vertex) {
    if (!(vertex in this.matrix)) {
      this.matrix[vertex] = [];
    }
  }

  addingEdge(vtx1, vtx2, weight) {
    if (vtx1 && vtx2 && vtx1 in this.matrix && vtx2 in this.matrix) {
      this.matrix[vtx1].push({ node: vtx2, weight });
      this.matrix[vtx2].push({ node: vtx1, weight });
    }
  }

  removeEdge(vtx1, vtx2) {
    if (
      vtx1 &&
      vtx2 &&
      this.matrix[vtx1]?.find((edge) => edge.node === vtx2) &&
      this.matrix[vtx2]?.find((edge) => edge.node === vtx1)
    ) {
      this.matrix[vtx1] = this.matrix[vtx1].filter(
        (edge) => edge.node !== vtx2,
      );
      this.matrix[vtx2] = this.matrix[vtx2].filter(
        (edge) => edge.node !== vtx1,
      );
    }
  }

  removeVertex(vtx) {
    if (vtx in this.matrix) {
      this.matrix[vtx].forEach((edge) => {
        this.matrix[edge.node] = this.matrix[edge.node].filter(
          (vertex) => vertex.node !== vtx,
        );
      });
      delete this.matrix[vtx];
    }
  }

  dfs(vertex) {
    const visited = new Set();
    if (!(vertex in this.matrix)) {
      return Array.from(visited);
    }

    const stack = [vertex];
    while (stack.length) {
      const vertexName = stack.pop();
      if (!visited.has(vertexName)) {
        visited.add(vertexName);
        this.matrix[vertexName].forEach(({ node }) => {
          if (!visited.has(node)) {
            stack.push(node);
          }
        });
      }
    }
    return Array.from(visited);
  }

  bfs(vertex) {
    const visited = new Set();
    if (!(vertex in this.matrix)) {
      return Array.from(visited);
    }

    const queue = [vertex];
    while (queue.length) {
      const vertexName = queue.shift();
      if (!visited.has(vertexName)) {
        visited.add(vertexName);
        this.matrix[vertexName].forEach(({ node }) => {
          if (!visited.has(node)) {
            queue.push(node);
          }
        });
      }
    }
    return Array.from(visited);
  }

  dijkstra(startVertex, endVertex) {
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();

    for (let vertex in this.matrix) {
      distances[vertex] = Infinity;
      previous[vertex] = null;
      pq.enqueue(vertex, Infinity);
    }
    distances[startVertex] = 0;
    pq.enqueue(startVertex, 0);

    while (!pq.isEmpty()) {
      const { vertex: currentVertex } = pq.dequeue();
      if (currentVertex === endVertex) break;

      this.matrix[currentVertex].forEach((neighbor) => {
        const distance = distances[currentVertex] + neighbor.weight;
        if (distance < distances[neighbor.node]) {
          distances[neighbor.node] = distance;
          previous[neighbor.node] = currentVertex;
          pq.enqueue(neighbor.node, distance);
        }
      });
    }

    const path = [];
    let current = endVertex;
    while (previous[current]) {
      path.unshift(current);
      current = previous[current];
    }
    if (path.length) path.unshift(startVertex);
    return path.length ? path : null;
  }

  bfsShortestPath(startVertex, endVertex) {
    const queue = [[startVertex]];
    const visited = new Set();

    while (queue.length) {
      const path = queue.shift();
      const vertex = path[path.length - 1];

      if (vertex === endVertex) return path;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        this.matrix[vertex].forEach((neighbor) => {
          if (!visited.has(neighbor.node)) {
            const newPath = path.slice();
            newPath.push(neighbor.node);
            queue.push(newPath);
          }
        });
      }
    }
    return null;
  }
}

module.exports = WeightedGraph;
