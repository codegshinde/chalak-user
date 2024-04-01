"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "profileRouteOptions", {
    enumerable: true,
    get: function() {
        return profileRouteOptions;
    }
});
const _User = require("../../models/User");
/**
 * Handles the profile request to retrieve user details.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} response - The Fastify response object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */ async function profileHandler(request, response) {
    try {
        const { id } = request.user;
        // Find the user by userId, lean() for a plain JavaScript object
        const user = await _User.User.findOne({
            _id: id
        }).lean();
        if (!user) {
            throw new Error("Invalid userId. User not found.");
        }
        // Remove sensitive information from the user object before sending the response
        delete user.password;
        // Send the response with user details
        response.send({
            user: user
        });
    } catch (error) {
        // Forward any caught errors to Fastify for handling
        throw error;
    }
}
const profileRouteOptions = {
    handler: profileHandler
};
