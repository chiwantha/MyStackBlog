import { Link, useLocation } from "react-router-dom";
import StackButton from "../../components/StackButton";
import Read from "../../components/Read";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import CardPannel from "../../components/CardPannel";
import { motion } from "framer-motion";
import Loading from "../../components/Loading";

const Blog = () => {
  const scrollToTop = async () => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // For smooth scrolling
    });
  };
  scrollToTop();
  const slug = useLocation().pathname.split("/")[2];

  const { data, isLoading, error } = useQuery({
    queryKey: ["singleblog", slug],
    queryFn: async () => {
      const res = await makeRequest.get(`/blog/single?slug=${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });

  return (
    <div className="my-3 space-y-3" style={{ flex: 4 }}>
      {/* Blog Header */}
      <div
        className="flex items-center justify-between rounded-xl border border-slate-300/50 bg-slate-100
       p-2 text-blue-500 dark:border-slate-600/50 dark:bg-slate-800"
      >
        <h2 className="text-xl font-bold">Happy to Share ...</h2>
        <Link to="/feed">
          <StackButton fill={1} label={"Back to Feed"} rounded={"lg"} />
        </Link>
      </div>

      {error ? (
        "Error : " + error
      ) : isLoading ? (
        <Loading />
      ) : (
        data && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            key={data[0].id}
            className=""
          >
            <Read blog={data[0]} />
          </motion.div>
        )
      )}

      {/* Related Blogs */}
      {isLoading ? (
        ""
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className=""
        >
          <CardPannel title={"Related Cards"} cat={data[0].category} />
        </motion.div>
      )}
    </div>
  );
};

export default Blog;
