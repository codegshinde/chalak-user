"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDocument", {
    enumerable: true,
    get: function() {
        return createDocument;
    }
});
async function createDocument(model, data, options) {
    try {
        const document = new model(data);
        await document.save(options);
        return document;
    } catch (error) {
        throw error;
    }
}
