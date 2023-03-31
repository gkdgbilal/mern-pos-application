import mongoose from "mongoose";

const BillSchema = mongoose.Schema;

const Bill = new BillSchema(
    {
        customerName: {
            type: String,
            required: true,
        },
        customerPhoneNumber: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        cartItems: {
            type: Array,
            required: true,
        },
        subTotal: {
            type: Number,
            required: true,
        },
        tax: {
            type: Number,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
    }
    ,
    {
        timestamps: true,
    }
);

export default mongoose.model("bills", Bill);