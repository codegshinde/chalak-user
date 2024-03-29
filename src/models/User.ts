import { ObjectId, Schema, model } from "mongoose";

// Define the Address schema
interface Address {
  _id: ObjectId;
  district: string;
  subDistrict: string;
  village?: string;
  postalCode: string;
}
const addressSchema = new Schema<Address>({
  district: { type: String, required: true },
  subDistrict: { type: String, required: true },
  village: { type: String, required: false },
  postalCode: { type: String, required: true },
});

interface UserTypes {
  _id: ObjectId;
  isSubscribe: boolean;
  isPocket: "active" | "inactive" | "setup";
  firstName: string;
  lastName: string;
  isLive: boolean;
  userId: string;
  email: string;
  mobile: string;
  password?: string;
  address: Address[];
  avatar?: string;
}

// Define the User schema using the User interface
const UserSchema = new Schema<UserTypes>(
  {
    isSubscribe: { type: Boolean, required: true, default: false },
    isPocket: { type: String, required: false, default: "setup" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userId: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: [addressSchema],
    avatar: { type: String, required: false },
  },
  { timestamps: true }
);

const User = model<UserTypes>("users", UserSchema);

export { User, UserTypes };

