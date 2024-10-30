import logo from "../assets/logo/mystacklogo.png";
import { useSidebar } from "../Context/SidebarContext";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/darkModeContext";

import StackButton from "./StackButton";
import { AuthContext } from "../context/authContext";
import ProfileDefault from "../assets/images/defaultprofile.png";
// import menu from "../assets/menu/menu.png";

const Navbar = () => {
  const { toggleSidebar, isSidebarOpen } = useSidebar();
  const { darkMode, toggle } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <nav
      className={`left-0 ${isSidebarOpen && `sticky`} right-0 top-0 z-50 bg-white backdrop-blur-xl dark:bg-[#222] md:sticky`}
    >
      {/* top nav bar */}
      <div className="mx-2 overflow-x-hidden overflow-y-hidden">
        <div className="mx-auto max-w-7xl py-2">
          <div className="flex items-center justify-between">
            {/* Nav Bar Logo */}
            <Link to="/home">
              <div className="w-20 select-none bg-clip-content">
                <img loading="lazy" src={logo} alt="nav-logo" />
              </div>
            </Link>

            {/*Default Navigation Menu*/}
            <div className="hidden items-center gap-5 md:flex">
              <ul className="flex gap-5 text-lg font-bold text-neutral-500 dark:text-white md:text-lg">
                {[
                  { text: "Home", path: "/home" },
                  { text: "Feed", path: "/feed" },
                  { text: "About Site", path: "/about" },
                  // { text: "Contact", path: "/contact" },
                ].map((link, index) => (
                  <Link key={index} to={link.path}>
                    <motion.li
                      initial={{ opacity: 0, scale: 0 }} // Start with 0 opacity and 0 scale
                      whileInView={{ opacity: 1, scale: 1 }} // Animate to full opacity and normal scale
                      transition={{
                        opacity: { duration: 1 },
                        scale: { duration: 0.6 },
                      }} // Set transition duration for both
                      className="cursor-pointer select-none hover:text-neutral-800 dark:hover:text-neutral-400"
                    >
                      {link.text}
                    </motion.li>
                  </Link>
                ))}
              </ul>
              <div
                onClick={toggle}
                className=" h-[35px] w-[35px] items-center justify-center hidden lg:flex rounded-full text-black dark:text-white"
              >
                {darkMode ? <DarkModeOutlinedIcon /> : <WbSunnyOutlinedIcon />}
              </div>
              {currentUser ? (
                <div className="flex items-center">
                  <Link to={`/profile/${currentUser.slug}`}>
                    {currentUser.image ? (
                      <img
                        src={
                          currentUser.image
                            ? `/upload/profile/${currentUser.image}`
                            : ProfileDefault
                        }
                        alt="UserImage"
                        className="h-[35px] w-[35px] rounded-full border-dashed border-orange-400 object-cover object-center hover:border-2"
                      />
                    ) : (
                      <div className="flex items-center justify-center rounded-full bg-orange-500  h-[35px] w-[35px] text-lg text-white">
                        <FaUser />
                      </div>
                    )}
                  </Link>
                </div>
              ) : (
                <div className="">
                  <Link to="/login">
                    <StackButton label={"Log In"} />
                  </Link>
                </div>
              )}
            </div>

            {/* toggle btn */}
            <motion.div
              initial={{ opacity: 0 }}
              whileTap={{ scale: 1.1, rotate: 20 }}
              whileInView={{ opacity: 1 }}
              transition={{
                opacity: { duration: 1 },
                type: "spring",
                stiffness: "400",
                damping: 10,
                duration: 0.2,
              }}
              className="flex items-center gap-4 lg:hidden"
            >
              <div className="text-black dark:text-white" onClick={toggle}>
                {darkMode ? <DarkModeOutlinedIcon /> : <WbSunnyOutlinedIcon />}
              </div>
              <div className="text-4xl text-green-500" onClick={toggleSidebar}>
                {isSidebarOpen ? <IoClose /> : <IoMenu />}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* down navigation suppoter for md-devices */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        whileInView={{ opacity: 1, height: "auto" }}
        transition={{ opacity: { duration: 0.6 }, height: { duration: 0.6 } }}
        className="bg-blue-70 hidden border-b-4 border-orange-700 bg-orange-500/70 backdrop-blur-md md:block"
      >
        <div className="mx-2">
          <div className="mx-auto max-w-7xl py-1">
            <div className="flex justify-between text-white">
              {[
                "Share Your Blogs",
                "Find Developer Resources",
                "Follow Top Devs",
                "Latest Tech News",
              ].map((detail, index) => (
                <motion.h4
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ opacity: { duration: 0.6 }, duration: 0.6 }}
                  key={index}
                  className="select-none"
                >
                  {detail}
                </motion.h4>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
