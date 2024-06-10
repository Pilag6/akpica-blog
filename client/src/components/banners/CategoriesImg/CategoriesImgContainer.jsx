import { useContext } from "react";

// Images
import category1 from "@assets/category-1.webp"; // Node
import category2 from "@assets/category-2.webp"; // css
import category3 from "@assets/category-3.webp";
import category4 from "@assets/category-4.webp";
import category5 from "@assets/category-5.webp";
import category6 from "@assets/category-6.webp";
import category7 from "@assets/category-7.webp";
import category8 from "@assets/category-8.webp";

import TitleSections from "@components/miniComponents/TitleSections.jsx";
import CategoryImgCard from "./CategoryImgCard.jsx";

// Context
import { PostContext } from "@contexts/PostContext.jsx";

const CategoriesImgContainer = () => {
    const { posts } = useContext(PostContext);

    // Sort posts by date from oldest to newest
    const sortedPosts = posts.sort((a, b) => new Date(a.date) - new Date(b.date));

    const getTag = (index) => {
        return (
            sortedPosts && sortedPosts[index] && sortedPosts[index].tags && sortedPosts[index].tags[0]
        );
    };

    const uniqueTags = new Set();
    const categories = [
        { image: category1, tag: getTag(18) },
        { image: category2, tag: getTag(1) },
        { image: category3, tag: getTag(2) },
        { image: category6, tag: getTag(3) },
        { image: category5, tag: getTag(9) },
        { image: category4, tag: getTag(5) },
        { image: category7, tag: getTag(6) },
        { image: category8, tag: getTag(10) }
    ].filter(category => {
        if (category.tag && !uniqueTags.has(category.tag)) {
            uniqueTags.add(category.tag);
            return true;
        }
        return false;
    });

    return (
        <div className="w-full flex items-center my-20 px-4">
            <div className="w-[1200px] mx-auto flex flex-wrap gap-6">
                <TitleSections titleSection="CATEGORIES" />
                <div className="flex flex-wrap justify-between md:gap-3 gap-1 gap-y-5 uppercase">
                    {categories.map((category, index) => (
                        <CategoryImgCard
                            key={index}
                            Bgimage={category.image}
                            title={category.tag}
                            link={`/tags/${category.tag}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoriesImgContainer;
