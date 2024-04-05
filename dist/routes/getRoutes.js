"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _fastifyplugin = /*#__PURE__*/ _interop_require_default(require("fastify-plugin"));
const _getSubscriptionsHandler = require("../controller/handlers/getSubscriptionsHandler");
const _getTransctionHandler = require("../controller/handlers/getTransctionHandler");
const _getVleCredentialsHandler = require("../controller/handlers/getVleCredentialsHandler");
const _pocketBalanceHandler = require("../controller/handlers/pocketBalanceHandler");
const _profileHandler = require("../controller/handlers/profileHandler");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function getROutes(fastify) {
    fastify.get("/subscriptions/view", _getSubscriptionsHandler.getSubscriptionsRouteOptions);
    fastify.get("/vle-credentials", _getVleCredentialsHandler.getVleCredentialsRouteOptions);
    fastify.get("/pocket/balance", _pocketBalanceHandler.pocketBalanceRouteOptions);
    fastify.get("/profile", _profileHandler.profileRouteOptions);
    fastify.get("/transactions/views", _getTransctionHandler.getUserTransactionRouteOptions);
    fastify.get("/reload", async (req, rep)=>{
        rep.send({
            message: "reload"
        });
    });
}
const _default = (0, _fastifyplugin.default)(getROutes);
