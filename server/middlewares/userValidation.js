import { body, validationResult } from "express-validator";
import UserModel from "../models/UserModel.js";

const userValitationRules = () => {
    return [
        body("username")
            .exists()
            .withMessage("You have to enter an username")
            .notEmpty()
            .withMessage("Your username is empty")
            .isString()
            .withMessage("Username should be a string")
            .custom(async (value) => {
                const user = await UserModel.findOne({ username: value });
                if (user) {
                    return Promise.reject("Username already in use");
                }
            })
            .withMessage("Username already in use")
            .trim()
            .isLength({ min: 3, max: 15 })
            .withMessage("Username must be between 3 to 15 characters")
            .not()
            .matches(/(<([^>]+)>)/gi)
            // .toLowerCase()
            .escape(),
        body("email")
            .exists()
            .withMessage("You have to enter an email")
            .notEmpty()
            .withMessage("Your email is empty")
            .isEmail()
            .withMessage("Enter a valid email")
            .custom(async (value) => {
                const user = await UserModel.findOne({ email: value });
                if (user) {
                    return Promise.reject("Email already in use");
                }
            })
            .withMessage("Email already in use")
            .toLowerCase()
            .escape(),
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
            )
            .custom((value, req) => {
                const { username, email } = req.req.body;
                // console.log("REQUEST", email.substring(0, email.indexOf("@")));

                const emailSubs = email.substring(0, email.indexOf("@"));

                // Should not contain the username or parts of the user’s email.

                if (
                    value.toLowerCase().slice(0, username.length) !==
                        username.toLowerCase() &&
                    value.toLowerCase().slice(0, emailSubs.length) !== emailSubs
                ) {
                    // console.log(value.toLowerCase().slice(0, emailSubs.length -1));
                    return true;
                }
                throw new Error(
                    "Password should not contain the username or parts of the user’s email"
                );
            }),
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
            .escape(),
    ];
};

const userValidate = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { username, email } = req.body;
        const user = await UserModel.findOne({ username, email });
        
        if (user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "User already exists"
                    }
                ]
            });
        }
        return next();
    }

    const extractedErrors = [];

    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(400).json({
        errors: extractedErrors
    });

    
}

export { userValitationRules, userValidate };
