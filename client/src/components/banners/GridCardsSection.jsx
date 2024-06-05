import { useContext } from "react";
import CardHero from "@components/CardsHero/CardHero.jsx";
import BACKEND_URL from "@utils/backendUrl.js";
import { PostContext } from "@contexts/PostContext.jsx";

const cardData = [
    { gridClasses: "col-span-4 md:col-span-2 row-span-2" },
    { gridClasses: "col-span-4 md:col-span-2 row-span-1" },
    { gridClasses: "col-span-4 md:col-span-1 row-span-1" },
    { gridClasses: "col-span-4 md:col-span-1 row-span-1" }
];

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const GridCardsSection = () => {
    let { posts } = useContext(PostContext);

    // Shuffle the posts array and take the first 4 elements
    const shuffledPosts = shuffleArray([...posts]).slice(0, 4);

    return (
        <div className="grid grid-cols-4 md:grid-cols-4 gap-x-4 gap-y-2 my-20 h-auto md:h-[75vh] px-4">
            {shuffledPosts && shuffledPosts.map((card, index) => (
                <div key={card._id} className={cardData[index].gridClasses}>
                    <CardHero
                        bgImg={`${BACKEND_URL}/posts/photo/${encodeURIComponent(
                            card.title
                        )}?${new Date().getTime()}`}
                        tagName={card.tags[0]}
                        title={card.title}
                        author={card.author.username}
                        avatar={`${BACKEND_URL}/photo/${
                            card.author.username
                        }?${new Date().getTime()}`}
                        date={new Date(card.date).toDateString()}
                        colorTag="bg-akpica-marco text-akpica-black"
                        sizeTag="text-md"
                        link={`/${card._id}`}
                        linkTag={`/tags/${card.tags[0]}`}
                    />
                </div>
            ))}
        </div>
    );
};

export default GridCardsSection;
