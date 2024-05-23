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



const CategoriesImg = () => {
    const { posts } = useContext(PostContext);

    const getTag = (index) => {
        return posts && posts[index] && posts[index].tags && posts[index].tags[0];
    };

    return (
        <div className="w-full flex items-center my-11 px-4">
            <div className="w-[1200px] mx-auto flex flex-wrap gap-6">
                <TitleSections titleSection="CATEGORIES" />
                <div className="flex flex-wrap justify-between md:gap-3 gap-1 gap-y-5 uppercase">
                    <CategoryImgCard Bgimage={activity} title={getTag(0)} link={`/${getTag(0)}`} />
                    <CategoryImgCard Bgimage={oceanside} title={getTag(1)} link={`/${getTag(1)}`}  />
                    <CategoryImgCard Bgimage={funfacts} title={getTag(2)} link={`/${getTag(2)}`} />
                    <CategoryImgCard Bgimage={gaming} title={getTag(3)} link={`/${getTag(3)}`} />
                    <CategoryImgCard Bgimage={health} title={getTag(0)} link={`/${getTag(0)}`} />
                    <CategoryImgCard Bgimage={science} title={getTag(1)} link={`/${getTag(1)}`} />
                    <CategoryImgCard Bgimage={sports} title={getTag(3)} link={`/${getTag(3)}`} />
                    <CategoryImgCard Bgimage={technology} title={getTag(3)} link={`/${getTag(3)}`} />
                </div>
            </div>
        </div>
    );
};

export default CategoriesImg;
