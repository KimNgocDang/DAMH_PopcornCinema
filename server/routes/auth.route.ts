import { Router } from "express";
import { register, login } from "../services/auth.service";
import { validateRegister, validateLogin } from "../middlewares/validate.middleware";

const router = Router();

// Đăng ký
router.post("/register", validateRegister, async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const user = await register(fullName, email, password);
        res.status(201).json(user);
    } catch (err: any) {
        // Handle MongoDB duplicate key error
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email đã được sử dụng. Vui lòng dùng email khác" });
        }
        res.status(400).json({ message: err.message });
    }
});

// Đăng nhập
router.post("/login", validateLogin, async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, user } = await login(email, password);
        res.json({ token, user });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

export default router;