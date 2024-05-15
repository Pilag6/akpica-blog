// import { Link } from "react-router-dom";
// import Logo from "@assets/logo-white.png";
// import { useContext } from "react";
// import { PostContext } from "@contexts/PostContext.jsx";

import CardsHero from "@components/CardsHero.jsx";
import Hero from "@components/Hero.jsx";
import Navbar from "@components/Navbar.jsx";

const Home = () => {
    // const { posts } = useContext(PostContext);

    return (
        <>
            <div className="bg-akpica-white min-h-screen">
                <Navbar />
                <Hero />
                <CardsHero />
            </div>
        </>
    );
};

export default Home;
