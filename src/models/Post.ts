import { ObjectId } from "mongodb";
import mongoose, { Schema, Document, Model } from "mongoose";
export type PostStatus =  "PENDING" | "APPROVED" | "REJECTED";
export interface IPost extends Document {
    title: string;
    description: string;
    price: number;
    image: string;
    status: PostStatus;
    user: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new Schema<IPost>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        image: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        status: {
            type: String,
            enum: ["PENDING" , "APPROVED" , "REJECTED"],
            default:"PENDING",
        },

        user: {
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },

    
    },
    {
        timestamps: true,
    }
);

const Post: Model<IPost> =
    mongoose.models.Post ||
    mongoose.model<IPost>("Post", postSchema);

export default Post;