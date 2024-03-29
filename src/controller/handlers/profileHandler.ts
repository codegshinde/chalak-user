import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";

/**
 * Handles the login request.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} response - The Fastify response object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */
async function profileHandler(request: FastifyRequest, response: FastifyReply): Promise<void> {
  const { id } = request.user as { id: string };
  try {
    // Find the user by userId, lean() for a plain JavaScript object
    const user = await request.getDocument({ _id: id });
    if (!user) {
      throw new Error("Invalid userId. User not found.");
    }
    delete user.password;

    response.send({
      user: user,
    });
  } catch (error) {
    // Throw any caught errors
    throw error;
  }
}

/**
 * Options for the login route.
 * Combines the route schema with the handler.
 * @type {RouteShorthandOptionsWithHandler}
 */
export const profileRouteOptions: RouteShorthandOptionsWithHandler = {
  handler: profileHandler,
};
