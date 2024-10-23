import mongoose from "mongoose";

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

    },
    {
        timestamps: true,
    }
);


export const Userpost = mongoose.model('Userpost', postSchema);