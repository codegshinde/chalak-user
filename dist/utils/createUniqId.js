"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createUniqId", {
    enumerable: true,
    get: function() {
        return createUniqId;
    }
});
const _User = require("../models/User");
async function createUniqId(firstName, lastName) {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    const firstLetter = firstName.charAt(0).toUpperCase();
    const lastLetter = lastName.charAt(0).toUpperCase();
    const userId = `${firstLetter}${lastLetter}${randomNumber}`;
    // Check if generated ID already exists in database
    const existingUser = await _User.User.findOne({
        userId
    });
    // If ID exists, generate a new one recursively until a unique ID is found.
    if (existingUser) {
        return await createUniqId(firstName, lastName);
    }
    return userId;
}
