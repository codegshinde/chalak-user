import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  status: Type.String(),
});

const paramsOptions = Type.Object({
  orderId: Type.String(),
});

export const updateTransactionRouteSchema = {
  params: paramsOptions,
  body: options,
};

export type UpdateTransactionRouteBody = Static<typeof options>;
