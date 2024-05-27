import { useContext } from "react";
import akpicaLogo from "@assets/logo-white.png";

import { FaGithubSquare } from "react-icons/fa";
import { BsMedium } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { PostContext } from "@contexts/PostContext";
import CardMoreFromUs from "@components/banners/MoreFromUs/CardMoreFromUs";
import BACKEND_URL from "@utils/backendUrl";

const Footer = () => {
    const { posts } = useContext(PostContext);

    return (
        <>
            <footer className="w-full bg-akpica-black relative">
                <div className=" font-akpica-heading py-4 max-w-[1200px] mx-auto flex flex-col justify-center h-[60vh] ">
                    <div>
                        <div className="absolute start-28 bottom-64 2x1:block">
                            <img src={akpicaLogo} className="h-28 opacity-55" />
                        </div>
                        {/* <div className="absolute end-80 -top-14 2x1:block hidden">
                <img src={akpicaLogo} alt="h-28 rotate-45 opacity-60" />
            </div> */}
                    </div>

                    <div className="grid md:grid-cols-4 grid-cols-1 gap-6 py-20">
                        <div className="">
                            <a className=" block mb-7" href="#">
                                <h2 className="text-3xl font-bold text-akpica-white">
                                    AK
                                    <span className="text-akpica-green">
                                        PI
                                    </span>
                                    <span className="text-akpica-marco">
                                        CA
                                    </span>
                                </h2>
                            </a>
                            <p className=" text-lg font-semibold text-akpica-white">
                                It's a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout.
                            </p>
                            <h3 className="text-3xl font-bold text-akpica-white mt-5">
                                Follow Us:
                            </h3>
                            <div className=" flex gap-3 mt-5 ">
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
                                    <BsMedium />
                                </a>
                                <a
                                    href="#"
                                    className="border rounded-full text-2xl flex items-center justify-center transition-all duration-500 text-akpica-white border-gray-500/30 bg-transparent hover:border-white hover:bg-white hover:text-gray-950 focus:text-white h-11 w-11"
                                >
                                    <FaLinkedin />
                                </a>
                                <a
                                    href="#"
                                    className="border rounded-full text-2xl flex items-center justify-center transition-all duration-500 text-akpica-white  border-gray-500/30 bg-transparent hover:border-white hover:bg-white hover:text-gray-950 focus:text-white h-11 w-11"
                                >
                                    <FaInstagram />
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <h5 className="text-3xl font-bold text-akpica-white">
                                Quick links
                            </h5>
                            <div className="space-y-2">
                                <div>
                                    <a
                                        href="#"
                                        className="text-lg font-semibold text-akpica-white hover:text-akpica-white-200 transition-all duration-500"
                                    >
                                        Clients
                                    </a>
                                    {/* fix this hover part in <a> elements*/}
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="text-lg font-semibold text-akpica-white hover:text-akpica-white-200 transition-all duration-500"
                                    >
                                        Case Studies
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="text-lg font-semibold text-akpica-white hover:text-akpica-white-200 transition-all duration-500"
                                    >
                                        Privacy Policy
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="text-lg font-semibold text-akpica-white hover:text-akpica-white-200 transition-all duration-500"
                                    >
                                        Gallery
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="text-lg font-semibold text-akpica-white hover:text-akpica-white-200 transition-all duration-500"
                                    >
                                        FAQ
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <h5 className="text-3xl font-bold text-akpica-white">
                                Legal
                            </h5>
                            <div className="space-y-2">
                                <div>
                                    <a
                                        href="#"
                                        className="text-lg font-semibold text-akpica-white hover:text-akpica-white-200 transition-all duration-500"
                                    >
                                        Terms & Condition
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="text-lg font-semibold text-akpica-white hover:text-akpica-white-200 transition-all duration-500"
                                    >
                                        Cookie Policy
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="text-lg font-semibold text-akpica-white hover:text-akpica-white-200 transition-all duration-500"
                                    >
                                        Feedback
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <div className="flex flex-col gap-5">
                                <h5 className="text-3xl font-bold text-akpica-white">
                                    Latest Posts
                                </h5>
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
                                                tag={post.tags}
                                                author={post.author.username}
                                                avatar={`${BACKEND_URL}/photo/${
                                                    post.author.username
                                                }?${new Date().getTime()}`}
                                                h2Color="text-akpica-white"
                                                bottom="mt-auto"
                                                authorColors={
                                                    "text-akpica-white"
                                                }
                                                link={`/${post._id}`}
                                                linkTag={`/tags/${post.tags}`}
                                            />
                                        ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="container">
                            <div className="flex flex-wrap md:justify-between justify-center items-center gap-6 py-6 border-t akpica-white">
                                <p className="text-base font-semibold text-akpica-white">
                                    {/* {document.write(new Date().getFullYear())} © All Rights */}
                                </p>
                                <div>
                                    <p className="text-base font-semibold text-akpica-white">
                                        Terms and conditions apply
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
