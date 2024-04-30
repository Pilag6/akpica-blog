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

const authRouter = Router();

// AUTH -----------
authRouter.post("/register", userValitationRules(), userValidate, register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.get("/admin", admin);

authRouter.get("/photo/:username", userPhoto);

authRouter.get("/admin/edit/:id", getOneUser);

// authRouter.patch("/admin/edit/:id", editUser);
authRouter.patch("/admin/editPicture/:id", upload.single("userpicture"), editUserPicture);

authRouter.patch("/admin/editUserInfo/:id", editUserInfo);

authRouter.delete("/admin/delete/:id", deleteUser);

export default authRouter;
