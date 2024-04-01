"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getSubscriptionsRouteOptions", {
    enumerable: true,
    get: function() {
        return getSubscriptionsRouteOptions;
    }
});
const _Subscription = require("../../models/Subscription");
/**
 * Handles the request to create a new pocket.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */ async function getSubscriptionsHandler(request, reply) {
    const { id } = request.user;
    const body = request.user;
    try {
        // Check if pocket already exists for the user
        const subscriptions = await _Subscription.Subscription.findOne({
            userId: id,
            endDate: {
                $gte: new Date()
            }
        });
        if (!subscriptions) {
            throw new Error("Subscription is not active");
        }
        reply.send({
            subscriptions: subscriptions
        });
    } catch (error) {
        throw error;
    }
}
const getSubscriptionsRouteOptions = {
    handler: getSubscriptionsHandler
};
