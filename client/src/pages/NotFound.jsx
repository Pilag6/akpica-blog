import { Link } from "react-router-dom";

// Components
import Header from "@components/Header/Header";
import Footer from "@components/Footer";

// Images
import notFound from "@assets/page-banner/404.png";

const NotFound = () => {

  return (
    <div className=" bg-akpica-white">
      <Header />
      <div className="py-[80px] flex flex-col">
        <hr />
        <div className="flex justify-center items-center gap-4 mb-4">
          <img src={notFound} alt="" className=" w-96" />
          <h2 className=" text-4xl font-bold">Houston, We Have a Problem</h2>
        </div>

        <p className=" text-center text-lg w-2/3 mx-auto my-8">
          It seems the page you're looking for has taken a detour into the
          digital galaxy. While we work on bringing it back, why not explore
          some of our amazing web development content? <br />
          Navigate through our featured posts and uncover some out-of-this-world
          tips and tutorials! 🚀🌌
        </p>
        <Link
          to={"/"}
          className="text-center w-fit m-auto p-4 bg-[#3F7BFF] text-akpica-white font-semibold hover:bg-[#2F5BFF] active:bg-[#3F7BFF]">
          Return to Home page
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
