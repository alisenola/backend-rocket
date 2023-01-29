import { DataSource } from "typeorm";
import fp from "fastify-plugin";
import dataSource from "../dataSource";

export default fp(async (fastify, opts) => {
  await dataSource.initialize();
  fastify.decorate("db", dataSource);
});

declare module "fastify" {
  export interface FastifyInstance {
    db: DataSource;
  }
}
