import Product from "../models/Product.js";
import { Router } from "express";

const router = Router();

router.get("/get-all", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json(error);
    }
});

router.post("/add-product", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(
            {
                message: "Product created successfully",
                data: savedProduct
            }
        );
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put("/update-product", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.body.productId, req.body);

        if (!!updatedProduct) {
            res.status(200).json(
                {
                    message: "Product updated successfully",
                    data: updatedProduct
                }
            );
        } else {
            res.status(404).json(
                {
                    message: "Product not found",
                    data: updatedProduct
                }
            );
        }
    } catch (error) {
        res.status(404).json(error);
    }
});

router.delete("/delete-product", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.body.productId);

        if (!!deletedProduct) {
            res.status(200).json(
                {
                    message: "Product deleted successfully",
                    data: deletedProduct
                }
            );
        } else {
            res.status(404).json(
                {
                    message: "Product not found",
                    data: deletedProduct
                }
            );
        }
    } catch (error) {
        res.status(404).json(error);
    }
});

export default router;