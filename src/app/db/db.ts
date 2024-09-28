import * as fs from 'fs';

import {GraphNode, OrgNode} from "@/app/models/OrgNode";
import {GraphCombo, OrgGroup} from "@/app/models/OrgGroup";
import {GraphEdge, OrgEdge} from "@/app/models/OrgEdge";

export interface GraphData {
    nodes: GraphNode[];
    combos: GraphCombo[];
    edges: GraphEdge[];
}

export interface DbContent {
    organizations: OrgNode[];
    groups: OrgNode[];
    edges: OrgEdge[];
}

export class Db {
    private static content: DbContent = Db.convertJsonToContent(
        JSON.parse(
            fs.readFileSync('resources/initial_graph.json', 'utf-8')
        )
    );

    /*
     * Graph
     */

    public static getAsGraphData(): GraphData {
        return {
            nodes: this.content.organizations.map(node => GraphNode.fromOrgNode(node)),
            combos: this.content.groups.map(group => GraphCombo.fromOrgGroup(group)),
            edges: this.content.edges.map(edge => GraphEdge.fromOrgEdge(edge)),
        };
    }

    public static convertJsonToContent(json: GraphData): DbContent {
        return {
            organizations: json.nodes.map(node => OrgNode.fromGraphNode(node)),
            groups: json.combos.map(combo => OrgGroup.fromGraphCombo(combo)),
            edges: json.edges.map(edge => OrgEdge.fromGraphEdge(edge)),
        };
    }

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

    /*
     * Edges
     */

    public static getEdges(): OrgEdge[] {
        return this.content.edges;
    }

    public static getEdgeById(id: string): OrgEdge | undefined {
        return this.content.edges.find(edge => edge.id === id);
    }

    public static updateEdge(id: string, edge: OrgEdge): void {
        const index = this.content.edges.findIndex(e => e.id === id);
        if (index === -1) {
            throw new Error(`Edge with id ${id} not found`);
        }
        this.content.edges[index] = edge;
    }

    public static addEdge(edge: OrgEdge): OrgEdge {
        this.content.edges.push(edge);
        return edge;
    }

    public static deleteEdge(id: string): OrgEdge {
        const index = this.content.edges.findIndex(e => e.id === id);
        if (index === -1) {
            throw new Error(`Edge with id ${id} not found`);
        }
        const edge = this.content.edges[index];
        this.content.edges.splice(index, 1);

        return edge;
    }
}
