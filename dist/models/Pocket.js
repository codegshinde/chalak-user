"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Pocket", {
    enumerable: true,
    get: function() {
        return Pocket;
    }
});
const _mongoose = require("mongoose");
const pocketSchema = new _mongoose.Schema({
    userId: {
        type: _mongoose.Schema.Types.ObjectId,
        required: true
    },
    balance: {
        type: Number,
        required: false,
        default: 0
    }
}, {
    timestamps: true
});
const Pocket = (0, _mongoose.model)("pockets", pocketSchema);
