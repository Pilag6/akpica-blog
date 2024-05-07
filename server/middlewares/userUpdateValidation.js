import { body, validationResult } from "express-validator";
import UserModel from "../models/UserModel.js";

const userUpdateValidation = () => {
    return [
        body("password")
            .exists()
            .withMessage("You have to enter a password")
            .notEmpty()
            .withMessage("Your password is empty")
            .isString()
            .withMessage("Password should be a string")
            .trim()
            .isStrongPassword({
                minLength: 5,
                maxLength: 15,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })
            .withMessage(
                "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character and must be between 5 to 15 characters"
            ),
            // .custom((value, req) => {
            //     const { username, email } = req.req.body;
            //     // console.log("REQUEST", email.substring(0, email.indexOf("@")));

            //     const emailSubs = email.substring(0, email.indexOf("@"));

            //     // Should not contain the username or parts of the user’s email.

            //     if (
            //         value.toLowerCase().slice(0, username.length) !==
            //             username.toLowerCase() &&
            //         value.toLowerCase().slice(0, emailSubs.length) !== emailSubs
            //     ) {
            //         // console.log(value.toLowerCase().slice(0, emailSubs.length -1));
            //         return true;
            //     }
            //     throw new Error(
            //         "Password should not contain the username or parts of the user’s email"
            //     );
            // }),
        body("fullname")
            .optional()
            .isString()
            .withMessage("Fullname should be a string")
            .trim()
            .isLength({ min: 3, max: 30 })
            .withMessage("Fullname must be between 3 to 30 characters")
            .not()
            .matches(/(<([^>]+)>)/gi)
            .toLowerCase()
            .escape()
    ];
};

const userUpdateValidate = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { email, password, fullname } = req.body;
        const userUpdate = UserModel.updateOne({ email, password, fullname });
        if (userUpdate) {
            return res.status(200).json({
                message: "User updated"
            });
        }
        return next();
    }

    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(400).json({
        errors: extractedErrors
    });
};

export { userUpdateValidation, userUpdateValidate };
