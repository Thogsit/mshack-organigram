type Combo = {
  id: string;
  label: string;
  combo?: string;
};

type GraphNode = {
  id: string;
  combo?: string;
  data: {
    name: string;
    position: string;
    contact: string;
  };
};

type Edge = {
  source: string;
  target: string;
  label?: string;
};

type GraphData = {
  combos: Combo[];
  nodes: GraphNode[];
  edges: Edge[];
};

// Function to find all shortest paths using Floyd-Warshall algorithm
function findShortestPaths(nodes: GraphNode[], edges: Edge[]) {
  const distance: Record<string, Record<string, number>> = {};

  // Initialize distances: 0 for self, Infinity for other nodes
  nodes.forEach((node) => {
    distance[node.id] = {};
    nodes.forEach((otherNode) => {
      if (node.id === otherNode.id) {
        distance[node.id][otherNode.id] = 0;
      } else {
        distance[node.id][otherNode.id] = Infinity;
      }
    });
  });

  // Set distances based on existing edges
  edges.forEach((edge) => {
    distance[edge.source][edge.target] = 1; // Assume each edge has a weight of 1
  });

  // Floyd-Warshall algorithm to calculate shortest paths
  nodes.forEach((k) => {
    nodes.forEach((i) => {
      nodes.forEach((j) => {
        if (
          distance[i.id][j.id] >
          distance[i.id][k.id] + distance[k.id][j.id]
        ) {
          distance[i.id][j.id] = distance[i.id][k.id] + distance[k.id][j.id];
        }
      });
    });
  });

  return distance;
}

// Function to transform dataset
export function transformDataset(dataset: GraphData): GraphData {
  console.log("exist", dataset);
  const newNodes = dataset.combos.map((combo) => ({
    id: combo.id,
    data: {
      name: combo.label,
      position: "Organisation",
      contact: "",
    },
  }));

  const newEdges: Edge[] = dataset.nodes.map((node) => ({
    source: node.combo!,
    target: node.id,
    label: "Contains",
  }));

  // If combos have parent-child relationships (like combo key in Combo)
  const comboEdges: Edge[] = dataset.combos
    .filter((combo) => combo.combo)
    .map((combo) => ({
      source: combo.combo!,
      target: combo.id,
      label: "Contains",
    }));

  const combinedNodes = [...dataset.nodes, ...newNodes];
  const combinedEdges = [...dataset.edges, ...comboEdges];

  // Find shortest paths in the graph
  const shortestPaths = findShortestPaths(combinedNodes, dataset.edges);

  // Filter new edges: only add them if there is no shorter path already
  const filteredEdges = newEdges.filter((newEdge) => {
    const source = newEdge.source;
    const target = newEdge.target;
    // Add the edge only if there is no existing shorter path between source and target
    return shortestPaths[source][target] === Infinity;
  });

  return {
    combos: [],
    nodes: combinedNodes,
    edges: [...dataset.edges, ...filteredEdges],
  };
}
