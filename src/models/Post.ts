import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
    title: string;
    description: string;
    price: number;
    image: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    rejectionReason?: string;

    user: mongoose.Types.ObjectId;
}

const postSchema = new Schema<IPost>(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        image: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED"],
            default: "PENDING",
        },

        rejectionReason: {
            type: String,
            default: "",
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Post =
    mongoose.models.Post ||
    mongoose.model<IPost>("Post", postSchema);

export default Post;