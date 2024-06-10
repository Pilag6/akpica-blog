import asyncHandler from "../config/asyncHandler.js";

const isAdmin = asyncHandler((req, res, next) => {
    // const { role } = req;
    // if (role !== "admin") {
    //     res.status(403);
    //     throw new Error("access denied");
    // }
    // next();

    console.log("Hello");

    if (req.user.role !== "guest") {
        console.log("Hello1");
        next();
    }

    if (req.user._id.toString() !== req.params.id) {
        console.log("Hello2");
        res.status(403);
        throw new Error("access denied");
    }


});

export { isAdmin };
