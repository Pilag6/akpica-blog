import { Router } from "express";

import { register, login, logout, admin } from "../controllers/AuthController.js";

import { userValitationRules, userValidate } from "../middlewares/userValidation.js";


const authRouter = Router();

// AUTH -----------
authRouter.post("/register", userValitationRules(), userValidate, register)

authRouter.post("/login", login)

authRouter.post("/logout", logout)

authRouter.get("/admin", admin)


export default authRouter;