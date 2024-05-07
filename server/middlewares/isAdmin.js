import asyncHandler from "../config/asyncHandler.js";

export const isAdmin = asyncHandler((req, res, next) => {
    const { role } = req;
    if (role !== "admin") {
        res.status(403);
        throw new Error("access denied");
    }
    next();
});
