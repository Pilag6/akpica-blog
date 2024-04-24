import { Schema, model } from "mongoose";

// Create Schema

const postSchema = new Schema(
    {
        title : {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            default: "Akpica Team"
        },
        image: {
            type: String,
        },
        tags : {
            type: [String],
        },
        date : {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

// Create Model

const PostModel = model("posts", postSchema);

export default PostModel;
