"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pocketBalanceRouteOptions", {
    enumerable: true,
    get: function() {
        return pocketBalanceRouteOptions;
    }
});
const _Pocket = require("../../models/Pocket");
/**
 * Handles the request to create a new pocket.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */ async function pocketBalanceHandler(request, reply) {
    const { id } = request.user;
    try {
        // Check if pocket already exists for the user
        const existingPocket = await _Pocket.Pocket.findOne({
            userId: id
        });
        if (!existingPocket) {
            throw new Error("Pocket Not Found Please Create Pocket.");
        }
        reply.send({
            pocket: existingPocket
        });
    } catch (error) {
        throw error;
    }
}
const pocketBalanceRouteOptions = {
    handler: pocketBalanceHandler
};
