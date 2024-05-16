import FourCards from "./FourCards.jsx";

// images imports
import akiko from "../../../../../server/uploads/akiko.jpg";
import carlos from "../../../../../server/uploads/carlos.jpg";
import pila from "../../../../../server/uploads/Pila.jpg";

// ({ bgImage, category, title, author, avatar, date }) => {

const FourCardsContainer = () => {
  return (
   
      <div className="w-full mx-auto flex">
        <FourCards
          bgImage={"https://bit.ly/3QLDXNI"}
          category={"REACT"}
          title={"React Starter Blog"}
          avatar={carlos}
          author={"Carlos"}
          date={"May 16, 2024"}
        />

        <FourCards
          bgImage={"https://bit.ly/3UZFpyD"}
          category={"TAILWIND"}
          title={"Tailwind Starter Blog"}
          avatar={akiko}
          author={"Akiko"}
          date={"May 16, 2024"}
        />

        <FourCards
          bgImage={"https://bit.ly/3ymKhoz"}
          category={"ASTRO"}
          title={"Astro Starter Blog"}
          avatar={pila}
          author={"Pila"}
          date={"May 16, 2024"}
        />

        <FourCards
          bgImage={"https://bit.ly/3wAUhKu"}
          category={"CSS"}
          title={"CSS Starter Blog"}
          avatar={pila}
          author={"Pila"}
          date={"May 16, 2024"}
        />
      </div>
  
  );
};
export default FourCardsContainer;
