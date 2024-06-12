import { Schema, model } from "mongoose";
import slugify from 'slugify';

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
            type: String
        },
        tags: {
            type: [String]
        },
        date: {
            type: Date,
            default: Date.now
        },
        slug: {
            type: String,
            unique: true,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Middleware to create slug from title
postSchema.pre('validate', function(next) {
    if (this.isModified('title') || this.isNew) {
        this.slug = slugify(this.title, { lower: true, strict: true });
        console.log(`Slug generated: ${this.slug}`); // Debug log
    }
    next();
});

// Create Model
const PostModel = model("posts", postSchema);

export default PostModel;
