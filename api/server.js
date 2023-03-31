import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import logger from "morgan";
import categoryRoutes from "./routes/categories.js";
import productRoutes from "./routes/products.js";
import billRoutes from "./routes/bills.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
}

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
    connect();
    console.log(`Example app listening on port ${port}`);
});