import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaGithubSquare, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import CardMoreFromUs from "@components/banners/MoreFromUs/CardMoreFromUs";
import BACKEND_URL from "@utils/backendUrl";
import { PostContext } from "@contexts/PostContext";

const Footer = () => {
    const { posts } = useContext(PostContext);
    const currentYear = new Date().getFullYear();
    const sortedPosts = posts.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const socialLinks = [
        { href: "#", icon: <FaGithubSquare />, label: "GitHub" },
        { href: "#", icon: <FaXTwitter />, label: "Twitter" },
        { href: "#", icon: <FaFacebook />, label: "Facebook" },
        { href: "#", icon: <FaInstagram />, label: "Instagram" }
    ];

    const quickLinks = [
        { to: "/tags/frontend", label: "Frontend" },
        { to: "/tags/backend", label: "Backend" },
        { to: "/tags/uxui%20design", label: "UX/UI Design" },
        { to: "/tags/react", label: "React" },
        { to: "/tags/vue", label: "Vue" },
        { to: "/tags/angular", label: "Angular" },
        { to: "/tags/javascript", label: "Javascript"},
        { to: "/tags/node", label: "Node" },
        { to: "/tags/astro", label: "Astro" }
    ];

    const legalLinks = [
        { href: "/about", label: "About Us" },
        { href: "/about", label: "Contact Us" },
        { href: "#", label: "Career" }
    ];

    return (
        <footer className="w-full bg-akpica-black relative">
            <div className="font-akpica-heading flex-wrap px-4 max-w-[1200px] mx-auto flex flex-col justify-center h-full">
                <div className="flex flex-wrap gap-8 py-20 px-1">
                    <div className="md:w-[28%] w-full mb-8 md:mb-0">
                        <Link to="/" className="flex items-center mb-7">
                            <div className="mr-3">
                                <img
                                    src="/favicon.png"
                                    className="h-10"
                                    alt="Akpica Blog"
                                />
                            </div>
                            <h2 className="text-3xl cursor-pointer font-bold text-akpica-white">
                                Akpica Blog
                            </h2>
                        </Link>
                        <p className="text-lg font-semibold text-akpica-white">
                            Akpica Blog is your go-to source for cutting-edge
                            web development insights, tutorials, and industry
                            trends. Our mission is to empower developers of all
                            levels with the knowledge and tools needed to excel
                            in the ever-evolving world of web technology.
                        </p>
                        <h3 className="text-3xl font-bold text-akpica-white mt-5">
                            Follow Us:
                        </h3>
                        <div className="flex gap-3 mt-5">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    aria-label={link.label}
                                    className="border rounded-full text-2xl flex items-center justify-center transition-all duration-500 text-akpica-white border-gray-500/30 bg-transparent hover:border-akpica-white hover:bg-white hover:text-gray-950 focus:text-white h-11 w-11"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-5">
                        <h5 className="text-3xl font-bold text-akpica-white">
                            Quick links
                        </h5>
                        <div className="pl-4">
                            {quickLinks.map((link, index) => (
                                <div key={index}>
                                    <Link
                                        to={link.to}
                                        className="text-lg cursor-pointer hover:underline-offset-8 hover:underline transition transform active:text-akpica-pastel font-semibold text-akpica-white"
                                    >
                                        {link.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:flex-1 flex flex-col gap-5">
                        <h5 className="text-3xl font-bold text-akpica-white">
                            Company
                        </h5>
                        <div className="pl-4">
                            {legalLinks.map((link, index) => (
                                <div key={index}>
                                    <Link
                                        to={link.href}
                                        className="text-lg cursor-pointer hover:underline-offset-8 hover:underline transition transform active:text-akpica-pastel font-semibold text-akpica-white"
                                    >
                                        {link.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-5">
                        <h5 className="text-3xl font-bold text-akpica-white">
                            Latest Posts
                        </h5>
                        <div className="flex flex-col gap-4">
                            {sortedPosts.slice(0, 2).map((post) => (
                                <CardMoreFromUs
                                    key={post._id}
                                    title={post.title}
                                    img={`${BACKEND_URL}/posts/photo/${encodeURIComponent(
                                        post.title
                                    )}`}
                                    tag={post.tags[0]}
                                    author={post.author.username}
                                    avatar={`${BACKEND_URL}/photo/${
                                        post.author.username
                                    }`}
                                    h2Color="text-akpica-white"
                                    bottom="mt-auto"
                                    date={new Date(post.date).toDateString()}
                                    authorColors="text-akpica-white"
                                    link={`/${post._id}`}
                                    linkTag={`/tags/${post.tags[0]}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap md:justify-between justify-center gap-6 py-4 border-t text-akpica-white">
                    <p className="text-base font-semibold">
                        {currentYear} © AKPICA. All rights reserved.
                    </p>
                    <p className="text-base font-semibold">
                        General conditions | Cookies | Privacy Policy
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
