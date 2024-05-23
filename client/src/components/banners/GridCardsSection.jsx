import CardHero from "@components/CardsHero/CardHero.jsx";


import { useContext } from "react";
import { PostContext } from "@contexts/PostContext.jsx";

//backend URL
import BACKEND_URL from "@utils/backendUrl.js";

const cardData = [
    {
        
        gridClasses: "col-span-4 md:col-span-2 row-span-2"
    },
    {
        
        gridClasses: "col-span-4 md:col-span-2 row-span-1"
    },
    {
        
        gridClasses: "col-span-4 md:col-span-1 row-span-1"
    },
    {
        
        gridClasses: "col-span-4 md:col-span-1 row-span-1"
    }
];

const GridCardsSection = () => {
    let { posts } = useContext(PostContext);

    posts = posts.slice(0, 4);

    return (
        <div className="grid grid-cols-4 md:grid-cols-4 gap-x-4 gap-y-2 my-11 h-auto md:h-[75vh] px-4">
            {posts && posts.map((card, index) => (
                <div key={card._id} className={cardData[index].gridClasses}>
                    <CardHero
                    key={card._id}
                        bgImg={`${BACKEND_URL}/posts/photo/${encodeURIComponent(
                            card.title
                        )}?${new Date().getTime()}`}
                        tagName={card.tags}
                        title={card.title}
                        author={card.author.username}
                        avatar={`${BACKEND_URL}/photo/${
                            card.author.username
                        }?${new Date().getTime()}`}
                        date={new Date(card.date).toDateString()}
                        colorTag="bg-akpica-marco text-akpica-black"
                        sizeTag="text-md"
                        link={`/${card._id}`}
                        linkTag={`/tags/${card.tags}`}
                        
                    />
                </div>
            ))}
        </div>
    );
};

export default GridCardsSection;
