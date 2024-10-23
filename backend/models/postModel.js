import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            require: true,
        },
        text: {
            type: String,
            required: String,
        },

    },
    {
        timestamps: true,
    }
);


export const Userpost = mongoose.model('Userpost', postSchema);