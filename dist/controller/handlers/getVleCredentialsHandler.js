"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getVleCredentialsRouteOptions", {
    enumerable: true,
    get: function() {
        return getVleCredentialsRouteOptions;
    }
});
const _Pocket = require("../../models/Pocket");
const _User = require("../../models/User");
const _Vle = require("../../models/Vle");
/**
 * Handles the login request.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} response - The Fastify response object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */ async function getVleCredentialsHandler(request, response) {
    const { id } = request.user;
    try {
        // Find the user by userId, lean() for a plain JavaScript object
        const user = await _User.User.findOne({
            _id: id
        });
        if (!user) {
            throw new Error("Invalid userId. User not found.");
        }
        const pocket = await _Pocket.Pocket.findOne({
            userId: id
        });
        if (!pocket) {
            throw new Error("Invalid Pocket. Please Create Pocket");
        }
        if (pocket.balance < 100) {
            throw new Error("Balance is below 100, please add balance.");
        }
        const vle = await _Vle.Vle.findOne({
            subDistrict: user.address[0].subDistrict
        });
        if (!vle) {
            throw new Error("Vle not found in your sub-district. We apologize for the inconvenience. Please contact support for further assistance.");
        }
        // const vleIdPassword = await Vle.aggregate([
        //   { $match: { subDistrict: user.address[0].subDistrict } },
        //   { $sample: { size: 1 } },
        // ]);
        // vleIdPassword will contain an array with one randomly selected document
        // const randomVle = vleIdPassword[0];
        const password = btoa(vle.password);
        response.send({
            username: vle.userId,
            password: password
        });
    } catch (error) {
        // Throw any caught errors
        throw error;
    }
}
const getVleCredentialsRouteOptions = {
    handler: getVleCredentialsHandler
};
