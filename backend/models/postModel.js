import mongoose from "mongoose";
import { commentSchema } from "./comment.js";

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: false,
        },
        text: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        vote: {
            type: Number,
            required: true,
            default: 0
        },
        comments: [commentSchema],
    },
    {
        timestamps: true,
    }
);


export const Userpost = mongoose.model('Userpost', postSchema);