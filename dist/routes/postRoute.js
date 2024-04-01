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
const _createTransctionHandler = require("../controller/handlers/createTransctionHandler");
const _createUpiTransactionHandler = require("../controller/handlers/createUpiTransactionHandler");
const _pocketHandler = require("../controller/handlers/pocketHandler");
const _subscriptionsHandler = require("../controller/handlers/subscriptionsHandler");
const _upiUpdatePaymentHandler = require("../controller/handlers/upi/upiUpdatePaymentHandler");
const _vleTransactionPasswordHandler = require("../controller/handlers/vleTransactionPasswordHandler");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function postRoute(fastify) {
    fastify.post("/subscriptions/create", _subscriptionsHandler.subscriptionsRouteOptions);
    fastify.post("/pocket/create", _pocketHandler.pocketRouteOptions);
    fastify.post("/transactions/new", _createTransctionHandler.createUserTransctionRouteOptions);
    fastify.post("/transactions/upi", _createUpiTransactionHandler.createUpiTransactionRouteOptions);
    fastify.post("/transactions/password", _vleTransactionPasswordHandler.vleTransactionPasswordRouteOptions);
    fastify.post("/notification/upi", _upiUpdatePaymentHandler.upiUpdatePaymentRouteOptions);
}
const _default = (0, _fastifyplugin.default)(postRoute);
