import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { getSubscriptionsRouteOptions } from "../controller/handlers/getSubscriptionsHandler";
import { getUserTransactionRouteOptions } from "../controller/handlers/getTransctionHandler";
import { getVleCredentialsRouteOptions } from "../controller/handlers/getVleCredentialsHandler";
import { pocketBalanceRouteOptions } from "../controller/handlers/pocketBalanceHandler";
import { profileRouteOptions } from "../controller/handlers/profileHandler";

async function getROutes(fastify: FastifyInstance) {
  fastify.get("/subscriptions/view", getSubscriptionsRouteOptions);
  fastify.get("/vle-credentials", getVleCredentialsRouteOptions);
  fastify.get("/pocket/balance", pocketBalanceRouteOptions);
  fastify.get("/profile", profileRouteOptions);
  fastify.get("/transactions/views", getUserTransactionRouteOptions);
  fastify.get("/reload", async (req, rep) => {
    rep.send({
      message: "reload",
    });
  });
}

export default fastifyPlugin(getROutes);
