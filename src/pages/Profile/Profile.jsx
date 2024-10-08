import { useContext } from "react";
import StackButton from "../../components/StackButton";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import BlogList from "../../components/BlogList";
import { motion } from "framer-motion";

const Profile = () => {
  const scrollToTop = async () => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // For smooth scrolling
    });
  };
  scrollToTop();
  const slug = useLocation().pathname.split("/")[2];
  const { userlogout, currentUser } = useContext(AuthContext);

  const { data, isSuccess } = useQuery({
    queryKey: ["userProfile", slug],
    queryFn: async () => {
      const res = await makeRequest.get(`/user/profile?slug=${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });

  return (
    <div className="my-3 space-y-6" style={{ flex: 4 }}>
      {isSuccess ? (
        data && (
          <>
            <div className="border border-slate-300/50 bg-slate-100 dark:border-slate-600/50 dark:bg-slate-800 p-2 rounded-xl flex gap-3">
              <img
                src={data && data[0].image}
                alt=""
                className="w-80 aspect-square rounded-lg border-4 border-orange-500"
              />

              <div className="w-full flex flex-col justify-center">
                <h2 className="text-5xl font-bold text-orange-500">
                  {data[0].name}
                </h2>
                <div className="">
                  <span>{data[0].subtitle}</span>
                  {" / "}
                  <span>{data[0].createdAt}</span>
                </div>
              </div>
            </div>

            <div
              className=""
              onClick={() => {
                userlogout();
              }}
            >
              <StackButton label={"Logout"} />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              trancition={{ duration: 0.6 }}
              className=""
            >
              <BlogList userId={data[0].id} />
            </motion.div>
          </>
        )
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};

export default Profile;
