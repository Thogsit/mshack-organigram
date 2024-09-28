import { v4 as uuidv4 } from 'uuid';

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

export class OrgEdge {
    id: string;
    sourceId: string;
    targetId: string;
    label: string;

    constructor(id: string, sourceId: string, targetId: string, label: string) {
        this.id = id;
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.label = label;
    }

    public static fromGraphEdge(edge: GraphEdge): OrgEdge {
        return new OrgEdge(uuidv4(), edge.source, edge.target, edge.label);
    }
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
