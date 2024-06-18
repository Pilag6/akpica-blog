// assets - note: import profile imgs from cloudinary

import akpicaus from "@assets/aboutus.jpg";

// Components
import Header from "@components/Header/Header";
import Footer from "@components/Footer";
import AboutUsCard from "@components/AboutUs/AboutUsCard";
import { AboutUsCards } from "@components/AboutUs/AboutInfo";

const AboutUs = () => {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center border border-gray-700 justify-center w-full min-h-screen  bg-gray-800  text-akpica-white ">
          <header
            className="h-[70vh] w-full flex items-center justify-center text-akpica-black text-4xl font-bold uppercase"
            style={{
              backgroundImage: `url(${akpicaus})`,
              backgroundSize: "cover",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
            }}
          >
            <span className="bg-akpica-marco/85 p-4 font-akpica-heading">
              About Akpica Team
            </span>
          </header>

          <div className="md:w-1/2 px-10 my-11 text-center md:text-xl">
            <p className="font-bold">The Web Developer&apos;s Handbook:</p>
            <p className="mb-2">Your ultimate guide to mastering web development.</p>
            <p>
              Explore the latest trends, tools, and techniques in web design and
              development. From beginner tutorials to advanced tips, discover
              how to create stunning, responsive websites and applications. Join
              our community of developers and stay ahead in the ever-evolving
              world of web development.
            </p>
          </div>

          <h2 className="text-center text-5xl font-[600] font-akpica-heading">
            Meet the Team
          </h2>

          <div className="flex flex-wrap justify-center my-11">
            {AboutUsCards.map((card, index) => (
              <AboutUsCard
                key={index}
                profilepicture={card.profilepicture}
                name={card.name}
                text={card.text}
                portfolioImg={card.portfolioImg}
                portfolioUrl={card.portfolioUrl}
                github={card.github}
                linkedin={card.linkedin}
              />
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
};

export default AboutUs;
