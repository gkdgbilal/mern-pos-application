import mongoose from "mongoose";

const CategorySchema = mongoose.Schema;

const Category = new CategorySchema(
    {
        title: {
            type: String,
            required: true,
        },
    }
    ,
    {
        timestamps: true,
    }
);

export default mongoose.model("categories", Category);