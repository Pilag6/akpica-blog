import { body, validationResult } from "express-validator";
import UserModel from "../models/UserModel.js";

const emailValitationRules = () => {
    return [
        body("email")
            .exists()
            .withMessage("You have to enter an email")
            .notEmpty()
            .withMessage("Your email is empty")
            .isEmail()
            .withMessage("Enter a valid email")
            .custom(async (value) => {
                const user = await UserModel.findOne({ email: value });
                if (!user) {
                    return Promise.reject("Email not found");
                }
            })
            .withMessage("Email not found")
            .toLowerCase()
            .escape()
    ];
};

const emailValidate = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Email not found" });
        }

        next();
    }

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
};

export { emailValitationRules, emailValidate };
