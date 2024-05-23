import CardHero from "./CardHero.jsx";

import { useContext } from "react";
import { PostContext } from "@contexts/PostContext.jsx";


const CardsHero = () => {

    let { posts } = useContext(PostContext);
    // console.log(posts);
    return (
        <div className="relative w-full -mt-20 z-20">
            <div className="max-w-[1200px] mx-auto flex justify-center items-center flex-wrap gap-6">
                {posts && posts.slice(0,3).map((card) => (
                    <CardHero
                        key={card._id}
                        bgImg={`http://localhost:3300/posts/photo/${encodeURIComponent(
                            card.title
                        )}?${new Date().getTime()}`}
                        tagName={card.tags}
                        title={card.title}
                        author={card.author.username}
                        avatar={`http://localhost:3300/photo/${
                            card.author.username
                        }?${new Date().getTime()}`}
                        date={new Date(card.date).toDateString()}
                        colorTag="bg-akpica-tomato"
                        sizeTag="text-sm"
                        width="w-96"
                        link={`/${card._id}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardsHero;
