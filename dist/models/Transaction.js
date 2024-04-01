"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Transaction", {
    enumerable: true,
    get: function() {
        return Transaction;
    }
});
const _mongoose = require("mongoose");
const transactionsSchema = new _mongoose.Schema({
    userId: {
        type: _mongoose.Schema.Types.ObjectId,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    serviceId: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    type: {
        type: String,
        required: true
    },
    mode: {
        type: String
    },
    portalFee: {
        type: Number,
        required: true,
        default: 5
    }
}, {
    timestamps: true
});
const Transaction = (0, _mongoose.model)("Transaction", transactionsSchema);
