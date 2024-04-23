import { Router } from "express";

import { register, login } from "../controllers/AuthController.js";

import { userValitationRules, userValidate } from "../middlewares/userValidation.js";


const authRouter = Router();

// AUTH -----------
authRouter.post("/register", userValitationRules(), userValidate, register)

authRouter.post("/login", login)

export default authRouter;