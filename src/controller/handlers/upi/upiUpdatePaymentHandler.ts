import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import fs from "fs";
import path from "path";

async function upiUpdatePaymentHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body;
    console.log(body); // You can remove this line if you don't need to log the body

    // Specify the file path where you want to save the body
    const filePath = path.join(__dirname, "request-body.json");

    // Convert the body object to a JSON string
    const bodyJSON = JSON.stringify(body, null, 2); // The third argument '2' is for pretty-printing with indentation

    // Write the JSON string to the file
    fs.writeFileSync(filePath, bodyJSON);

    console.log(`Request body saved to ${filePath}`);

    // You can send a response if needed
    reply.send({ message: "Request body saved successfully" });
  } catch (error) {
    throw error;
  }
}

export const upiUpdatePaymentRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: {},
  handler: upiUpdatePaymentHandler,
};
