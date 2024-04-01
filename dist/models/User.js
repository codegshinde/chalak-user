"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "User", {
    enumerable: true,
    get: function() {
        return User;
    }
});
const _mongoose = require("mongoose");
const addressSchema = new _mongoose.Schema({
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
        required: false
    },
    postalCode: {
        type: String,
        required: true
    }
});
// Define the User schema using the User interface
const UserSchema = new _mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: [
        addressSchema
    ],
    avatar: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});
const User = (0, _mongoose.model)("users", UserSchema);
