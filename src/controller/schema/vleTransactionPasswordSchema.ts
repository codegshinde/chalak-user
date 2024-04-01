import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  transactionAmount: Type.Number(),
  vleId: Type.String(),
});

export const vleTransactionPasswordRouteSchema = {
  body: options,
};

export type vleTransactionPasswordRouteBody = Static<typeof options>;
