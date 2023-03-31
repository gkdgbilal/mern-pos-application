import mongoose from "mongoose";

const ProductSchema = mongoose.Schema;

const Product = new ProductSchema(
    {
        title: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        }
    }
    ,
    {
        timestamps: true,
    }
);

export default mongoose.model("products", Product);