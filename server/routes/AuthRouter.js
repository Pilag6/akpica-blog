import { Router } from "express";

import {
    register,
    login,
    logout,
    admin,
    userPhoto,
    getOneUser,
    editUserPicture,
    editUserInfo,
    deleteUser,
    getMe
} from "../controllers/AuthController.js";

import { upload } from "../utils/multerStorage.js";

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

authRouter.get('/me', isAuth, getMe);

authRouter.get("/admin", isAuth, admin);

authRouter.get("/admin/:id", isAuth, getOneUser);

authRouter.get("/photo/:username", userPhoto);

authRouter.patch("/admin/editPicture/:id", upload.single("userpicture"), editUserPicture);

authRouter.patch("/admin/editUserInfo/:id", isAuth, editUserInfo);
// authRouter.patch("/admin/editUserInfo/:id", editUserInfo);

authRouter.delete("/admin/delete/:id", isAuth, deleteUser);

export default authRouter;
