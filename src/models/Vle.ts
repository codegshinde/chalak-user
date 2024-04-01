import { Schema, model } from "mongoose";

interface VleTypes {
  userId: string;
  balance: number;
  password: string;
  district: string;
  subDistrict: string;
  village: string;
  vleName: string;
  vleMobile: string;
  vleEmail: string;
}

const vleSchema = new Schema<VleTypes>(
  {
    userId: { type: String, required: true },
    balance: { type: Number, required: false },
    password: { type: String, required: true },
    district: { type: String, required: true },
    subDistrict: { type: String, required: true },
    village: { type: String, required: true },
    vleEmail: { type: String, required: false },
    vleMobile: { type: String, required: true },
    vleName: { type: String, required: true },
  },
  { timestamps: true }
);

const Vle = model<VleTypes>("vles", vleSchema);

export { Vle, VleTypes };

