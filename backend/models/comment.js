import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
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


export { commentSchema }