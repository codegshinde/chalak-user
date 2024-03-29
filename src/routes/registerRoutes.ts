import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import postRoute from "./postRoute";

async function registerRoutes(fastify: FastifyInstance) {
  await fastify.register(postRoute);
}

export default fp(registerRoutes);
