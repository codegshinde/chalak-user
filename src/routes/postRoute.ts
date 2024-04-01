import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { createUserTransctionRouteOptions } from "../controller/handlers/createTransctionHandler";
import { createUpiTransactionRouteOptions } from "../controller/handlers/createUpiTransactionHandler";
import { pocketRouteOptions } from "../controller/handlers/pocketHandler";
import { subscriptionsRouteOptions } from "../controller/handlers/subscriptionsHandler";
import { upiUpdatePaymentRouteOptions } from "../controller/handlers/upi/upiUpdatePaymentHandler";
import { vleTransactionPasswordRouteOptions } from "../controller/handlers/vleTransactionPasswordHandler";

async function postRoute(fastify: FastifyInstance) {
  fastify.post("/subscriptions/create", subscriptionsRouteOptions);
  fastify.post("/pocket/create", pocketRouteOptions);
  fastify.post("/transactions/new", createUserTransctionRouteOptions);
  fastify.post("/transactions/upi", createUpiTransactionRouteOptions);

  fastify.post("/transactions/password", vleTransactionPasswordRouteOptions);
  fastify.post("/notification/upi", upiUpdatePaymentRouteOptions);
}

export default fastifyPlugin(postRoute);
