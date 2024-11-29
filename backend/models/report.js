import mongoose from "mongoose";

const reportSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        report_text: {
            type: String,
            required: true,
        },

    },
);


export const report = mongoose.model('report', reportSchema);