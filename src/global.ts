import "fastify";
import { Schema } from "mongoose";
import { CreateDocument } from "./services/createDocument";
import { GetDocument } from "./services/getDocument";
import { PocketBalance } from "./utils/checkBalance";
import { ComparePassword } from "./utils/comparePassword";
import { CreateUniqId } from "./utils/createUniqId";
import { HashPassword } from "./utils/hashPassword";

declare module "fastify" {
  interface FastifyRequest {
    hashPassword: HashPassword;
    comparePassword: ComparePassword;
    createDocument: CreateDocument;
    getDocument: GetDocument;
    createUniqId: CreateUniqId;
    signJWT: (payload: Record<string, string | any>) => string;
    pocket: PocketBalance;
  }
}

declare module "fastify" {
  interface FastifyInstance {
    config: {
      DATABASE_URI: string;
      JWT_SECRET: string;
    };
  }
}

export interface UserToken {
  id: Schema.Types.ObjectId;
  userId: string;
}
