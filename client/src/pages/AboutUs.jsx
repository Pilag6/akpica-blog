

import profileakiko from "@assets/akiko.jpg";
import profilepila from "@assets/Pila.jpg";
import profilecarlos from "@assets/carlos.jpg";
import akikoportfolio from "@assets/akikoportfolio.png";
import pilaportfolio from "@assets/pilaportfolio.png";
import carlosportfolio from "@assets/carlosportfolio.png";

import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import Header from "@components/Header/Header";
import PortfolioCard from "@components/PortfolioCard/PortfolioCard";

const AboutUs = () => {


  return (<>
    <div className="flex flex-col items-center border justify-center w-full h-screen  bg-gray-800 border text-akpica-white font-akpica-heading">
      <Header />
      <h1 className="text-4xl font-bold mb-8">About Akpica Team</h1>
      <div className="flex flex-wrap justify-center">

        <div className="w-96 m-4 flex flex-col items-center bg-gray-800 border border-akpica-green">
          <div className="mb-8 mt-4 w-32 h-32">
            <img
              src={profileakiko}
              alt="profilepicture"
              className="w-full h-full rounded-full object-cover"
            />
            {/* need to learn how to fetch the picture from uploads */}
          </div>
          <h2 className="mb-4 text-3xl font-semibold">Akiko Luka</h2>
          <p className="mb-4 font-semibold text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas,
            quaerat. Nostrum doloremque doloribus debitis dolores soluta,
            corrupti asperiores corporis quam? Ex repudiandae quasi nemo optio
            nihil pariatur quisquam atque officiis commodi animi, inventore
            doloribus delectus eos laudantium ipsa reprehenderit. Earum quasi
            porro excepturi vel unde quas saepe provident quidem totam?
          </p>
          <h3 className="mb-4 text-2xl font-bold">Personal Portfolio</h3>
          <div>
            <PortfolioCard
            image={akikoportfolio}
            imageUrl={"https://akikoluka.netlify.app/"}
            />
          </div>
          <div className="flex flex-row flex-wrap">
          <div className="flex gap-3 mb-4 ">
                <a
                  href="#"
                  className="border rounded-full text-2xl flex items-center justify-center transition-all duration-500 text-akpica-white border-gray-500/30 bg-transparent hover:border-akpica-white hover:bg-white hover:text-gray-950 focus:text-white h-11 w-11"
                >
                  <FaGithubSquare />
                </a>
                <a
                  href="#"
                  className="border rounded-full text-2xl flex items-center justify-center transition-all duration-500 text-akpica-white border-gray-500/30 bg-transparent hover:border-white hover:bg-white hover:text-gray-950 focus:text-white h-11 w-11"
                >
                  <FaLinkedin />
                </a>
               
              </div>

          </div>
        </div>

        <div className="w-96 m-4 flex flex-col items-center bg-gray-800 border border-akpica-green">
          <div className="mb-8 mt-4 w-32 h-32">
            <img
              className="w-full h-full rounded-full object-cover"
              src={profilepila}
              alt="profilepicture"
            />
          </div>
          <h2 className="mb-4 text-3xl font-semibold">Pila Gonzalez</h2>
          <p className="mb-4 font-semibold text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas,
            quaerat. Nostrum doloremque doloribus debitis dolores soluta,
            corrupti asperiores corporis quam? Ex repudiandae quasi nemo optio
            nihil pariatur quisquam atque officiis commodi animi, inventore
            doloribus delectus eos laudantium ipsa reprehenderit. Earum quasi
            porro excepturi vel unde quas saepe provident quidem totam?
          </p>
          <h3 className="mb-4 text-2xl font-bold">Personal Portfolio</h3>
          <div>
            <PortfolioCard
            image={pilaportfolio}
            imageUrl={"https://piladev.netlify.app/"}
            />
          </div>
          <div className="flex flex-row flex-wrap">
          <div className="flex gap-3 mb-4 ">
                <a
                  href="#"
                  className="border rounded-full text-2xl flex items-center justify-center transition-all duration-500 text-akpica-white border-gray-500/30 bg-transparent hover:border-akpica-white hover:bg-white hover:text-gray-950 focus:text-white h-11 w-11"
                >
                  <FaGithubSquare />
                </a>
                <a
                  href="#"
                  className="border rounded-full text-2xl flex items-center justify-center transition-all duration-500 text-akpica-white border-gray-500/30 bg-transparent hover:border-white hover:bg-white hover:text-gray-950 focus:text-white h-11 w-11"
                >
                  <FaLinkedin />
                </a>
               
              </div>

          </div>
        </div>

        <div className="w-96 m-4 flex flex-col items-center bg-gray-800 border border-akpica-green">
          <div className="mb-8 mt-4 w-32 h-32">
            <img
              className="w-full h-full rounded-full object-cover"
              src={profilecarlos}
              alt="profilepicture"
            />
          </div>
          <h2 className="mb-4 text-3xl font-semibold ">Carlos Sousa</h2>
          <p className="mb-4 font-semibold text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum quis
            quibusdam rerum ipsa. Dicta a atque rem necessitatibus id alias
            omnis ex, nesciunt blanditiis consectetur, ipsum placeat adipisci
            est exercitationem ratione rerum deserunt voluptates! Distinctio rem
            recusandae enim deserunt corporis laboriosam, quod voluptatem,
            tempora, iste quasi consectetur debitis provident blanditiis.
          </p>
          <h3 className="mb-4 text-2xl font-bold">See more about on:</h3>
          <div>
            <PortfolioCard
            image={carlosportfolio}
            imageUrl={"https://carlos-sousa.netlify.app/"}
            />
          </div>
          <div className="flex flex-row flex-wrap">
          <div className="flex gap-3 mb-4 ">
                <a
                  href="#"
                  className="border rounded-full text-2xl flex items-center justify-center transition-all duration-500 text-akpica-white border-gray-500/30 bg-transparent hover:border-akpica-white hover:bg-white hover:text-gray-950 focus:text-white h-11 w-11"
                >
                  <FaGithubSquare />
                </a>
                <a
                  href="#"
                  className="border rounded-full text-2xl flex items-center justify-center transition-all duration-500 text-akpica-white border-gray-500/30 bg-transparent hover:border-white hover:bg-white hover:text-gray-950 focus:text-white h-11 w-11"
                >
                  <FaLinkedin />
                </a>
               
              </div>

          </div>
         
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutUs;
