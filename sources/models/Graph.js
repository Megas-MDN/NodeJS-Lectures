class Graph {
  constructor() {
    this.matrix = {};
  }

  addingVertex(vertex) {
    if (!(vertex in this.matrix)) {
      this.matrix[vertex] = [];
      return;
    }
    return;
  }

  addingEdge(vtx1, vtx2) {
    if (vtx1 && vtx2 && vtx1 in this.matrix && vtx2 in this.matrix) {
      this.matrix[vtx1].push(vtx2);
      this.matrix[vtx2].push(vtx1);
      return;
    }
    return;
  }

  removeEdge(vtx1, vtx2) {
    if (
      vtx1 &&
      vtx2 &&
      this.matrix?.[vtx1]?.includes(vtx2) &&
      this.matrix?.[vtx2]?.includes(vtx1)
    ) {
      this.matrix[vtx1] = this.matrix[vtx1].filter((v) => v !== vtx2);
      this.matrix[vtx2] = this.matrix[vtx2].filter((v) => v !== vtx1);
      return;
    }
    return;
  }

  removeVertex(vtx) {
    if (vtx in this.matrix) {
      this.matrix[vtx].forEach((v) => {
        this.matrix[v] = this.matrix[v].filter((vertex) => vertex !== vtx);
      });
      this.matrix[vtx] = [];
    }
    return;
  }

  dfs(vertex) {
    const visited = new Set();
    if (!(vertex in this.matrix)) {
      return visited;
    }

    const stack = [vertex];
    while (stack.length) {
      const vertexName = stack.pop();
      this.matrix[vertexName].forEach((vertex) => {
        if (!visited.has(vertex)) {
          stack.push(vertex);
        }
      });
      visited.add(vertexName);
    }
    return Array.from(visited);
  }

  bfs(vertex) {
    const visited = new Set();
    if (!(vertex in this.matrix)) {
      return visited;
    }

    const queue = [vertex];
    while (queue.length) {
      const vertexName = queue.shift();
      this.matrix[vertexName].forEach((vertex) => {
        if (!visited.has(vertex)) {
          queue.push(vertex);
        }
      });
      visited.add(vertexName);
    }
    return Array.from(visited);
  }
}

module.exports = Graph;
