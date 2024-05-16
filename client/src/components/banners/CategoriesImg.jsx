// import "./categoriesImg.css";
import { MdHeight } from "react-icons/md";
import hero from "../../assets/hero.avif";

const CategoriesImg = () => {
  return (
    <div className="w-full h-[65vh] flex items-center">
      <div className="w-[1200px] mx-auto flex flex-wrap">
        <div className="w-full h-full flex flex-col items-center mb-10 font-semibold ">
          <h2 className="w-full mt-auto mb-auto text-2x1 font-rajdhani">CATEGORY</h2>
        </div>
        <div className="flex flex-wrap justify-between gap-3">
          <article className="flex justify-center items-center text-center w-[270px] h-[100px]" style={{
                backgroundImage: `url(${hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
                
            }}  >
            <h3 className="text-white font-rajdhani text-4x1 font-bold tracking wide">ACTIVITY</h3>
          </article>
          <article className="flex justify-center items-center text-center w-[270px] h-[100px]" style={{
                backgroundImage: `url(${hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
                
            }} >
            <h3 className="text-white font-rajdhani text-4x1 font-bold tracking wide">BUSINESS</h3>
          </article>
          <article className="flex justify-center items-center text-center w-[270px] h-[100px]" style={{
                backgroundImage: `url(${hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
                
            }}>
            <h3 className="text-white font-rajdhani text-4x1 font-bold tracking wide">FUN FACTS</h3>
          </article>
          <article className="flex justify-center items-center text-center w-[270px] h-[100px]" style={{
                backgroundImage: `url(${hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
                
            }}>
            <h3 className="text-white font-rajdhani text-4x1 font-bold tracking wide">GAMING</h3>
          </article>
          <article className="flex justify-center items-center text-center w-[270px] h-[100px]" style={{
                backgroundImage: `url(${hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
                
            }}>
            <h3 className="text-white font-rajdhani text-4x1 font-bold tracking wide">HEALTH</h3>
          </article>
          <article className="flex justify-center items-center text-center w-[270px] h-[100px]" style={{
                backgroundImage: `url(${hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
                
            }}>
            <h3 className="text-white font-rajdhani text-4x1 font-bold tracking wide">SCIENCE</h3>
          </article>
          <article className="flex justify-center items-center text-center w-[270px] h-[100px]" style={{
                backgroundImage: `url(${hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
                
            }}>
            <h3 className="text-white font-rajdhani text-4x1 font-bold tracking wide">SPORTS</h3>
          </article>
          <article className="flex justify-center items-center text-center w-[270px] h-[100px]" style={{
                backgroundImage: `url(${hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
                
            }}>
            <h3 className="text-white font-rajdhani text-4x1 font-bold tracking wide">TECHNOLOGY</h3>
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
