// assets - note: import profile imgs from cloudinary

import akpicaus from "@assets/akpicaDefault.jpg";

// Components
import Header from "@components/Header/Header";
import Footer from "@components/Footer";
import AboutUsCard from "@components/AboutUs/AboutUsCard";
import { AboutUsCards } from "@components/AboutUs/AboutInfo";

const AboutUs = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center border border-gray-700 justify-center w-full min-h-screen  bg-gray-800  text-akpica-white font-akpica-heading">
                <header
                    className="h-[40vh] w-full flex items-center justify-center text-akpica-white text-4xl font-bold uppercase"
                    style={{
                        backgroundImage: `url(${akpicaus})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                >
                    <span className="bg-akpica-marco/85 p-4">
                        About Akpica Team
                    </span>
                </header>

                <div className="w-1/2 my-11">
                    <p className="text-xl text-center">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Voluptas, quaerat. Nostrum doloremque doloribus debitis
                        dolores soluta, corrupti asperiores corporis quam? Ex
                        repudiandae quasi nemo optio nihil pariatur quisquam
                        atque officiis commodi animi, inventore doloribus delectus
                        eos laudantium ipsa reprehenderit. Earum quasi porro
                        excepturi vel unde quas saepe provident quidem totam?
                    </p>
                </div>

                <h2 className="text-center text-5xl font-[600]">The Team</h2>

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
