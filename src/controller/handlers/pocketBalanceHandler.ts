import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { UserToken } from "../../global";

/**
 * Handles the request to create a new pocket.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */
async function pocketBalanceHandler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const authenticatedUser = request.user as UserToken;
  try {
    // Check if pocket already exists for the user
    const existingPocket = await request.getD;

    if (!existingPocket) {
      throw new Error("Pocket Not Found Please Create Pocket.");
    }

    reply.send({
      pocket: existingPocket,
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Options for the create pocket route.
 * Combines the route schema with the handler.
 * @type {RouteShorthandOptionsWithHandler}
 */
export const pocketBalanceRouteOptions: RouteShorthandOptionsWithHandler = {
  handler: pocketBalanceHandler,
};
