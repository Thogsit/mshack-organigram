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

export function transformDataset(dataset: GraphData): GraphData {
  const newNodes = dataset.combos.map((combo) => ({
    id: combo.id,
    data: {
      name: combo.label,
      position: "",
      contact: "",
    },
  }));

  const newEdges: Edge[] = dataset.nodes.map((node) => ({
    source: node.combo!,
    target: node.id,
  }));

  // If combos have parent-child relationships (like combo key in Combo)
  const comboEdges: Edge[] = dataset.combos
    .filter((combo) => combo.combo)
    .map((combo) => ({
      source: combo.combo!,
      target: combo.id,
    }));

  return {
    combos: [],
    nodes: [...dataset.nodes, ...newNodes],
    edges: [...dataset.edges, ...newEdges, ...comboEdges],
  };
}
