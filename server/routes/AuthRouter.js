import { Router } from "express";

import { register, login, logout } from "../controllers/AuthController.js";

import { userValitationRules, userValidate } from "../middlewares/userValidation.js";


const authRouter = Router();

// AUTH -----------
authRouter.post("/register", userValitationRules(), userValidate, register)

authRouter.post("/login", login)

authRouter.post("/logout", logout)


authRouter.get("/me", (req, res) => {
  res.send("Hello from me")
})


export default authRouter;