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
        date: {
            type: Number,
            required: true,
        },

    }
);


export const Userpost = mongoose.model('Userpost', postSchema);