import StackButton from "./StackButton";
import BlogCard from "./BlogCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";

// eslint-disable-next-line react/prop-types
const CardPannel = ({ from, to, title, btntext, link, btn }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["postPannel"],
    queryFn: async () => {
      try {
        const res = await makeRequest.get("/blog/latest");
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  // console.log(data && data);

  return (
    <div className="space-y-3 ">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium dark:text-white">
          {title ? title : "Section Title"}
        </h1>
        {btn === undefined || btn === null || (btn !== 0 && btn !== "0") ? (
          <Link to={link ? link : "/feed"}>
            <StackButton label={btntext ? btntext : "View More"} fill={1} />
          </Link>
        ) : (
          <div className=""></div>
        )}
      </div>
      {error ? (
        `something went wrong : ${error}`
      ) : isLoading ? (
        <div className="w-full flex justify-center bg-transparent">
          <img
            src={
              "https://tamilnaducouncil.ac.in/wp-content/uploads/2018/10/loading-gif.gif"
            }
            alt="Loading..."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {data &&
            data.slice(from ? from : 0, to ? to : 3).map((blog) => (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                key={blog.id}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CardPannel;
