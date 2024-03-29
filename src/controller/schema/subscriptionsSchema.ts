import { Static, Type } from "@sinclair/typebox";

// Define the options object schema with optional properties
const options = Type.Object({
  plan: Type.String(),
});

// Define the transaction route schema
export const subscriptionsRouteSchema = {
  body: options,
};

// Define the type for the request body
export type SubscriptionsRouteBody = Static<typeof options>;
