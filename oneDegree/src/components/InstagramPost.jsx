import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";

const InstagramPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const ACCESS_TOKEN =
    "IGAAdfPZCw6k9xBZAFlscUVBb0RoTzhjMHMyVVdKZAE43ZA25ZAS1dQZAW5ray0xaGxiNlVLeVhGS0lDSzZA0dl9FQ2xWQ0tNOWwyQ0JqMEd3NHhMNkRhY1FlQkdoMFBaSDZApc2RJZAmxCaWVJTFFfNE9YanlxZAEVVNzJ4RlItVFZApM1ZAoUQZDZD";

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const res = await axios.get(
          `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type&access_token=${ACCESS_TOKEN}`
        );

        console.log("Instagram API Response:", res.data);

        const filteredPosts = res.data.data.filter(
          (post) =>
            post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM"
        );
        setPosts(filteredPosts.slice(0, 6));
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstagramPosts();
  }, []);

  return (
    <div className="pb-5 mx-auto  px-4">
      <h2 className="text-3xl text-center mb-6 text-[#394731] font-libre">
        Instagram Page
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-500 col-span-full">
            Loading Instagram posts...
          </p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group w-full  h-auto max-w-[480px] mx-auto overflow-hidden rounded-lg shadow-md"
            >
              <img
                src={post.media_url}
                alt="Instagram Post"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <FaInstagram className="text-white text-4xl" />
              </div>
            </a>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No posts available.
          </p>
        )}
      </div>
    </div>
  );
};

export default InstagramPost;
