import hero from "../assets/hero.avif";

import CardTag from "@components/miniComponents/cardTag.jsx";
import AvatarDate from "@components/miniComponents/AuthorDate.jsx";

const Hero = () => {
    return (
        <div
            className="w-full h-[65vh] p-6"
            style={{
                backgroundImage: `url(${hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="flex flex-col justify-center h-full max-w-[1200px] mx-auto">
                
                <CardTag tag="PRODUCTIVITY" color="bg-akpica-carlo text-akpica-white" size="text-sm" />

                <div className="md:w-1/2 p-2">
                    <h1 className="w-fit decoration-clone text-5xl bg-akpica-white px-5 leading-snug inline uppercase font-[700] font-akpica-heading my-4 text-akpica-black">
                        17 Best Developer Productivity Tools to Try
                    </h1>
                </div>

                <AvatarDate avatar={"/favicon.png"} author={"Akpica"} date={"Apr, 18"}/>
            </div>
        </div>
    );
};
export default Hero;
