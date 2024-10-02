import {
  FaRobot,
  FaJava,
  FaPenNib,
  FaGlobe,
  FaMusic,
  FaHeart,
  FaFilm,
  FaUtensils,
} from "react-icons/fa";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    name: "AI",
    icon: <FaRobot />,
    color: "text-blue-500 ",
    bgColor: "bg-blue-500/20 dark:bg-blue-500/40",
  },
  {
    name: "Java",
    icon: <FaJava />,
    color: "text-green-500",
    bgColor: "bg-green-500/20 dark:bg-green-500/40",
  },
  {
    name: "Writing",
    icon: <FaPenNib />,
    color: "text-red-500",
    bgColor: "bg-red-500/20 dark:bg-red-500/40",
  },
  {
    name: "World News",
    icon: <FaGlobe />,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20 dark:bg-yellow-500/40",
  },
  {
    name: "Music",
    icon: <FaMusic />,
    color: "text-purple-500",
    bgColor: "bg-purple-500/20 dark:bg-purple-500/40",
  },
  {
    name: "Health",
    icon: <FaHeart />,
    color: "text-pink-500",
    bgColor: "bg-pink-500/20 dark:bg-pink-500/40",
  },
  {
    name: "Movies",
    icon: <FaFilm />,
    color: "text-orange-500",
    bgColor: "bg-orange-500/20 dark:bg-orange-500/40",
  },
  {
    name: "Food",
    icon: <FaUtensils />,
    color: "text-teal-500",
    bgColor: "bg-teal-500/20 dark:bg-teal-500/40",
  },
];

const Categories = () => {
  return (
    <div className="grid grid-cols-2 gap-3 py-1 md:grid-cols-4 lg:grid-cols-8">
      {CATEGORIES.map((cat, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 * index }}
          key={index}
          className={`rounded-lg ${cat.bgColor ? `${cat.bgColor}` : "bg-white/20"} ${cat.color ? cat.color : "text-black"} flex flex-col items-center justify-center space-y-1 px-3 py-3`}
        >
          <div className={`text-3xl`}>{cat.icon}</div>
          <div className="flex items-center justify-start">{cat.name}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default Categories;
