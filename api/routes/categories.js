import Category from "../models/Category.js";
import { Router } from "express";

const router = Router();

router.get("/get-all", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json(error);
    }
});

router.post("/add-category", async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        const savedCategory = await newCategory.save();
        res.status(201).json(
            {
                message: "Category created successfully",
                data: savedCategory
            }
        );
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put("/update-category", async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.body.categoryId, req.body);
        res.status(200).json(
            {
                message: "Category updated successfully",
                data: updatedCategory
            }
        );
    } catch (error) {
        res.status(404).json(error);
    }
});

router.delete("/delete-category", async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.body.categoryId);
        res.status(200).json(
            {
                message: "Category deleted successfully",
                data: deletedCategory
            }
        );
    } catch (error) {
        res.status(404).json(error);
    }
});

export default router;