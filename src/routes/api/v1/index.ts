import {
  createRocket,
  updateRocket,
  getRockets,
  getRocket,
  deleteRocket,
} from "@controllers/rocket";
import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get("/rockets", getRockets);

  fastify.post("/rockets", createRocket);

  fastify.get("/rockets/:id", getRocket);

  fastify.patch("/rockets/:id", updateRocket);

  fastify.delete("/rockets/:id", deleteRocket);
};

export default root;
