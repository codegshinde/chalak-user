"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateTransactionRouteSchema", {
    enumerable: true,
    get: function() {
        return updateTransactionRouteSchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    status: _typebox.Type.String(),
    orderId: _typebox.Type.String()
});
const updateTransactionRouteSchema = {
    body: options
};
