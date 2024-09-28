export class OrgNodeDto {
    name: string;
    groupId?: string;

    constructor(name: string, groupId?: string) {
        this.name = name;
        this.groupId = groupId;
    }

    public toOrgNode(id: string): OrgNode {
        return {
            id,
            name: this.name,
            groupId: this.groupId
        };
    }
}

export interface OrgNode {
    id: string;
    name: string;
    groupId?: string;
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
        return new GraphNode(node.id, {name: node.name}, node.groupId);
    }
}
