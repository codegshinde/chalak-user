import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { createTransactionRouteOptions } from "../controller/handlers/createTransctionHandler";
import { getVleCredentialsRouteOptions } from "../controller/handlers/getVleCredentialsHandler";

import { getSubscriptionsRouteOptions } from "../controller/handlers/getSubscriptionsHandler";
import { pocketBalanceRouteOptions } from "../controller/handlers/pocketBalanceHandler";
import { pocketRouteOptions } from "../controller/handlers/pocketHandler";
import { profileRouteOptions } from "../controller/handlers/profileHandler";
import { subscriptionsRouteOptions } from "../controller/handlers/subscriptionsHandler";
import { updateTransactionRouteOptions } from "../controller/handlers/updateTransctionHandler";

async function postRoute(fastify: FastifyInstance) {
  fastify.get("/profile", profileRouteOptions);

  fastify.get("/vle-credentials", getVleCredentialsRouteOptions);

  fastify.get("/pocket/balance", pocketBalanceRouteOptions);

  fastify.post("/subscriptions", subscriptionsRouteOptions);

  fastify.get("/subscriptions", getSubscriptionsRouteOptions);

  fastify.post("/pocket/:id", pocketRouteOptions);

  fastify.post("/transactions/new", createTransactionRouteOptions);

  fastify.put("/transactions/update/:orderId", updateTransactionRouteOptions);
}

export default fp(postRoute);
