import { FastifyInstance, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { UserToken } from "../global";
import { Subscription } from "../models/Subscription";

/**
 * Plugin for authentication middleware.
 * Adds a preHandler hook to verify JWT tokens for the protected route.
 *
 * @param fastify - The FastifyInstance to register the plugin.
 */
async function recharge(fastify: FastifyInstance): Promise<void> {
  // Define the secure route that requires authentication
  const secureRoute = "/user/vle-credentials";

  // Add preHandler hook to verify JWT for the protected route
  fastify.addHook("preHandler", async (request: FastifyRequest) => {
    try {
      // Check if the current route is the secure route
      if (request.routeOptions && request.routeOptions.url === secureRoute) {
        const user = request.user as UserToken;

        const subscriptionCheck = await Subscription.findOne({
          userId: user.id,
          endDate: { $gte: new Date() },
        });

        // Throw an error if the subscription is not active
        if (!subscriptionCheck) {
          throw new Error("Subscription is not active!");
        }
      }

      return;
    } catch (error) {
      // Throw an error if authentication fails
      throw error;
    }
  });
}

// Export the plugin as a Fastify plugin
export default fp(recharge);
