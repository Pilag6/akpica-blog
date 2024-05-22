import CardHero from "@components/CardsHero/CardHero.jsx";

import bunReact from "@assets/bun-react.webp";
import tailwindImg from "@assets/tailwind.webp";
import astroImg from "@assets/astro.webp";
import authReact from "@assets/authReact.webp";

import akiko from "../../../../server/uploads/akiko.jpg";
import carlos from "../../../../server/uploads/carlos.jpg";
import pila from "../../../../server/uploads/Pila.jpg";

const cardData = [
    {
        bgImg: authReact,
        tagName: "REACT",
        title: "How to Implement Authorization in React",
        author: "Carlos",
        avatar: carlos,
        date: "May 23, 2024",
        gridClasses: "col-span-4 md:col-span-2 row-span-2"
    },
    {
        bgImg: tailwindImg,
        tagName: "TAILWIND",
        title: "Build a Blog App Project Using Tailwind CSS",
        author: "Akiko",
        avatar: akiko,
        date: "May 13, 2024",
        gridClasses: "col-span-4 md:col-span-2 row-span-1"
    },
    {
        bgImg: astroImg,
        tagName: "ASTRO",
        title: "Building a simple but scalable blog using Astro",
        author: "Pila",
        avatar: pila,
        date: "May 16, 2024",
        gridClasses: "col-span-4 md:col-span-1 row-span-1"
    },
    {
        bgImg: bunReact,
        tagName: "REACT",
        title: "Getting Started with Bun for React Developers",
        author: "Carlos",
        avatar: carlos,
        date: "May 23, 2024",
        gridClasses: "col-span-4 md:col-span-1 row-span-1"
    }
];

const GridCardsSection = () => {
    return (
        <div className="grid grid-cols-4 md:grid-cols-4 gap-x-4 gap-y-2 my-11 h-auto md:h-[75vh] px-4">
            {cardData.map((card, index) => (
                <div key={index} className={card.gridClasses}>
                    <CardHero
                        bgImg={card.bgImg}
                        tagName={card.tagName}
                        title={card.title}
                        author={card.author}
                        avatar={card.avatar}
                        date={card.date}
                        colorTag="bg-akpica-marco text-akpica-black"
                        sizeTag="text-md"
                    />
                </div>
            ))}
        </div>
    );
};

export default GridCardsSection;
