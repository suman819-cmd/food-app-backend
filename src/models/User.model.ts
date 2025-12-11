// import { Schema, model, Document } from "mongoose";

// export enum UserRole {
//   ADMIN = "ADMIN",
//   CUSTOMER = "CUSTOMER",
// }

// export interface IUser extends Document {
//   username: string;
//   email: string;
//   password: string;
//   role: UserRole;
//   isVerified: boolean;
// }

// const UserSchema = new Schema<IUser>({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: Object.values(UserRole), default: UserRole.CUSTOMER },
//   isVerified: { type: Boolean, default: false },
// });

// export const UserModel = model<IUser>("User", UserSchema);











import { Schema, model, Document } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  isVerified: boolean;

  restaurantName?: string;  // <-- added
  phone?: string;           // <-- added
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.CUSTOMER,
  },

  isVerified: { type: Boolean, default: false },

  restaurantName: { type: String, default: null }, // <-- added
  phone: { type: String, default: null },          // <-- added
});

export const UserModel = model<IUser>("User", UserSchema);
