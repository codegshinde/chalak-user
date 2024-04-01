"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createUpiTransactionRouteOptions", {
    enumerable: true,
    get: function() {
        return createUpiTransactionRouteOptions;
    }
});
const _UpiTransaction = require("../../models/UpiTransaction");
const _uniqIdOrderId = require("../../utils/uniqIdOrderId");
const _createUpiTransactionRouteSchema = require("../schema/createUpiTransactionRouteSchema");
const createUpiTransactionHandler = async (request, reply)=>{
    try {
        const { uniqId, amount } = request.body;
        const { id } = request.user;
        const checkExitingUpiTransaction = await _UpiTransaction.UpiTransaction.findOne({
            uniqId,
            status: "pending"
        });
        if (checkExitingUpiTransaction) {
            throw new Error("Sorry Try Again!");
        }
        // genrate orderId
        const orderId = await (0, _uniqIdOrderId.uniqOrderId)();
        const newUpiTransaction = new _UpiTransaction.UpiTransaction({
            orderId,
            uniqId,
            amount,
            userId: id
        });
        await newUpiTransaction.save();
        reply.send({
            paymentDetails: newUpiTransaction
        });
    } catch (error) {
        throw error;
    }
};
const createUpiTransactionRouteOptions = {
    schema: _createUpiTransactionRouteSchema.createUpiTransactionRouteSchema,
    handler: createUpiTransactionHandler
};
