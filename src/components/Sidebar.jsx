import Friends from "../assets/leftbar/1.png";
import Groups from "../assets/leftbar/2.png";
import Market from "../assets/leftbar/3.png";
import Watch from "../assets/leftbar/4.png";
import Events from "../assets/leftbar/6.png";
import Gaming from "../assets/leftbar/7.png";
import Gallery from "../assets/leftbar/8.png";
import Videos from "../assets/leftbar/9.png";
import Messages from "../assets/leftbar/10.png";
import Tutorials from "../assets/leftbar/11.png";
// import Courses from "../assets/leftbar/12.png";
import Fund from "../assets/leftbar/13.png";
import { Link } from "react-router-dom";
import { useContext, useMemo } from "react";
import { AuthContext } from "../context/authContext";

// eslint-disable-next-line react-hooks/rules-of-hooks

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const LEFT_BAR_MENU = useMemo(() => [
    {
      separator: "Account",
    },
    {
      item: "Profile",
      icon: Friends,
      path: currentUser ? `/profile/${currentUser.slug}` : "/login",
    },
    {
      item: "Write",
      icon: Groups,
      path: "/write",
    },
    {
      item: "Settings",
      icon: Market,
      path: "/userSettings",
    },
    {
      item: "Dashboard",
      icon: Watch,
      path: "/userDashboard",
    },
    {
      item: "Author-Box",
      icon: Messages,
      path: "/authorbox",
    },
    {
      separator: "Common Links",
    },
    {
      item: "Feed",
      icon: Events,
      path: "/feed",
    },
    {
      item: "Authors",
      icon: Gaming,
      path: "/authors",
    },
    {
      item: "Support",
      icon: Gallery,
      path: "/contact",
    },
    {
      item: "AboutUs",
      icon: Videos,
      path: "/aboutus",
    },
    {
      separator: "Other",
    },
    {
      item: "How It Works",
      icon: Tutorials,
      path: "howtouse",
    },
    {
      item: "Donate",
      icon: Fund,
      path: "/donate",
    },
  ]);
  return (
    <div
      className="scrollbar-hide sticky bottom-0 top-[86px] hidden h-[calc(100vh-86px)] overflow-x-hidden overflow-y-scroll lg:block"
      style={{ flex: 1 }}
    >
      <div className="container my-3 flex rounded-xl bg-white/50 px-5 pb-8 pt-3 dark:bg-[#222]">
        <div className="space-y-5">
          {LEFT_BAR_MENU.map((item, index) =>
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
                    <img src={item.icon} alt="menuIco" />
                    <span className="text-[15px]">{item.item}</span>
                  </div>
                </Link>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
