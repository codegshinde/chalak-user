"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "vleTransactionPasswordRouteOptions", {
    enumerable: true,
    get: function() {
        return vleTransactionPasswordRouteOptions;
    }
});
const _Pocket = require("../../models/Pocket");
const _Vle = require("../../models/Vle");
const _vleTransactionPasswordSchema = require("../schema/vleTransactionPasswordSchema");
async function vleTransactionPasswordHandler(request, response) {
    try {
        const { id } = request.user;
        const { transactionAmount, vleId } = request.body;
        const pocket = await _Pocket.Pocket.findOne({
            userId: id
        });
        if (!pocket) {
            throw new Error("Invalid Pocket. Please Create Pocket!");
        }
        const minimumBalance = 200;
        const requiredBalance = minimumBalance + transactionAmount;
        if (pocket.balance < requiredBalance) {
            const shortfall = requiredBalance - pocket.balance;
            throw new Error(`Insufficient balance, you need at least ${requiredBalance}. Please add ${shortfall} to your wallet.`);
        }
        const vle = await _Vle.Vle.findOne({
            _id: id
        });
        if (!vle) {
            throw new Error("Something went wrong please try again!");
        }
        const password = btoa(vle.password);
        response.send({
            password: password
        });
    } catch (error) {
        throw error;
    }
}
const vleTransactionPasswordRouteOptions = {
    schema: _vleTransactionPasswordSchema.vleTransactionPasswordRouteSchema,
    handler: vleTransactionPasswordHandler
};
