import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshTokens: [{
            type: String,
            required: false,
        }]

    },
);


export const user = mongoose.model('user', userSchema);