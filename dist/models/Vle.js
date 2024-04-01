"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Vle", {
    enumerable: true,
    get: function() {
        return Vle;
    }
});
const _mongoose = require("mongoose");
const vleSchema = new _mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    subDistrict: {
        type: String,
        required: true
    },
    village: {
        type: String,
        required: true
    },
    vleEmail: {
        type: String,
        required: false
    },
    vleMobile: {
        type: String,
        required: true
    },
    vleName: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const Vle = (0, _mongoose.model)("vles", vleSchema);
