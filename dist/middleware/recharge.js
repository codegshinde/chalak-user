"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export the plugin as a Fastify plugin
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _fastifyplugin = /*#__PURE__*/ _interop_require_default(require("fastify-plugin"));
const _Subscription = require("../models/Subscription");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * Plugin for authentication middleware.
 * Adds a preHandler hook to verify JWT tokens for protected routes.
 *
 * @param fastify - The FastifyInstance to register the plugin.
 */ async function recharge(fastify) {
    // Define public routes that do not require authentication
    const publicRoutes = [
        "/user/subscriptions/create"
    ];
    // Add preHandler hook to verify JWT for protected routes
    fastify.addHook("preHandler", async (request)=>{
        try {
            const user = request.user;
            // Skip authentication for public routes
            if (request.routeOptions && request.routeOptions.url && publicRoutes.includes(request.routeOptions.url)) {
                return;
            }
            const subscriptionCheck = await _Subscription.Subscription.findOne({
                userId: user.id,
                endDate: {
                    $gte: new Date()
                }
            });
            // Throw an error if auth headers are not provided
            if (!subscriptionCheck) {
                throw new Error("Subscription is not active!");
            }
        } catch (error) {
            // Throw an error if JWT verification fails
            throw error;
        }
    });
}
const _default = (0, _fastifyplugin.default)(recharge);
