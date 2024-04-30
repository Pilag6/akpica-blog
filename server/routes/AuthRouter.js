import { Router } from "express";

import {
    register,
    login,
    logout,
    admin,
    userPhoto,
    upload,
    getOneUser,
    editUser,
    deleteUser
} from "../controllers/AuthController.js";

import {
    userValitationRules,
    userValidate
} from "../middlewares/userValidation.js";

const authRouter = Router();

// AUTH -----------
authRouter.post("/register", userValitationRules(), userValidate, register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.get("/admin", admin);

authRouter.get("/photo/:username", userPhoto);

authRouter.get("/admin/edit/:id", getOneUser);

// authRouter.patch("/admin/edit/:id", editUser);
authRouter.patch("/admin/edit/:id", upload.single("userpicture"), editUser);

authRouter.delete("/admin/delete/:id", deleteUser);

export default authRouter;
