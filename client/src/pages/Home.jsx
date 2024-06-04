// Components
import { Slogan } from "@components/banners/Slogan.jsx";
import CardsHero from "@components/CardsHero/CardsHeroContainer.jsx";
import CategoriesImg from "@components/banners/CategoriesImg/CategoriesImgContainer.jsx";
import Footer from "@components/Footer.jsx";
import FourCardsContainer from "@components/banners/BannerFourCards/FourCardsContainer.jsx";
import FrontBackUxContainer from "@components/banners/FrontBackUXContainer/FrontBackUxContainer.jsx";
import GridCardsSection from "@components/banners/GridCardsSection.jsx";
import Header from "@components/Header/Header.jsx";
import Hero from "@components/Hero.jsx";
import MoreFromUs from "@components/banners/MoreFromUs/MoreFromUsContainer.jsx";

const Home = () => {
    return (
        <>
            <div className="bg-akpica-white min-h-screen">
                <Header />
                <Hero />
                <CardsHero />
                <Slogan />

                <main>
                    <CategoriesImg />
                    <GridCardsSection />
                    <MoreFromUs />
                    <FourCardsContainer />
                    <FrontBackUxContainer />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Home;
