import profile from "../assets/leftbar/profile.png";
import write from "../assets/leftbar/write.png";
import feed from "../assets/leftbar/feed.png";
import author from "../assets/leftbar/author.png";
import gallery from "../assets/leftbar/gallery.png";
import about from "../assets/leftbar/about.png";
import how from "../assets/leftbar/how.png";
import chat from "../assets/leftbar/chat.png";
import { Link } from "react-router-dom";
import { useContext, useMemo } from "react";
import { AuthContext } from "../context/authContext";
import { useSidebar } from "../Context/SidebarContext";
import { motion } from "framer-motion";
import StackButton from "./StackButton";

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);
  const { isSidebarOpen } = useSidebar();

  const LEFT_BAR_USER_MENU = useMemo(
    () => [
      {
        separator: "Account",
      },
      {
        item: "Profile",
        icon: profile,
        path: currentUser ? `/profile/${currentUser.slug}` : "/login",
      },
      {
        item: "Write",
        icon: write,
        path: "/write",
      },
    ],
    [currentUser],
  );

  const LEFT_BAR_PUBLIC_MENU = useMemo(
    () => [
      {
        separator: "My Stack",
      },
      {
        item: "Feed",
        icon: feed,
        path: "/feed",
      },
      {
        item: "Authors",
        icon: author,
        path: "/authors",
      },
      {
        item: "Gallery",
        icon: gallery,
        path: "/gallery",
      },

      {
        separator: "Other",
      },
      {
        item: "AboutUs",
        icon: about,
        path: "/about",
      },
      {
        item: "How It Works",
        icon: how,
        path: "howtouse",
      },
      {
        item: "Tell Us",
        icon: chat,
        path: "/send",
      },
    ],
    [],
  );

  return (
    <div
      className={`scrollbar-hide ${isSidebarOpen ? "" : "hidden"} z-40 lg:sticky fixed bottom-0 md:top-[86px] top-[50px] lg:h-[calc(100vh-86px)] overflow-x-hidden overflow-y-scroll lg:block w-[300px]`}
      style={{ flex: 1 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="container my-3 flex rounded-xl bg-white px-5 pb-8 pt-3 dark:bg-[#222] border shadow-md border-slate-300/50 dark:border-slate-600/50"
      >
        <div className="space-y-5">
          {currentUser ? (
            LEFT_BAR_USER_MENU.map((item, index) =>
              item.separator ? (
                <div key={index}>
                  <div className="mb-2">
                    <hr className="border-neutral-200/10 dark:border-neutral-50/5" />
                  </div>
                  <span className="text-sm font-bold text-gray-500 dark:text-neutral-500">
                    {item.separator}
                  </span>
                </div>
              ) : (
                <div key={index}>
                  <Link to={item.path}>
                    <div className="flex items-center gap-4 hover:font-bold dark:text-white">
                      <img
                        src={item.icon}
                        alt="menuIco"
                        className="w-[40px] aspect-square rounded-full"
                      />
                      <span className="text-[15px]">{item.item}</span>
                    </div>
                  </Link>
                </div>
              ),
            )
          ) : (
            <div className="mt-[10px]">
              <Link to="/login">
                <StackButton label={"Log In"} />
              </Link>
            </div>
          )}
          {LEFT_BAR_PUBLIC_MENU.map((item, index) =>
            item.separator ? (
              <div key={index}>
                <div className="mb-2">
                  <hr className="border-neutral-200/10 dark:border-neutral-50/5" />
                </div>
                <span className="text-sm font-bold text-gray-500 dark:text-neutral-500">
                  {item.separator}
                </span>
              </div>
            ) : (
              <div key={index}>
                <Link to={item.path}>
                  <div className="flex items-center gap-4 hover:font-bold dark:text-white">
                    <img
                      src={item.icon}
                      alt="menuIco"
                      className="w-[40px] aspect-square rounded-full"
                    />
                    <span className="text-[15px]">{item.item}</span>
                  </div>
                </Link>
              </div>
            ),
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
