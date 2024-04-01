import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { updateTransactionRouteOptions } from "../controller/handlers/updateTransctionHandler";

async function patchRoutes(fastify: FastifyInstance) {
  fastify.patch("/transactions/update", updateTransactionRouteOptions);
}

export default fastifyPlugin(patchRoutes);
