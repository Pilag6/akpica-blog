// import "./categoriesImg.css";

import hero from "../../assets/hero.avif";
import activity from "../../assets/activity.jpg";
import oceanside from "../../assets/oceanside.jpeg";
import funfacts from "../../assets/fun-facts.jpeg";
import gaming from "../../assets/gaming.jpg";
import health from "../../assets/health.jpg";
import science from "../../assets/science.jpg";
import sports from "../../assets/sports.jpg";
import technology from "../../assets/technology.jpg";

const CategoriesImg = () => {
  return (
    <div className="w-full h-[65vh] flex items-center">
      <div className="w-[1200px] mx-auto flex flex-wrap">
        <div className="w-full h-full flex flex-col items-center mb-5 font-semibold ">
          <h2 className="w-full mt-auto mb-auto text-3xl font-[700] font-akpica-heading">CATEGORY</h2>
        </div>
        <div className="flex flex-wrap justify-between gap-3">
          <article className="flex justify-center items-center text-center w-[290px] h-[130px]" style={{
                backgroundImage: `url(${activity})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
                
            }}  >
            <h3 className="text-white text-xl font-[700] font-akpica-heading tracking wide">ACTIVITY</h3>
          </article>
          <article className="flex justify-center items-center text-center w-[290px] h-[130px]" style={{
                backgroundImage: `url(${oceanside})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
                
            }} >
            <h3 className="text-white text-xl font-[700] font-akpica-heading tracking wide">BUSINESS</h3>
          </article>
          <article className="flex justify-center items-center text-center w-[290px] h-[130px]" style={{
                backgroundImage: `url(${funfacts})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
                
            }}>
            <h3 className="text-white text-xl font-[700] font-akpica-heading tracking wide">FUN FACTS</h3>
          </article>
          <article className="flex justify-center items-center text-center w-[290px] h-[130px]" style={{
                backgroundImage: `url(${gaming})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
                
            }}>
            <h3 className="text-white text-xl font-[700] font-akpica-heading tracking wide">GAMING</h3>
          </article>
          <article className="flex justify-center items-center text-center w-[290px] h-[130px]" style={{
                backgroundImage: `url(${health})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
                
            }}>
            <h3 className="text-white text-xl font-[700] font-akpica-heading tracking wide">HEALTH</h3>
          </article>
          <article className="flex justify-center items-center text-center w-[290px] h-[130px]" style={{
                backgroundImage: `url(${science})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
                
            }}>
            <h3 className="text-white text-xl font-[700] font-akpica-heading tracking wide">SCIENCE</h3>
          </article>
          <article className="flex justify-center items-center text-center w-[290px] h-[130px]" style={{
                backgroundImage: `url(${sports})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
                
            }}>
            <h3 className="text-white text-xl font-[700] font-akpica-heading tracking wide">SPORTS</h3>
          </article>
          <article className="flex justify-center items-center text-center w-[290px] h-[130px]" style={{
                backgroundImage: `url(${technology})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
                
            }}>
            <h3 className="text-white text-xl font-[700] font-akpica-heading tracking wide">TECHNOLOGY</h3>
          </article>
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
