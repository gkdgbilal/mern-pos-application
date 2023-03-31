import mongoose from "mongoose";

const UserSchema = mongoose.Schema;

const User = new UserSchema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    }
    ,
    {
        timestamps: true,
    }
);

export default mongoose.model("users", User);