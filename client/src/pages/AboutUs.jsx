// assets - note: import profile imgs from cloudinary
import profileakiko from "@assets/akiko.jpg";
import profilepila from "@assets/Pila.jpg";
import profilecarlos from "@assets/carlos.jpg";
import akikoportfolio from "@assets/akikoportfolio.png";
import pilaportfolio from "@assets/pilaportfolio.png";
import carlosportfolio from "@assets/carlosportfolio.png";
import akpicaus from "@assets/akpicaDefault.jpg";

import Header from "@components/Header/Header";
import Footer from "@components/Footer";
import AboutUsCard from "@components/AboutUs/AboutUsCard";

const AboutUs = () => {
  return (
    <>
      <div className="flex flex-col items-center border border-gray-700 justify-center w-full min-h-screen  bg-gray-800  text-akpica-white font-akpica-heading">
        <Header />
        <header
          className="h-[40vh] w-full flex items-center justify-center text-akpica-white text-4xl font-bold uppercase"
          style={{
            backgroundImage: `url(${akpicaus})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <span className="bg-akpica-marco/85 p-4">About Akpica Team</span>
        </header>
        <div className="flex flex-wrap justify-center my-11">

          <AboutUsCard
          
            profilepicture={profileakiko}
            name={"Akiko Luka"}
            text={
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, quaerat. Nostrum doloremque doloribus debitis dolores soluta, corrupti asperiores corporis quam? Ex repudiandae quasi nemo optio nihil pariatur quisquam atque officiis commodi animi, inventore doloribus delectus eos laudantium ipsa reprehenderit. Earum quasi porro excepturi vel unde quas saepe provident quidem totam?"
            }
            portfolioImg={akikoportfolio}
            portfolioUrl={"https://akikoluka.netlify.app/"}
            github={"https://github.com/akiko-luka"}
            linkedin={"https://www.linkedin.com/in/akiko-luka/"}
          />

          <AboutUsCard
            profilepicture={profilepila}
            name={"Pila Gonzalez"}
            text={
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, quaerat. Nostrum doloremque doloribus debitis dolores soluta, corrupti asperiores corporis quam? Ex repudiandae quasi nemo optio nihil pariatur quisquam atque officiis commodi animi, inventore doloribus delectus eos laudantium ipsa reprehenderit. Earum quasi porro excepturi vel unde quas saepe provident quidem totam?"
            }
            portfolioImg={pilaportfolio}
            portfolioUrl={"https://piladev.netlify.app/"}
            github={"https://github.com/Pilag6"}
            linkedin={"https://www.linkedin.com/in/pila-gonzalez/"}
          />
          <AboutUsCard
            profilepicture={profilecarlos}
            name={"Carlos Sousa"}
            text={
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, quaerat. Nostrum doloremque doloribus debitis dolores soluta, corrupti asperiores corporis quam? Ex repudiandae quasi nemo optio nihil pariatur quisquam atque officiis commodi animi, inventore doloribus delectus eos laudantium ipsa reprehenderit. Earum quasi porro excepturi vel unde quas saepe provident quidem totam?"
            }
            portfolioImg={carlosportfolio}
            portfolioUrl={"https://carlos-sousa.netlify.app/"}
            github={"https://github.com/Cmbs86"}
            linkedin={"https://www.linkedin.com/in/carlos-brito-de-sousa/"}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
