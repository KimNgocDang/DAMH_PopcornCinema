import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../schemas/user.schema";
import mongoose from "mongoose";

// Đăng ký người dùng mới
export const register = async (fullName: string, email: string, password: string) => {
    try {
        console.log("🔍 [REGISTER] Starting registration for:", email);
        console.log("📊 [REGISTER] MongoDB connection status:", mongoose.connection.readyState === 1 ? "CONNECTED" : "DISCONNECTED");
        console.log("📊 [REGISTER] Current database:", mongoose.connection.name);

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("Email đã được sử dụng. Vui lòng dùng email khác");
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const newUser = new User({ fullName, email, passwordHash: hashedPassword });
        console.log("📝 [REGISTER] User object created:", newUser);

        // Lưu vào database
        const savedUser = await newUser.save();
        console.log("✅ [REGISTER] User saved successfully!");
        console.log("🆔 [REGISTER] User ID:", savedUser._id);
        console.log("📊 [REGISTER] Full saved user:", JSON.stringify(savedUser));

        // Verify user was actually saved to database
        const verifyUser = await User.findById(savedUser._id);
        if (verifyUser) {
            console.log("✅ [VERIFY] User found in database:", verifyUser.email);
        } else {
            console.log("❌ [VERIFY] User NOT found in database after save!");
        }

        // Trả về user đã lưu (loại bỏ passwordHash)
        const userObject = savedUser.toObject();
        const { passwordHash, ...userWithoutPassword } = userObject;
        return userWithoutPassword;
    } catch (err: any) {
        // Log lỗi để kiểm tra chi tiết nếu có
        console.error("❌ [REGISTER] Error during registration:", err.message);
        console.error("❌ [REGISTER] Full error:", err);
        throw new Error("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.");
    }
};

// Đăng nhập
export const login = async (email: string, password: string) => {
    try {
        // Kiểm tra email và loại bỏ passwordHash ngay từ đầu khi tìm user
        const user = await User.findOne({ email }).select("+passwordHash");  // Include passwordHash for comparison
        if (!user) throw new Error("Email hoặc mật khẩu không đúng");

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) throw new Error("Email hoặc mật khẩu không đúng");

        // Tạo JWT token
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not configured. Please set it in your environment.");
        }

        const token = jwt.sign(
            { userId: user._id, userRole: user.role }, // Include only necessary data
            jwtSecret,
            { expiresIn: "24h" } // Set token expiration time to 24 hours
        );

        // Loại bỏ passwordHash trước khi return
        const userObject = user.toObject();
        const { passwordHash, ...userWithoutPassword } = userObject;

        // Trả về token và user (passwordHash đã bị loại bỏ)
        return { token, user: userWithoutPassword };
    } catch (err) {
        // Log lỗi để kiểm tra chi tiết nếu có
        console.error("Error during login:", err);
        throw new Error("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.");
    }
};