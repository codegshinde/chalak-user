import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  status: Type.String(),
  orderId: Type.String(),
});

export const updateTransactionRouteSchema = {
  body: options,
};

export type UpdateTransactionRouteBody = Static<typeof options>;
