// import { Link } from "react-router-dom";
// import Logo from "@assets/logo-white.png";
// import { useContext } from "react";
// import { PostContext } from "@contexts/PostContext.jsx";

import CardsHero from "@components/CardsHero/CardsHeroContainer.jsx";
import Hero from "@components/Hero.jsx";
import Header from "@components/Header/Header.jsx";
import CategoriesImg from "@components/banners/CategoriesImg.jsx";
import FourCardsContainer from "@components/banners/BannerFourCards/FourCardsContainer.jsx";
import MoreFromUs from "@components/banners/MoreFromUs/MoreFromUsContainer.jsx";
import GridCardsSection from "@components/banners/GridCardsSection.jsx";


const Home = () => {
    // const { posts } = useContext(PostContext);

    return (
        <>
            <div className="bg-akpica-white min-h-screen">
                <Header />
                <Hero />
                <CardsHero />

                <main>
                    <CategoriesImg />
                    <GridCardsSection />
                    <MoreFromUs />
                    <FourCardsContainer />
                
                </main>
            </div>
        </>
    );
};

export default Home;
