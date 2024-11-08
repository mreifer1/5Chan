import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        author: {
            type: String,
            required: false,
        },
        text: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


export const Usercomment = mongoose.model('Usercomment', postSchema);