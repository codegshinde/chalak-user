"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pocketBalance", {
    enumerable: true,
    get: function() {
        return pocketBalance;
    }
});
const _Pocket = require("../models/Pocket");
const pocketBalance = async (pocketId)=>{
    try {
        const pocket = await _Pocket.Pocket.findOne({
            pocketId: pocketId
        });
        if (!pocket) {
            throw new Error("Pocket Not Created, Create it First!");
        }
        return pocket;
    } catch (error) {
        throw error;
    }
};
