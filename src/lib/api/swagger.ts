import {createSwaggerSpec} from 'next-swagger-doc';

export const getApiDocs = async () => createSwaggerSpec({
    apiFolder: "src/app/api",
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MSHack Organigram API",
            version: "1.0",
        },
        tags: [
            {
                name: "organizations",
                description: "Organizations API",
            },
            {
                name: "groups",
                description: "Groups API",
            },
            {
                name: "edges",
                description: "Edges API",
            },
            {
                name: "graph",
                description: "Graph API",
            },
        ],
        components: {
            schemas: {
                OrgNode: {
                    type: "object",
                    required: ["id", "name"],
                    properties: {
                        id: {
                            type: "string",
                        },
                        name: {
                            type: "string",
                        },
                        groupId: {
                            type: "string",
                        },
                    },
                },
                OrgNodeDto: {
                    type: "object",
                    required: ["name"],
                    properties: {
                        name: {
                            type: "string",
                        },
                        groupId: {
                            type: "string",
                        },
                    },
                },
                OrgGroup: {
                    type: "object",
                    required: ["id", "name"],
                    properties: {
                        id: {
                            type: "string",
                        },
                        name: {
                            type: "string",
                        },
                    },
                },
                OrgGroupDto: {
                    type: "object",
                    required: ["name"],
                    properties: {
                        name: {
                            type: "string",
                        },
                    },
                },
                OrgEdge: {
                    type: "object",
                    required: ["id", "sourceId", "targetId", "label"],
                    properties: {
                        id: {
                            type: "string",
                        },
                        sourceId: {
                            type: "string",
                        },
                        targetId: {
                            type: "string",
                        },
                        label: {
                            type: "string",
                        },
                    },
                },
                OrgEdgeDto: {
                    type: "object",
                    required: ["sourceId", "targetId", "label"],
                    properties: {
                        sourceId: {
                            type: "string",
                        },
                        targetId: {
                            type: "string",
                        },
                        label: {
                            type: "string",
                        },
                    },
                },
                GraphData: {
                    type: "object",
                    required: ["nodes", "edges", "combos"],
                    properties: {
                        nodes: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/GraphNode",
                            },
                        },
                        edges: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/GraphEdge",
                            },
                        },
                        combos: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/GraphCombo",
                            },
                        },
                    },
                }
            }
        },
    },
});