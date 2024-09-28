export class OrgEdgeDto {
    sourceId: string;
    targetId: string;
    label: string;

    constructor(sourceId: string, targetId: string, label: string) {
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.label = label;
    }

    public toOrgEdge(id: string): OrgEdge {
        return {
            id: id,
            sourceId: this.sourceId,
            targetId: this.targetId,
            label: this.label,
        };
    }
}

export interface OrgEdge {
    id: string;
    sourceId: string;
    targetId: string;
    label: string;
}

export class GraphEdge {
    source: string;
    target: string;
    label: string;

    constructor(source: string, target: string, label: string) {
        this.source = source;
        this.target = target;
        this.label = label;
    }

    public static fromOrgEdge(edge: OrgEdge): GraphEdge {
        return new GraphEdge(edge.sourceId, edge.targetId, edge.label);
    }
}
