"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "upiUpdatePaymentRouteOptions", {
    enumerable: true,
    get: function() {
        return upiUpdatePaymentRouteOptions;
    }
});
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function upiUpdatePaymentHandler(request, reply) {
    try {
        const body = request.body;
        console.log(body); // You can remove this line if you don't need to log the body
        // Specify the file path where you want to save the body
        const filePath = _path.default.join(__dirname, "request-body.json");
        // Convert the body object to a JSON string
        const bodyJSON = JSON.stringify(body, null, 2); // The third argument '2' is for pretty-printing with indentation
        // Write the JSON string to the file
        _fs.default.writeFileSync(filePath, bodyJSON);
        console.log(`Request body saved to ${filePath}`);
        // You can send a response if needed
        reply.send({
            message: "Request body saved successfully"
        });
    } catch (error) {
        throw error;
    }
}
const upiUpdatePaymentRouteOptions = {
    schema: {},
    handler: upiUpdatePaymentHandler
};
