"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createUpiTransactionRouteSchema", {
    enumerable: true,
    get: function() {
        return createUpiTransactionRouteSchema;
    }
});
const _typebox = require("@sinclair/typebox");
// Define the options object schema with optional properties
const options = _typebox.Type.Object({
    amount: _typebox.Type.Number(),
    uniqId: _typebox.Type.Optional(_typebox.Type.String())
});
const createUpiTransactionRouteSchema = {
    body: options
};
