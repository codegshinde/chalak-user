"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pocketRouteOptions", {
    enumerable: true,
    get: function() {
        return pocketRouteOptions;
    }
});
const _Pocket = require("../../models/Pocket");
/**
 * Handles the request to create a new pocket.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */ async function pocketHandler(request, reply) {
    const { id } = request.user;
    try {
        // Check if pocket already exists for the user
        const existingPocket = await _Pocket.Pocket.findOne({
            userId: id
        });
        if (existingPocket) {
            throw new Error("Pocket already created for this user.");
        }
        // Create a new pocket document
        const newPocket = new _Pocket.Pocket({
            userId: id
        });
        await newPocket.save();
        // Send response with pocket details
        reply.send({
            pocketDetails: newPocket
        });
    } catch (error) {
        // Forward error to Fastify for handling
        throw error;
    }
}
const pocketRouteOptions = {
    handler: pocketHandler
};
