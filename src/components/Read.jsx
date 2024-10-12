/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaHeart, FaShareAlt, FaUser } from "react-icons/fa";
import BlogImg from "../assets/blog/2.png";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import Comment from "./Comment";

const Read = ({ blog }) => {
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

  // State to track if the blog is liked
  const [isLiked, setisLiked] = useState(false);

  // Assign a random background color for the category badge
  const randomColorClass = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="">
      <div className="space-y-3 overflow-hidden">
        {/* Blog Head */}
        <div className="space-y-1 rounded-xl bg-slate-200 px-2 py-4 dark:bg-slate-400/40">
          {/* Blog Details */}
          <div className="flex flex-col space-y-2 border-b dark:border-neutral-100/20 border-neutral-300 pb-2">
            <span className="dark:text-neutral-300 text-neutral-400">
              Title
            </span>
            <h1 className="text-wrap text-4xl font-bold uppercase leading-none dark:text-white">
              {blog.title}
            </h1>

            <div className="flex text-xs">
              <span
                className={`rounded-lg ${randomColorClass || `bg-green-300`} px-4 py-1`}
              >
                {blog.category}
              </span>
            </div>
            <span className="dark:text-neutral-300">{blog.createdAt}</span>
          </div>

          {/* Blog Author */}
          <div className="flex items-center pt-1 gap-2">
            {blog.authorImg ? (
              <img
                src={blog.authorImg}
                alt="UserImage"
                className="h-[50px] w-[50px] rounded-full border-orange-400 object-cover object-center border-2"
              />
            ) : (
              <div className="flex items-center justify-center rounded-full bg-orange-500  w-[50px] h-[50px] text-2xl text-white">
                <FaUser />
              </div>
            )}

            <div className="flex flex-col">
              <h5>
                <Link to={`/profile/${blog.authorSlug}`}>
                  <span className="font-bold uppercase hover:scale-105 hover:underline text-orange-400">
                    {blog.authorName}
                  </span>
                </Link>
              </h5>
              <span className="dark:text-neutral-300 text-xs text-neutral-500">
                {blog.authorSubtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div
          className="rounded-xl border border-neutral-200 shadow-md space-y-5 bg-slate-200/50 dark:bg-slate-200/80
         dark:border-slate-500  px-2 pt-2 pb-4"
        >
          <img
            src={blog.img ? `/upload/${blog.img}` : BlogImg}
            alt="blog image"
            className="rounded-lg w-full"
          />

          <br />
          <hr />

          <div
            className=""
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.content),
            }}
          />
        </div>

        {/* Blog Footer */}
        <div className="flex items-center rounded-xl bg-slate-200 p-2 dark:bg-slate-400/40">
          {/* Interactions */}
          <div className="flex items-center gap-4 text-3xl text-black dark:text-white">
            <FaHeart
              className={`${isLiked && "text-red-500"} cursor-pointer`}
              onClick={() => setisLiked(!isLiked)}
            />
            <FaShareAlt />
          </div>
        </div>

        <div className="flex items-center rounded-xl bg-slate-200 p-2 dark:bg-slate-400/40">
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default Read;
