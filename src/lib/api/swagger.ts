import {createSwaggerSpec} from 'next-swagger-doc';

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
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
                }
            },
        },
    });
    return spec;
};