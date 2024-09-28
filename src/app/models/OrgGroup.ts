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

export class OrgGroup {
    id: string;
    name: string;
    groupId?: string;

    constructor(id: string, name: string, groupId?: string) {
        this.id = id;
        this.name = name;
        this.groupId = groupId;
    }

    public static fromGraphCombo(combo: GraphCombo): OrgGroup {
        return new OrgGroup(combo.id, combo.label, combo.combo);
    }
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
