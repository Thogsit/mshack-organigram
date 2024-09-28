export class OrgNodeDto {
  data: GraphNodeData;
  groupId?: string;

  constructor(data: GraphNodeData, groupId?: string) {
    this.data = data;
    this.groupId = groupId;
  }

  public toOrgNode(id: string): OrgNode {
    return {
      id,
      data: this.data,
      groupId: this.groupId,
    };
  }
}

export class OrgNode {
  id: string;
  data: GraphNodeData;
  groupId?: string;

  constructor(id: string, data: GraphNodeData, groupId?: string) {
    this.id = id;
    this.data = data;
    this.groupId = groupId;
  }

  public static fromGraphNode(node: GraphNode): OrgNode {
    return new OrgNode(node.id, node.data, node.combo);
  }
}

export interface GraphNodeData {
  name: string;
}

export class GraphNode {
  id: string;
  data: GraphNodeData;
  combo?: string;

  constructor(id: string, data: GraphNodeData, combo?: string) {
    this.id = id;
    this.data = data;
    this.combo = combo;
  }

  public static fromOrgNode(node: OrgNode): GraphNode {
    return new GraphNode(node.id, node.data, node.groupId);
  }
}
