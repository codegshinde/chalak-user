"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "subscriptionsRouteSchema", {
    enumerable: true,
    get: function() {
        return subscriptionsRouteSchema;
    }
});
const _typebox = require("@sinclair/typebox");
// Define the options object schema with optional properties
const options = _typebox.Type.Object({
    plan: _typebox.Type.String()
});
const subscriptionsRouteSchema = {
    body: options
};
