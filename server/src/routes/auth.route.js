import { Router } from "express";
import { checkAuth, loginUser, logoutUser, registerUser, resendVerificationEmail, resetPassword, sendResetPasswordLink, verifyUser } from "../controller/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/check", isAuthenticated, checkAuth);
authRouter.post("/logout", isAuthenticated, logoutUser);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/verify-user", verifyUser);
authRouter.post("/resend-verification-email", resendVerificationEmail);
authRouter.post("/forgot-password", sendResetPasswordLink);

export default authRouter;