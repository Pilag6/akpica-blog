import { Router } from "express";

import {
    register,
    login,
    logout,
    admin,
    userPhoto,
    upload,
    getOneUser,
    editUserPicture,
    editUserInfo,
    deleteUser
} from "../controllers/AuthController.js";

import {
    userValitationRules,
    userValidate
} from "../middlewares/userValidation.js";

import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/isAuth.js";

const authRouter = Router();

// AUTH -----------
authRouter.post("/register", userValitationRules(), userValidate, register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.get("/admin", admin);

authRouter.get("/admin/:id", getOneUser);

authRouter.get("/photo/:username", userPhoto);

authRouter.patch("/admin/editPicture/:id", upload.single("userpicture"), editUserPicture);

authRouter.patch("/admin/editUserInfo/:id", isAuth, isAdmin,  editUserInfo);

authRouter.delete("/admin/delete/:id", deleteUser);

export default authRouter;
