"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _fastifyplugin = require("fastify-plugin");
const _createDocument = require("../services/createDocument");
const _getDocument = require("../services/getDocument");
const _checkBalance = require("./checkBalance");
const _comparePassword = require("./comparePassword");
const _createUniqId = require("./createUniqId");
const _hashPassword = require("./hashPassword");
async function registerUtils(fastify) {
    fastify.decorateRequest("hashPassword", _hashPassword.hashPassword);
    fastify.decorateRequest("comparePassword", _comparePassword.comparePassword);
    fastify.decorateRequest("getDocument", _getDocument.getDocument);
    fastify.decorateRequest("createDocument", _createDocument.createDocument);
    fastify.decorateRequest("createUniqId", _createUniqId.createUniqId);
    fastify.decorateRequest("signJWT", fastify.jwt.sign);
    fastify.decorateRequest("pocket", _checkBalance.pocketBalance);
}
const _default = (0, _fastifyplugin.fastifyPlugin)(registerUtils);
