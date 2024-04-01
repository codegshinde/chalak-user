"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createTransactionRouteSchema", {
    enumerable: true,
    get: function() {
        return createTransactionRouteSchema;
    }
});
const _typebox = require("@sinclair/typebox");
// Define the options object schema with optional properties
const options = _typebox.Type.Object({
    orderId: _typebox.Type.String(),
    amount: _typebox.Type.Number(),
    mode: _typebox.Type.Optional(_typebox.Type.String()),
    portalFee: _typebox.Type.Optional(_typebox.Type.Number()),
    serviceId: _typebox.Type.Optional(_typebox.Type.String())
});
const createTransactionRouteSchema = {
    body: options
};
