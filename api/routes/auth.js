import User from "../models/User.js";
import { Router } from "express";
import bcrypt from "bcryptjs";

const router = Router();

//! register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        res.status(201).json(
            {
                message: "User created successfully",
                data: savedUser
            }
        );
    } catch (error) {
        res.status(400).json(error);
    }
});

//! login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ error: "User not found!" });
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            res.status(403).json("Invalid password!");
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;