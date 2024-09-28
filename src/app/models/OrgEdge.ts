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
            label: this.label
        };
    }
}

export interface OrgEdge {
    id: string;
    sourceId: string;
    targetId: string;
    label: string;
}
