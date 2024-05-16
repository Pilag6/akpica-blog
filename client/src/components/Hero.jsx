import hero from "../assets/hero.avif";
import { CiCalendarDate } from "react-icons/ci";

const Hero = () => {
  return (
    <div
      className="w-full h-[65vh]"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col justify-center h-full max-w-[1200px] mx-auto">
        <p className="bg-akpica-tomato w-fit px-2 py-[2px] text-sm font-semibold text-akpica-white">
          HEALTH
        </p>

        <div className="md:w-1/2">
          <h1 className="w-fit decoration-clone text-5xl text-akpica-black bg-akpica-white px-5 leading-snug inline uppercase font-[700] font-akpica-heading my-4">
            17 Best Developer Productivity Tools to Try
          </h1>
        </div>
        {/* w-fit decoration-clone text-5xl bg-akpica-white px-5 leading-[65px] uppercase font-[700] font-akpica-heading my-4 */}

        {/* <div className="p-24 max-w-6xl">
                    <span className="text-6xl font-semibold text-white leading-snug bg-gradient-to-r from-blue-500 to-transparent">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nisi ducimus repudiandae ab fugiat repellat sunt! Non numquam quae eligendi sed earum nihil cumque, eius inventore enim suscipit exercitationem cum?
                    </span>
                </div> */}

        <div className="flex items-center gap-2 text-akpica-white">
          <img src="/favicon.png" alt="" className="w-5 h-5" />
          <p>Sendra</p>
          <div className="flex items-center gap-1">
            <CiCalendarDate />

            <p className="font-akpica-heading font-[500]">Apr 23, 2018</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
