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
        image: {
            type: String,
        },
        vote: {
            type: Number,
            required: true,
            default: 0
        },

    },
    {
        timestamps: true,
    }
);


export const Userpost = mongoose.model('Userpost', postSchema);