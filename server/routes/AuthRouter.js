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
authRouter.post("/register", isAuth, userValitationRules(), userValidate, register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.get("/admin", isAuth, admin);

authRouter.get("/admin/:id", isAuth, getOneUser);

authRouter.get("/photo/:username", userPhoto);

authRouter.patch("/admin/editPicture/:id", upload.single("userpicture"), editUserPicture);

authRouter.patch("/admin/editUserInfo/:id", isAuth, editUserInfo);
// authRouter.patch("/admin/editUserInfo/:id", editUserInfo);

authRouter.delete("/admin/delete/:id", isAuth, deleteUser);

export default authRouter;
