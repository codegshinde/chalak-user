"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "upiUpdatePaymentRouteOptions", {
    enumerable: true,
    get: function() {
        return upiUpdatePaymentRouteOptions;
    }
});
async function upiUpdatePaymentHandler(request, reply) {
    try {
        const body = request.body;
        console.log(body);
    } catch (error) {
        throw error;
    }
}
const upiUpdatePaymentRouteOptions = {
    schema: {},
    handler: upiUpdatePaymentHandler
};
