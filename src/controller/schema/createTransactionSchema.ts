import { Static, Type } from "@sinclair/typebox";

// Define the options object schema with optional properties
const options = Type.Object({
  orderId: Type.String(),
  amount: Type.Number(),
  mode: Type.Optional(Type.String()), // Making mode optional
  portalFee: Type.Optional(Type.Number()), // Making portalFee optional
  serviceId: Type.Optional(Type.String()),
});

// Define the transaction route schema
export const createTransactionRouteSchema = {
  body: options,
};

// Define the type for the request body
export type TransactionRouteBody = Static<typeof options>;
