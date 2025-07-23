import jwt from "jsonwebtoken";
import env from "../config/env.js";
import UserModel from "../model/user.model.js";

export const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
   try {
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({
            success: false,
            message: "Session expired",
        });
    }
    const user = await UserModel.findById(decoded.id);
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not found",
        });
    }
    req.user = user;
    req.token = token;
    next();
   } catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
        message: error.message,
    });
   }
}