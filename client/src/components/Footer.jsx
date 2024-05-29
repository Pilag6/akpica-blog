import { useContext } from "react";
import akpicaLogo from "@assets/logo-white.png";

import { FaGithubSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { PostContext } from "@contexts/PostContext";
import CardMoreFromUs from "@components/banners/MoreFromUs/CardMoreFromUs";
import BACKEND_URL from "@utils/backendUrl";

const Footer = () => {
  const { posts } = useContext(PostContext);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="w-full bg-akpica-black relative">
        <div className=" font-akpica-heading flex-wrap px-4 max-w-[1200px] mx-auto flex flex-col justify-center h-full ">
          <div>
            {/* <div className="absolute start-16 bottom-64 mb-4 lg:block lg:start-16 lg:bottom-64 lg:mb-4 lg:opacity-35 sm:static sm:flex sm:justify-center sm:mt-6 sm:h-24 sm:opacity-35">
              <img src={akpicaLogo} className="h-48 lg:h-48 sm:h-24 opacity-35" />
            </div> */}
            <div className="static flex justify-center opacity-45 start-16 bottom-64 mb-12 lg:absolute lg:block lg:start-16 lg:bottom-64 lg:mb-12 lg:opacity-45 sm:static sm:flex sm:justify-center sm:mt-6 sm:h-24 sm:opacity-45">
              <img src={akpicaLogo} className="h-48 opacity-45" />
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowwrap gap-6 py-20">
            <div className="flex-1 mb-8 md:mb-0">
              <a className=" block mb-7">
                <h2 className="text-3xl cursor:text font-bold text-akpica-white">
                  Akpica Blog
                </h2>
              </a>
              <p className="text-lg font-semibold text-akpica-white">
                Akpica Blog is your go-to source for cutting-edge web
                development insights, tutorials, and industry trends. Our
                mission is to empower developers of all levels with the
                knowledge and tools needed to excel in the ever-evolving world
                of web technology.
              </p>
              <h3 className="text-3xl font-bold text-akpica-white mt-5">
                Follow Us:
              </h3>
              <div className="flex gap-3 mt-5 ">
                <a
                  href="#"
                  className="border rounded-full text-2xl flex items-center justify-center transition-all duration-500 text-akpica-white border-gray-500/30 bg-transparent hover:border-akpica-white hover:bg-white hover:text-gray-950 focus:text-white h-11 w-11"
                >
                  <FaGithubSquare />
                </a>
                <a
                  href="#"
                  className="border rounded-full text-2xl flex items-center justify-center transition-all duration-500 text-akpica-white border-gray-500/30 bg-transparent hover:border-white hover:bg-white hover:text-gray-950 focus:text-white h-11 w-11"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="#"
                  className="border rounded-full text-2xl flex items-center justify-center transition-all duration-500 text-akpica-white border-gray-500/30 bg-transparent hover:border-white hover:bg-white hover:text-gray-950 focus:text-white h-11 w-11"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="border rounded-full text-2xl flex items-center justify-center transition-all duration-500 text-akpica-white  border-gray-500/30 bg-transparent hover:border-white hover:bg-white hover:text-gray-950 focus:text-white h-11 w-11"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            <div className="flex-1 md:flex-1/4 flex flex-col gap-5">
              <h5 className="text-3xl font-bold text-akpica-white">
                Quick links
              </h5>
              <div className="">
                <div>
                  <a
                    href="#"
                    className="text-lg cursor: pointer hover:underline-offset-8 hover:underline transition transform active:text-akpica-pastel font-semibold text-akpica-white"
                  >
                    Clients
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="text-lg cursor: pointer hover:underline-offset-8 hover:underline transition transform active:text-akpica-pastel font-semibold text-akpica-white"
                  >
                    Case Studies
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="text-lg cursor: pointer hover:underline-offset-8 hover:underline transition transform active:text-akpica-pastel font-semibold text-akpica-white"
                  >
                    Privacy Policy
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="text-lg cursor: pointer hover:underline-offset-8 hover:underline transition transform active:text-akpica-pastel font-semibold text-akpica-white"
                  >
                    Gallery
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="text-lg cursor: pointer hover:underline-offset-8 hover:underline transition transform active:text-akpica-pastel font-semibold text-akpica-white"
                  >
                    FAQ
                  </a>
                </div>
              </div>
            </div>

            <div className=" flex-1 md:flex-1/4 flex flex-col gap-5">
              <h5 className="text-3xl font-bold text-akpica-white">Legal</h5>
              <div className="space-y-2">
                <div>
                  <a
                    href="#"
                    className="text-lg cursor: pointer hover:underline-offset-8 hover:underline transition transform active:text-akpica-pastel font-semibold text-akpica-white"
                  >
                    Terms & Condition
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="text-lg cursor: pointer hover:underline-offset-8 hover:underline transition transform active:text-akpica-pastel font-semibold text-akpica-white"
                  >
                    Cookie Policy
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="text-lg cursor: pointer hover:underline-offset-8 hover:underline transition transform active:text-akpica-pastel font-semibold text-akpica-white"
                  >
                    Feedback
                  </a>
                </div>
              </div>
            </div>

            <div className="flex-1 md:flex-1/4 flex flex-col gap-5">
              <h5 className="text-3xl font-bold text-akpica-white">
                Latest Posts
              </h5>
              <div className="flex flex-col gap-4">
                {posts &&
                  posts
                    .slice(0, 2)
                    .map((post) => (
                      <CardMoreFromUs
                        title={post.title}
                        key={post._id}
                        img={`${BACKEND_URL}/posts/photo/${encodeURIComponent(
                          post.title
                        )}?${new Date().getTime()}`}
                        tag={post.tags[0]}
                        author={post.author.username}
                        avatar={`${BACKEND_URL}/photo/${
                          post.author.username
                        }?${new Date().getTime()}`}
                        h2Color="text-akpica-white"
                        bottom="mt-auto"
                        authorColors={"text-akpica-white"}
                        link={`/${post._id}`}
                        linkTag={`/tags/${post.tags[0]}`}
                      />
                    ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap md:justify-between justify-center  gap-6 py-4 border-t akpica-white">
              <p className="text-base font-semibold text-akpica-white">
                {currentYear} © AKPICA. All rights reserved.
              </p>

              <p className="text-base font-semibold text-akpica-white">
                Terms and conditions apply
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
