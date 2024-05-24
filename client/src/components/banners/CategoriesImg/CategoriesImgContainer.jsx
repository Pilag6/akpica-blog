import activity from "@assets/activity.jpg";
import oceanside from "@assets/oceanside.jpeg";
import funfacts from "@assets/fun-facts.jpeg";
import gaming from "@assets/gaming.jpg";
import health from "@assets/health.jpg";
import science from "@assets/science.jpg";
import sports from "@assets/sports.jpg";
import technology from "@assets/technology.jpg";
import TitleSections from "@components/miniComponents/TitleSections.jsx";
import CategoryImgCard from "./CategoryImgCard.jsx";
import { useContext } from "react";
import { PostContext } from "@contexts/PostContext.jsx";

const CategoriesImgContainer = () => {
    const { posts } = useContext(PostContext);

    const getTag = (index) => {
        return (
            posts && posts[index] && posts[index].tags && posts[index].tags[0]
        );
    };

    const categories = [
        { image: activity, tag: getTag(0) },
        { image: oceanside, tag: getTag(1) },
        { image: funfacts, tag: getTag(2) },
        { image: gaming, tag: getTag(3) },
        { image: health, tag: getTag(4) },
        { image: science, tag: getTag(5) },
        { image: sports, tag: getTag(6) },
        { image: technology, tag: getTag(7) }
    ];

    return (
        <div className="w-full flex items-center my-11 px-4">
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
