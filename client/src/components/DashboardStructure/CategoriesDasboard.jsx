import { useContext, useEffect, useRef } from "react";
import { PostContext } from "@contexts/PostContext"; // Adjust the import path according to your project structure
import { Link } from "react-router-dom";
import { FaTags } from "react-icons/fa";

function CategoriesDashboard() {
    const { posts } = useContext(PostContext);

    // Extract unique tags from posts
    const allTags = posts.reduce((acc, post) => {
        post.tags.forEach((tag) => {
            if (!acc.includes(tag)) {
                acc.push(tag);
            }
        });
        return acc;
    }, []);

    const containerRef = useRef(null);

    const checkCollision = (tagRect, otherRects) => {
        return otherRects.some(otherRect => {
            return !(
                tagRect.right < otherRect.left ||
                tagRect.left > otherRect.right ||
                tagRect.bottom < otherRect.top ||
                tagRect.top > otherRect.bottom
            );
        });
    };

    useEffect(() => {
        const container = containerRef.current;
        const tags = container.querySelectorAll('.floating-tag');
        const tagRects = [];

        tags.forEach(tag => {
            let top, left;
            let tries = 0;
            let tagRect;

            do {
                top = Math.random() * (container.clientHeight - tag.clientHeight);
                left = Math.random() * (container.clientWidth - tag.clientWidth);
                tag.style.top = `${top}px`;
                tag.style.left = `${left}px`;
                tagRect = tag.getBoundingClientRect();
                tries++;
            } while (checkCollision(tagRect, tagRects) && tries < 100);

            tagRects.push(tagRect);

            // Set random animation duration
            tag.style.animationDuration = Math.random() * 15 + 5 + 's';
        });
    }, [allTags]);

    return (
        <div className="relative w-full h-[calc(100vh-80px)] p-4 overflow-hidden" ref={containerRef}>
            <div className="flex items-center pt-6 pb-3 pl-8">
                <h2 className="w-fit flex items-center gap-3 p-2 text-xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2">
                    <FaTags />
                    Tags
                </h2>
            </div>

            <div className="flex m-2 items-center gap-4 pl-8">
                <div className="text-akpica-white cursor-pointer underline underline-offset-4">
                    All Tags ({allTags.length}) {/* Display the count of unique tags */}
                </div>
            </div>

            <div className="absolute inset-0">
                {allTags.map((tag, index) => (
                    <Link
                        to={`/tags/${tag}`}
                        key={index}
                        className="floating-tag hover:z-50 uppercase inline-block bg-akpica-marco hover:bg-akpica-pastel font-akpica-heading font-[700] px-6 py-4"
                    >
                        {tag}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CategoriesDashboard;
