import { Schema, model } from "mongoose";

// Create Schema

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        image: {
            type: String,
            // public_id: String,
            // url: String
        },
        tags: {
            type: [String]
        },
        date: {
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
