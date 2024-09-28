export class OrgGroupDto {
    name: string;
    groupId?: string;

    constructor(name: string, groupId?: string) {
        this.name = name;
        this.groupId = groupId;
    }

    public toOrgGroup(id: string): OrgGroup {
        return {
            id,
            name: this.name,
            groupId: this.groupId,
        };
    }
}

export interface OrgGroup {
    id: string;
    name: string;
    groupId?: string;
}

export class GraphCombo {
    id: string;
    label: string;
    combo?: string;

    constructor(id: string, label: string, combo?: string) {
        this.id = id;
        this.label = label;
        this.combo = combo;
    }

    public static fromOrgGroup(group: OrgGroup): GraphCombo {
        return new GraphCombo(group.id, group.name, group.groupId);
    }
}
