import StackButton from "./StackButton";
import Loading from "./Loading";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import AuthorCard from "./AuthorCard";

// eslint-disable-next-line react/prop-types
const AuthorPannel = ({ title, btntext, link, btn }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["AuthorPannel"],
    queryFn: async () => {
      try {
        const res = await makeRequest.get(`/user/loadtop/`);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

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
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data &&
            data.map((blog) => (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                key={blog.id}
              >
                <AuthorCard data={blog} />
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AuthorPannel;
