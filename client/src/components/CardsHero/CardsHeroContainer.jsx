import CardHero from "./CardHero.jsx";

import { useContext } from "react";

// Backend URL
import BACKEND_URL from "@utils/backendUrl";

// Context
import { PostContext } from "@contexts/PostContext.jsx";

const CardsHero = () => {
    let { posts } = useContext(PostContext);

    return (
        <div className="relative w-full -mt-20 z-20">
            <div className="max-w-[1200px] mx-auto flex justify-center items-center flex-wrap gap-6">
                {posts &&
                    posts
                        .slice(5, 8)
                        .map((card) => (
                            <CardHero
                                key={card._id}
                                bgImg={`${BACKEND_URL}/posts/photo/${encodeURIComponent(
                                    card.title
                                )}`}
                                tagName={card.tags[0]}
                                title={card.title}
                                author={card.author.username}
                                avatar={`${BACKEND_URL}/photo/${
                                    card.author.username
                                }`}
                                date={new Date(card.date).toDateString()}
                                colorTag="bg-akpica-tomato"
                                sizeTag="text-sm"
                                width="w-96"
                                link={`/${card.slug}`}
                                linkTag={`/tags/${card.tags[0]}`}
                                authorLink={`/author/${card.author.username}`}
                            />
                        ))}
            </div>
        </div>
    );
};

export default CardsHero;
