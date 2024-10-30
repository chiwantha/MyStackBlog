/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import BlogDefault from "../assets/blog/1.jpg";
import ProfileDefault from "../assets/images/defaultprofile.png";
import StackColors from "../constants/colors";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const BlogCard = ({ blog }) => {
  const { currentUser } = useContext(AuthContext);

  const truncateIntro = (text, maxChars) => {
    return text.length > maxChars ? `${text.slice(0, maxChars)}...` : text;
  };

  const randomColorClass =
    StackColors[Math.floor(Math.random() * StackColors.length)];

  return (
    <div className="flex select-none h-full flex-col rounded-xl bg-white shadow-lg">
      <div className="rounded-lg bg-black">
        <img
          src={blog.img ? `/upload/blog/${blog.img}` : BlogDefault}
          alt={blog.title}
          className="h-[200px] w-full rounded-lg object-cover object-top"
          loading="lazy"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2 px-4 text-xs items-center justify-between">
        <span
          className={`rounded-lg ${randomColorClass ? randomColorClass : `bg-green-300`} px-4 py-1`}
        >
          {blog.category}
        </span>
        {currentUser && currentUser.id === blog.authorId && (
          <div className="right-0 gap-2 flex text-white text-[15px]">
            <span
              className={`rounded-lg bg-orange-600 px-2 py-1 hover:scale-110 transition-transform cursor-pointer`}
            >
              <FaEdit />
            </span>
            <span
              className={`rounded-lg bg-red-600 px-2 py-1 hover:scale-110 transition-transform cursor-pointer`}
            >
              <MdDelete />
            </span>
          </div>
        )}
      </div>
      <Link to={`/blog/${blog.slug}`}>
        <p className="px-4 pb-4 pt-4 text-center text-neutral-600 hover:underline">
          {blog.intro
            ? truncateIntro(blog.intro, 100)
            : truncateIntro("Discover the latest trends in technology...", 150)}
        </p>
      </Link>
      <div className="flex items-center justify-center gap-3 px-4 pb-3">
        <img
          src={
            blog.authorImg
              ? `/upload/profile/${blog.authorImg}`
              : ProfileDefault
          }
          className=" rounded-full w-[50px] h-[50px] object-cover"
        ></img>

        <div className="flex flex-col justify-start">
          <h3 className="text-lg font-bold text-orange-500 hover:underline">
            <Link to={`/profile/${blog.authorSlug}`}>
              {blog.authorName || "Author Name"}
            </Link>
          </h3>
          <h4 className="text-sm font-light">
            {blog.authorSubtitle || "Subtitle"}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
