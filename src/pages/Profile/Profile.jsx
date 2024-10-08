import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link, useLocation } from "react-router-dom";
import BlogList from "../../components/BlogList";
import { motion } from "framer-motion";
import ProfileCard from "../../components/ProfileCard";
import StackButton from "../../components/StackButton";

const Profile = () => {
  const scrollToTop = async () => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // For smooth scrolling
    });
  };
  scrollToTop();
  const slug = useLocation().pathname.split("/")[2];

  const { data, isSuccess } = useQuery({
    queryKey: ["userProfile", slug],
    queryFn: async () => {
      const res = await makeRequest.get(`/user/profile?slug=${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });

  return (
    <div className="my-3 space-y-3" style={{ flex: 4 }}>
      {isSuccess ? (
        data && (
          <>
            <ProfileCard data={data[0]} />

            {data[0].blogcount > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className=""
              >
                <BlogList userId={data[0].id} />
              </motion.div>
            ) : (
              <div className="bg-slate-200 flex items-center justify-center flex-col gap-2 rounded-lg px-2 py-10">
                <h1>You Dont Have Any Blogs</h1>
                <Link to={"/write"}>
                  <StackButton label={"Create One"} />
                </Link>
              </div>
            )}
          </>
        )
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};

export default Profile;
