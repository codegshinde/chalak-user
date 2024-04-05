"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Category", {
    enumerable: true,
    get: function() {
        return Category;
    }
});
const _mongoose = require("mongoose");
const categoriesSchema = new _mongoose.Schema({
    serviceId: {
        type: String,
        required: true
    },
    charges: {
        type: Number,
        required: true
    }
});
const Category = (0, _mongoose.model)("categories", categoriesSchema);
