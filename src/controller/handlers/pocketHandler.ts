import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { UserToken } from "../../global";
import { Pocket } from "../../models/Pocket";

/**
 * Handles the request to create a new pocket.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */
async function pocketHandler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { id } = request.user as UserToken;
  try {
    // Check if pocket already exists for the user
    const existingPocket = await Pocket.findOne({ userId: id });

    if (existingPocket) {
      throw new Error("Pocket already created for this user.");
    }

    // Create a new pocket document
    const newPocket = new Pocket({
      userId: id,
    });
    await newPocket.save();

    // Send response with pocket details
    reply.send({
      pocketDetails: newPocket,
    });
  } catch (error) {
    // Forward error to Fastify for handling
    throw error;
  }
}

/**
 * Options for the create pocket route.
 * Combines the route schema with the handler.
 * @type {RouteShorthandOptionsWithHandler}
 */
export const pocketRouteOptions: RouteShorthandOptionsWithHandler = {
  handler: pocketHandler,
};
