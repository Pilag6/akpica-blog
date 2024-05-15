/* eslint-disable react/prop-types */
import CardHero from "./CardHero.jsx";

import bunReact from "@assets/bun-react.webp";
import tailwindImg from "@assets/tailwind.webp";
import astroImg from "@assets/astro.webp";

import akiko from "../../../../server/uploads/akiko.jpg";
import carlos from "../../../../server/uploads/carlos.jpg";
import pila from "../../../../server/uploads/Pila.jpg";

const CardsHero = () => {
    return (
        <div className="w-full">
            <div className="max-w-[1200px] mx-auto flex justify-center items-center flex-wrap gap-6 -mt-16">
                

                <CardHero bgImg={bunReact} tag={"REACT"} title={"Getting Started with Bun for React Developers"} author={"Carlos"} avatar={carlos} date={"May 23, 2024"}/>

                <CardHero bgImg={tailwindImg} tag={"TAILWIND"} title={"Build a Blog App Project Using Tailwind CSS"} author={"Akiko"} avatar={akiko} date={"May 13, 2024"}/>

                <CardHero bgImg={astroImg} tag={"ASTRO"} title={"Building a simple but scalable blog using Astro"} author={"Pila"} avatar={pila} date={"May 16, 2024"}/>

                
            </div>
        </div>
    );
};
export default CardsHero;
