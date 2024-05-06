import { Schema, model } from "mongoose";

// Create Schema

const userSchema = new Schema(
    {
        username: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        userpicture: {
            type: String
        },
        fullname: {
            type: String
        },
        role: {
            type: String,
            enum: ["admin", "guest"],
            default: "admin"
        }
    },
    {
        timestamps: true
    }
);

// Create Model

const UserModel = model("users", userSchema);

export default UserModel;
