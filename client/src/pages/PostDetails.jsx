import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import BACKEND_URL from "@utils/backendUrl";
import Header from "@components/Header/Header.jsx";
import Footer from "@components/Footer.jsx";
import { PostContext } from "@contexts/PostContext.jsx";
import CardTag from "@components/miniComponents/CardTag.jsx";
import AuthorDate from "@components/miniComponents/AuthorDate.jsx";
import CardMoreFromUs from "@components/banners/MoreFromUs/CardMoreFromUs.jsx";

// React Disqus Comments
import { DiscussionEmbed } from "disqus-react";

const PostDetails = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const { posts } = useContext(PostContext);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(
                    `${BACKEND_URL}/posts/slug/${slug}`
                );
                setPost(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPost();
    }, [slug]);

    if (!post) return <div>Loading...</div>;

    return (
      <div className="min-h-screen">
        <Header darkBackground={true} />
        <header
          className="h-[60vh]"
          style={{
            backgroundImage: `url(${BACKEND_URL}/posts/photo/${encodeURIComponent(
              post.title
            )})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></header>

        <main className="bg-akpica-white max-w-[1200px] mx-auto z-30 -mt-40 min-h-96 md:pl-16 px-6 md:pr-9 py-12 flex flex-col relative">
          <div className="flex flex-col md:w-3/4 gap-5 mb-12">
            <CardTag
              tag={post.tags[0]}
              size={"text-sm"}
              color={"bg-akpica-green text-akpica-white"}
              linkTag={`/tags/${post.tags[0]}`}
            />
            <h1 className="md:text-5xl text-3xl md:pr-12 bg-akpica-white font-[700] font-akpica-heading text-akpica-black">
              {post.title}
            </h1>

            <div className="flex items-center gap-5">
              <AuthorDate
                avatar={`${BACKEND_URL}/photo/${post.author.username}`}
                author={post.author.fullname}
                date={new Date(post.date).toDateString()}
                colors="text-akpica-black"
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:gap-0 gap-8">
            <div
              className="md:w-2/3 h-auto md:pr-12 md:border-r-4 md:border-akpica-green"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            />

            <aside className="flex-1 md:pl-4 sticky top-24 h-[calc(100vh-32px)] overflow-hidden-4/12">
              <h2 className="font-bold font-akpica-heading text-2xl mb-4">
                RECENT POSTS
              </h2>
              <div className="flex flex-col gap-8 ">
                {posts &&
                  posts
                    .slice(0, 4)
                    .map((article) => (
                      <CardMoreFromUs
                        key={article._id}
                        img={`${BACKEND_URL}/posts/photo/${encodeURIComponent(
                          article.title
                        )}`}
                        title={article.title}
                        tag={article.tags[0]}
                        avatar={`${BACKEND_URL}/photo/${article.author.username}`}
                        author={article.author.username}
                        date={new Date(article.date).toDateString()}
                        authorColors="text-akpica-black"
                        bottom="mt-auto"
                        link={`/${article.slug}`}
                        linkTag={`/tags/${article.tags[0]}`}
                      />
                    ))}
              </div>
            </aside>
          </div>
          <DiscussionEmbed
            className="mt-12 p-8 bg-[#FFFFFF]"
            shortname="akpica"
            config={{
              url: window.location.href,
              identifier: post._id,
              title: post.title,
            }}
          />
        </main>
        <Footer />
      </div>
    );
};

export default PostDetails;
