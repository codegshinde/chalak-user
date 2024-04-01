"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "subscriptionsRouteOptions", {
    enumerable: true,
    get: function() {
        return subscriptionsRouteOptions;
    }
});
const _Subscription = require("../../models/Subscription");
const _calculateMonthRechargeDate = require("../../utils/calculateMonthRechargeDate");
const _subscriptionsSchema = require("../schema/subscriptionsSchema");
async function subscriptionsHandler(request, reply) {
    const { id } = request.user;
    const body = request.body;
    try {
        // Check if user already has an active subscription
        const existingSubscription = await _Subscription.Subscription.findOne({
            userId: id,
            endDate: {
                $gte: new Date()
            }
        });
        if (existingSubscription) {
            throw new Error("User already has an active subscription.");
        }
        // Calculate the end date of the subscription based on the start date and duration
        const endDate = await (0, _calculateMonthRechargeDate.calculateEndDateFromStartDate)(new Date(), body.duration);
        // Create a new subscription document
        const newSubscription = new _Subscription.Subscription({
            userId: id,
            plan: body.plan,
            endDate: endDate
        });
        // Save the new subscription
        await newSubscription.save();
        // Send the response with subscription details
        reply.send({
            subscriptionDetails: newSubscription
        });
    } catch (error) {
        // Forward any caught errors to Fastify for handling
        throw error;
    }
}
const subscriptionsRouteOptions = {
    schema: _subscriptionsSchema.subscriptionsRouteSchema,
    handler: subscriptionsHandler
};
