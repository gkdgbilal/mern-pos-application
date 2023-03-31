import Bill from "../models/Bill.js";
import { Router } from "express";

const router = Router();

router.get("/get-all", async (req, res) => {
    try {
        const bills = await Bill.find();
        res.status(200).json(bills);
    } catch (error) {
        res.status(404).json(error);
    }
});

router.post("/add-bill", async (req, res) => {
    try {
        const newBill = new Bill(req.body);
        const savedBill = await newBill.save();
        res.status(201).json(
            {
                message: "Bill created successfully",
                data: savedBill
            }
        );
    } catch (error) {
        res.status(400).json(error);
    }
});

export default router;