import { useContext, useEffect, useRef, useState } from "react";
import { PostContext } from "@contexts/PostContext"; // Adjust the import path according to your project structure
import { Link } from "react-router-dom";
import { FaTags, FaRandom } from "react-icons/fa";

function CategoriesDashboard() {
    const { posts } = useContext(PostContext);

    // Extract unique tags from posts and count their occurrences
    const tagCounts = posts.reduce((acc, post) => {
        post.tags.forEach((tag) => {
            if (acc[tag]) {
                acc[tag]++;
            } else {
                acc[tag] = 1;
            }
        });
        return acc;
    }, {});

    // Convert the tagCounts object to an array of [tag, count] pairs
    const initialTags = Object.entries(tagCounts);

    // State variable for tags order
    const [allTags, setAllTags] = useState(initialTags);

    const containerRef = useRef(null);

    const checkCollision = (tagRect, otherRects) => {
        return otherRects.some((otherRect) => {
            return !(
                tagRect.right < otherRect.left ||
                tagRect.left > otherRect.right ||
                tagRect.bottom < otherRect.top ||
                tagRect.top > otherRect.bottom
            );
        });
    };

    const positionTags = () => {
        const container = containerRef.current;
        const tags = container.querySelectorAll(".floating-tag");
        const tagRects = [];

        tags.forEach((tag) => {
            let top, left;
            let tries = 0;
            let tagRect;

            do {
                top = Math.random() * (container.clientHeight - tag.clientHeight);
                left = Math.random() * (container.clientWidth - tag.clientWidth);
                tag.style.top = `${top}px`;
                tag.style.left = `${left}px`;
                tagRect = {
                    top: top,
                    left: left,
                    right: left + tag.clientWidth,
                    bottom: top + tag.clientHeight
                };
                tries++;
                if (tries > 180) {
                    break; // prevent infinite loop
                }
            } while (checkCollision(tagRect, tagRects));

            tagRects.push(tagRect);

            // Set random animation duration
            tag.style.animationDuration = Math.random() * 5 + 5 + "s";
        });
    };

    useEffect(() => {
        positionTags();
    }, [allTags]);

    const reorderTags = () => {
        const shuffledTags = [...allTags].sort(() => Math.random() - 0.5);
        setAllTags(shuffledTags);
        positionTags();
    };

    // Get the minimum and maximum counts
    const counts = allTags.map(([tag, count]) => count);
    const minCount = Math.min(...counts);
    const maxCount = Math.max(...counts);

    // Function to calculate font size based on count
    const calculateFontSize = (count) => {
        const minFontSize = 16; // Minimum font size
        const maxFontSize = 48; // Maximum font size
        if (maxCount === minCount) {
            return `${maxFontSize}px`; // All tags have the same size if counts are equal
        }
        return `${((count - minCount) / (maxCount - minCount)) * (maxFontSize - minFontSize) + minFontSize}px`;
    };

    return (
        <div
            className="relative w-full h-[calc(100vh-80px)] p-2 overflow-hidden"
            ref={containerRef}
        >
            <div className="flex items-center pt-4 pb-3 pl-4 z-40">
                <h2 className="w-fit flex items-center gap-3 p-2 text-xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2 z-40">
                    <FaTags />
                    Tags
                </h2>
                <button
                    onClick={() => {
                        reorderTags();
                        positionTags();
                    }}
                    className="ml-4 p-2 hover:bg-akpica-marco cursor-pointer border text-white transition-all z-40"
                >
                    <FaRandom />
                </button>
            </div>

            <div className="flex m-2 items-center gap-4 pl-4 z-50">
                <div className="text-akpica-white cursor-pointer underline underline-offset-4">
                    All Tags ({allTags.length}){" "}
                    {/* Display the count of unique tags */}
                </div>
            </div>

            <div className="absolute inset-0 z-30">
                {allTags.map(([tag, count], index) => (
                    <Link
                        to={`/tags/${tag}`}
                        key={index}
                        className="floating-tag z-30 hover:z-40 uppercase inline-block bg-akpica-marco hover:bg-akpica-pastel font-akpica-heading font-[700] px-5 py-3"
                        style={{ fontSize: calculateFontSize(count), position: 'absolute' }}
                    >
                        {tag} ({count})
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CategoriesDashboard;
