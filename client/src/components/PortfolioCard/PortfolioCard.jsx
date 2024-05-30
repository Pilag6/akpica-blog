import React from "react";
import { IoPlaySharp } from "react-icons/io5";
import { BsGithub } from "react-icons/bs";

const PortfolioCard = ({ imageUrl, image, altTitle, title, description, demoUrl, codeUrl }) => {
  return (
    <article className="flex flex-col items-center">
      {/* <div className="w-72 h-[410px] rounded-lg m-2 border-0 border-gray-800 pb-2 shadow-md"> */}
        <a href={imageUrl} target="_blank">
          <img
            src={image}
            alt={altTitle}
            className="w-44 h-28 rounded-t-lg object-cover object-center mb-5 hover:cursor-pointer hover:filter hover:contrast-50 transition ease-in-out duration-200"
          />
          {/* <h3 className="text-center text-gray-900 text-lg font-semibold uppercase mb-2 hover:underline hover:underline-offset-2 transition ease-in-out duration-200">
            {title}
          </h3> */}
        </a>
        {/* <p className="text-center text-gray-700 px-2 mb-2">{description}</p> */}

        {/* <div className="flex justify-around pt-4">
          <div className="w-28">
            <a
              href={codeUrl}
              target="_blank"
              className="flex items-center justify-center border-2 border-gray-600 text-gray-700 bg-gray-200 font-medium text-base p-1 transition ease-in-out duration-200 shadow-md hover:shadow-none"
            >
              Code <BsGithub className="ml-1" />
            </a>
          </div>

          {demoUrl && (
            <div className="w-36">
              <a
                href={demoUrl}
                target="_blank"
                className="flex items-center justify-center border-2 border-gray-600 text-gray-700 bg-gray-200 font-medium text-base p-1 transition ease-in-out duration-200 shadow-md hover:shadow-none"
              >
                Live Demo <IoPlaySharp className="ml-1" />
              </a>
            </div>
          )}
        </div> */}
      {/* </div> */}
    </article>
  );
};

export default PortfolioCard;
