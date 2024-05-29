import React from "react";
import profileakiko from "@assets/akiko.jpg";
import profilepila from "@assets/Pila.jpg";
import profilecarlos from "@assets/carlos.jpg";

const AboutUs = () => {
  return (
    <>
      <div className="flex border justify-center w-full h-screen bg-akpica-black text-akpica-white">
      <div className="w-[1200px]flex flex-col flex-wrap justify-center">
        <h1 className="text-3xl font-bold flex flex-nowrap mb-8 justify-center">About Akpica Team</h1>
        <div className="flex flex-wrap justify-center " >
          <div className="m-4 flex flex-col items-center w-[250px] h-[400px] p-4 bg-gray-800">
            <div className="mb-8 mt-4 w-32 h-32">
              <img
                src={profileakiko}
                alt="profilepicture"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h2 className="mb-4 text-xl font-semibold">Akiko Luka</h2>
            <p className="flex-grow mb-4 font-semi-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam inventore harum rerum animi vel, veritatis suscipit? Aut eaque iure rem necessitatibus quos sunt similique amet sit. Rem impedit vel iusto iste, quidem ratione totam nisi nesciunt a temporibus, accusamus odio cupiditate necessitatibus at tempora, eius voluptates! Esse distinctio cum expedita!</p>
            <h3 className="mb-4 font-bold">projects</h3>
            <div></div>
          </div>

          <div className="m-4 flex flex-col  items-center w-[250px] h-[400px]">
            <div className="mb-8 mt-4 w-32 h-32">
              <img
                className="w-full h-full rounded-full object-cover"
                src={profilepila}
                alt="profilepicture"
              />
            </div>
            <h2 className="mb-4 text-xl font-semibold">Pila Gonzalez</h2>
            <p className="mb-4 font-semibold">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, quaerat. Nostrum doloremque doloribus debitis dolores soluta, corrupti asperiores corporis quam? Ex repudiandae quasi nemo optio nihil pariatur quisquam atque officiis commodi animi, inventore doloribus delectus eos laudantium ipsa reprehenderit. Earum quasi porro excepturi vel unde quas saepe provident quidem totam?</p>
            <h3 className="mb-4 font-bold">projects</h3>
          </div>

            <div className="m-4 flex flex-col  items-center w-[250px] h-[400px]">
            <div className="mb-8 mt-4 w-32 h-32">
              <img
                className="w-full h-full rounded-full object-cover"
                src={profilecarlos}
                alt="profilepicture"
              />
            </div>
            <h2 className="mb-4 text-xl font-semibold">Carlos Sousa</h2>
            <p className="mb-4 font-semibold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum quis quibusdam rerum ipsa. Dicta a atque rem necessitatibus id alias omnis ex, nesciunt blanditiis consectetur, ipsum placeat adipisci est exercitationem ratione rerum deserunt voluptates! Distinctio rem recusandae enim deserunt corporis laboriosam, quod voluptatem, tempora, iste quasi consectetur debitis provident blanditiis.</p>
            <h3 className="mb-4 font-bold">projects</h3>
            </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
