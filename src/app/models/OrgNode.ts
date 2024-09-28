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
