import { Link } from "react-router-dom";
import BlogDefault from "../assets/blog/1.jpg";
import { FaUser } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const BlogCard = ({ id, image, author, subtitle, intro }) => {
  const truncateIntro = (text, maxChars) => {
    if (text.length > maxChars) {
      return text.slice(0, maxChars) + "...";
    }
    return text;
  };

  return (
    <div className="flex select-none flex-col flex-wrap rounded-xl bg-white pb-4 pl-0 pr-0 pt-0 shadow-lg">
      <div className="rounded-lg bg-black">
        <img
          src={image ? image : BlogDefault}
          alt="Blog Image"
          className="h-[300px] w-full rounded-lg bg-white object-cover object-top"
        />
      </div>
      <Link to={`/blog/${id}`}>
        <p className="px-4 pb-3 pt-3 text-center font-medium text-neutral-600 hover:cursor-pointer hover:underline">
          {intro
            ? truncateIntro(intro, 150) // Adjust the character limit as needed
            : truncateIntro(
                `Discover the latest trends in technology, from AI advancements to software innovations. Stay ahead with insights on digital tools, coding practices, and tech solutions that shape the future of industries`,
                150,
              )}
        </p>
      </Link>
      <div className="flex items-center justify-center gap-3 px-4 pb-3">
        <div className="flex items-center justify-center rounded-full bg-orange-500 p-4 text-2xl text-white">
          <FaUser />
        </div>
        <div className="flex flex-col justify-start">
          <h3 className="text-lg font-bold text-orange-500 hover:cursor-pointer hover:underline">
            {author ? author : "Autour Name"}
          </h3>
          <h4 className="text-sm font-light">
            {subtitle ? subtitle : "SubTitle"}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
