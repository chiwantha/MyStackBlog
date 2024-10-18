/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import BlogDefault from "../assets/blog/1.jpg";
import ProfileDefault from "../assets/images/defaultprofile.png";

const BlogCard = ({ blog }) => {
  const truncateIntro = (text, maxChars) => {
    return text.length > maxChars ? `${text.slice(0, maxChars)}...` : text;
  };

  const colors = [
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-gray-300",
    "bg-slate-300",
    "bg-orange-300",
    "bg-cyan-300",
    "bg-violet-300",
    "bg-rose-300",
  ];

  const randomColorClass = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="flex select-none flex-col rounded-xl bg-white shadow-lg">
      <div className="rounded-lg bg-black">
        <img
          src={blog.img ? `/upload/blog/${blog.img}` : BlogDefault}
          alt={blog.title}
          className="h-[200px] w-full rounded-lg object-cover object-top"
          loading="lazy"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2 px-4 text-xs">
        <span
          className={`rounded-lg ${randomColorClass ? randomColorClass : `bg-green-300`} px-4 py-1`}
        >
          {blog.category}
        </span>
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
