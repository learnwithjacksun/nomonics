import { Router } from "express";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import { updateUserProfile } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.put("/profile/:id", isAuthenticated, updateUserProfile);

export default userRouter;
