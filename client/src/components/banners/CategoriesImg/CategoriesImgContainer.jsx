

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

const CategoriesImg = () => {
  return (
    <div className="w-full flex items-center my-11 px-4">
      <div className="w-[1200px] mx-auto flex flex-wrap gap-6">
        <TitleSections titleSection="CATEGORIES" />
        <div className="flex flex-wrap justify-between md:gap-3 gap-1 gap-y-5">
          <CategoryImgCard Bgimage={activity} title="ACTIVITY" />
          <CategoryImgCard Bgimage={oceanside} title="BUSINESS" />
          <CategoryImgCard Bgimage={funfacts} title="FUN FACTS" />
          <CategoryImgCard Bgimage={gaming} title="GAMING" />
          <CategoryImgCard Bgimage={health} title="HEALTH" />
          <CategoryImgCard Bgimage={science} title="SCIENCE" />
          <CategoryImgCard Bgimage={sports} title="SPORTS" />
          <CategoryImgCard Bgimage={technology} title="TECHNOLOGY" />
          
        </div>
      </div>
    </div>




    // <div className="main-container">
    //   <div className="second-container">
    //     <div className="third-container">
    //       <h2>CATEGORY</h2>
    //     </div>
    //     <div className="img-container">
    //       <article className="img-one" >
    //         <h3>ACTIVITY</h3>
    //       </article>
    //       <article className="img-two" >
    //         <h3>BUSINESS</h3>
    //       </article>
    //       <article className="img-three">
    //         <h3>FUN FACTS</h3>
    //       </article>
    //       <article className="img-four">
    //         <h3>GAMING</h3>
    //       </article>
    //       <article className="img-five">
    //         <h3>HEALTH</h3>
    //       </article>
    //       <article className="img-six">
    //         <h3>SCIENCE</h3>
    //       </article>
    //       <article className="img-seven">
    //         <h3>SPORTS</h3>
    //       </article>
    //       <article className="img-eight">
    //         <h3>TECHNOLOGY</h3>
    //       </article>
    //     </div>
    //   </div>
    // </div>
  );
};
export default CategoriesImg;
