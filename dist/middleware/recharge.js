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
 * Adds a preHandler hook to verify JWT tokens for the protected route.
 *
 * @param fastify - The FastifyInstance to register the plugin.
 */ async function recharge(fastify) {
    // Define the secure route that requires authentication
    const secureRoute = "/user/vle-credentials";
    // Add preHandler hook to verify JWT for the protected route
    fastify.addHook("preHandler", async (request)=>{
        try {
            // Check if the current route is the secure route
            if (request.routeOptions && request.routeOptions.url === secureRoute) {
                const user = request.user;
                const subscriptionCheck = await _Subscription.Subscription.findOne({
                    userId: user.id,
                    endDate: {
                        $gte: new Date()
                    }
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
const _default = (0, _fastifyplugin.default)(recharge);
