import asyncHandler from "../config/asyncHandler.js";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;
const isAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  console.log('Token:', token);  // Add this log to check if the token is received

  if (token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      next();
    } catch (error) {
      res.status(401);
      console.error("Token verification failed:", error);  // Log verification errors
      throw new Error("Not Authorized, invalid token");
    }
  } else {
    res.status(401);
    console.error("No token provided");  // Log missing token errors
    throw new Error("Not Authorized, no token");
  }
});

export { isAuth };
