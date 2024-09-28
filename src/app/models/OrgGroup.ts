export class OrgGroupDto {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    public toOrgGroup(id: string): OrgGroup {
        return {
            id,
            name: this.name
        };
    }
}

export interface OrgGroup {
    id: string;
    name: string;
}
