import {OrgNode} from "@/app/models/OrgNode";
import {OrgGroup} from "@/app/models/OrgGroup";

export class Db {
    private static content: {
        organizations: OrgNode[],
        groups: OrgNode[],
    } = {
        organizations: [
            {
                id: '1',
                name: 'Org 1',
                groupId: '1'
            },
            {
                id: '2',
                name: 'Org 2',
                groupId: '1'
            },
            {
                id: '3',
                name: 'Org 3',
                groupId: '2'
            }
        ],
        groups: [
            {
                id: '1',
                name: 'Group 1'
            },
            {
                id: '2',
                name: 'Group 2'
            }
        ]
    };

    /*
     * Organizations
     */

    public static getOrganizations(): OrgNode[] {
        return this.content.organizations;
    }

    public static getOrganizationById(id: string): OrgNode | undefined {
        return this.content.organizations.find(org => org.id === id);
    }

    public static updateOrganization(id: string, org: OrgNode): void {
        const index = this.content.organizations.findIndex(o => o.id === id);
        if (index === -1) {
            throw new Error(`Organization with id ${id} not found`);
        }
        this.content.organizations[index] = org;
    }

    public static addOrganization(org: OrgNode): OrgNode {
        this.content.organizations.push(org);
        return org;
    }

    public static deleteOrganization(id: string): OrgNode {
        const index = this.content.organizations.findIndex(o => o.id === id);
        if (index === -1) {
            throw new Error(`Organization with id ${id} not found`);
        }
        const org = this.content.organizations[index];
        this.content.organizations.splice(index, 1);

        return org;
    }

    /*
     * Groups
     */

    public static getGroups(): OrgGroup[] {
        return this.content.groups;
    }

    public static getGroupById(id: string): OrgGroup | undefined {
        return this.content.groups.find(group => group.id === id);
    }

    public static updateGroup(id: string, group: OrgGroup): void {
        const index = this.content.groups.findIndex(g => g.id === id);
        if (index === -1) {
            throw new Error(`Group with id ${id} not found`);
        }
        this.content.groups[index] = group;
    }

    public static addGroup(group: OrgGroup): OrgGroup {
        this.content.groups.push(group);
        return group;
    }

    public static deleteGroup(id: string): OrgGroup {
        const index = this.content.groups.findIndex(g => g.id === id);
        if (index === -1) {
            throw new Error(`Group with id ${id} not found`);
        }
        const group = this.content.groups[index];
        this.content.groups.splice(index, 1);

        return group;
    }
}
