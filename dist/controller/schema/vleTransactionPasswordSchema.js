"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "vleTransactionPasswordRouteSchema", {
    enumerable: true,
    get: function() {
        return vleTransactionPasswordRouteSchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    transactionAmount: _typebox.Type.Number(),
    vleId: _typebox.Type.String()
});
const vleTransactionPasswordRouteSchema = {
    body: options
};
