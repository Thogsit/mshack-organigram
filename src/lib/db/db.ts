import neo4j from 'neo4j-driver';

export const dbDriver = neo4j.driver(
    `neo4j://${process.env.DB_HOST}:${process.env.DB_PORT}`
);
