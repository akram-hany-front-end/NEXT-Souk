import mongoose, { Schema, Document, Model } from "mongoose";
export type UserRole =
    | "ADMIN"
    | "FACTORY"
    | "RETAILER"
    | "RMD"
    | "SHIPPER"
    | "USER"
    | "WHOLESALER"
    | "WORKER";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    city: string;
    age: number;
    nationalId: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        age: {
            type: Number,
            required: true,
            min: 1,
        },

        nationalId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        role: {
            type: String,
            enum: [
                "ADMIN",
                "FACTORY",
                "RETAILER",
                "RMD",
                "SHIPPER",
                "USER",
                "WHOLESALER",
                "WORKER",
            ],
            default: "USER",
        },
    },
    {
        timestamps: true,
    }
);

const User: Model<IUser> =
    mongoose.models.User ||
    mongoose.model<IUser>("User", userSchema);

export default User;