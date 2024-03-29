import { FastifyInstance } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import { createDocument } from "../services/createDocument";
import { getDocument } from "../services/getDocument";
import { pocketBalance } from "./checkBalance";
import { comparePassword } from "./comparePassword";
import { createUniqId } from "./createUniqId";
import { hashPassword } from "./hashPassword";

async function registerUtils(fastify: FastifyInstance) {
  fastify.decorateRequest("hashPassword", hashPassword);
  fastify.decorateRequest("comparePassword", comparePassword);
  fastify.decorateRequest("getDocument", getDocument);
  fastify.decorateRequest("createDocument", createDocument);
  fastify.decorateRequest("createUniqId", createUniqId);
  fastify.decorateRequest("signJWT", fastify.jwt.sign);
  fastify.decorateRequest("pocket", pocketBalance);
}

export default fastifyPlugin(registerUtils);
