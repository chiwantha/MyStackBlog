import { BLOG_CARDS } from "../../constants";
import { Link } from "react-router-dom";
import StackButton from "../../components/StackButton";
import BlogImg from "../../assets/blog/2.png";
import DISC from "../../constants/blog";
import CardSlider from "../../components/CardSlider";
import { FaHeart } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { useState } from "react";

const Blog = () => {
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

  const [isLiked, setisLiked] = useState(false);

  const randomColorClass = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="my-3 space-y-3" style={{ flex: 4 }}>
      <div
        className="flex items-center justify-between rounded-xl border border-slate-300/50 bg-slate-100
       p-2 text-blue-500 dark:border-slate-600/50 dark:bg-slate-800"
      >
        <h2 className="text-xl font-bold">Happy to Share ...</h2>
        <Link to="/feed">
          <StackButton fill={1} label={"Back to Feed"} rounded={"lg"} />
        </Link>
      </div>
      <div className="">
        {BLOG_CARDS.slice(0, 1).map((blog, index) => (
          <div key={index} className="space-y-3 overflow-hidden">
            {/* Blog Head */}
            <div className="space-y-1 rounded-xl bg-slate-200 px-2 py-4 dark:bg-slate-400/40">
              {/* Blog Details */}
              <div className="flex flex-col space-y-2 border-b dark:border-neutral-100/20 border-neutral-300 pb-2">
                <span className="dark:text-neutral-300 text-neutral-400">
                  Title
                </span>
                <h1 className="text-wrap text-4xl font-bold uppercase leading-none dark:text-white">
                  {blog.blogtitle}
                </h1>

                <div className="flex text-xs">
                  <span
                    className={`rounded-lg ${randomColorClass ? randomColorClass : `bg-green-300`} px-4 py-1`}
                  >
                    {blog.category}
                  </span>
                </div>
                <span className="dark:text-neutral-300">
                  Published on 2023-10-06
                </span>
              </div>

              {/* Blog Author */}
              <div className="flex items-center pt-1 gap-2">
                <img
                  src={`/profile/profile.png`}
                  alt="UserImage"
                  className="h-[40px] w-[40px] rounded-full border-orange-400 object-cover object-center border-2"
                />
                <div className="flex flex-col">
                  <h5>
                    <span className="font-bold uppercase hover:scale-105 hover:underline text-orange-400">
                      {blog.author}
                    </span>
                  </h5>
                  <span className="dark:text-neutral-300 text-xs text-neutral-500">
                    {blog.subtitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div
              className="rounded-xl border border-neutral-300 space-y-5 bg-slate-200/50
             dark:border-slate-500 dark:bg-slate-400/20 p-2"
            >
              <img src={BlogImg} alt="blog image" className="rounded-lg" />
              {DISC.map((disc, index) => (
                <p
                  key={index}
                  className="text-black dark:text-neutral-200 text-[15px] text-justify md:text-[20px]"
                >
                  {disc.discs}
                </p>
              ))}
            </div>
            {/* <div className="rounded-xl border-b border-neutral-300 bg-slate-200/50 py-20 dark:border-slate-500 dark:bg-slate-400/20"></div> */}

            {/* Blog Footer */}
            <div className="flex items-center rounded-xl bg-slate-200 p-2 dark:bg-slate-400/40">
              {/* intractions */}
              <div className="flex items-center gap-4 text-3xl text-black dark:text-white ">
                <FaHeart
                  className={`${isLiked && "text-red-500"} cursor-pointer`}
                  onClick={() => {
                    setisLiked(!isLiked);
                  }}
                />
                <FaShareAlt />
                <FaComment className="hidden" />
              </div>
            </div>

            <CardSlider title={"Related Blogs"} from={0} to={9} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
