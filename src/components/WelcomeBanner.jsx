import unity from "../assets/images/unity.png";
import tech from "../assets/images/tech.png";
import travel from "../assets/images/travel.png";
import read from "../assets/images/read.png";
import { FaSmile } from "react-icons/fa";

const WelcomeMessage = () => (
  <p className="text-justify text-neutral-600 dark:text-neutral-300">
    Welcome to MY-STACK! This is your go-to blog for tech insights, trends, and
    inspiration. Join me as we explore various topics, share experiences, and
    build a community. Feel free to dive into the latest posts, share your
    thoughts, and stay connected. Thank you for being here—let’s embark on this
    journey together!
  </p>
);

// eslint-disable-next-line react/jsx-key
const ICONS = [
  {
    icon: tech,
    color: "text-yellow-500",
  },
  {
    icon: unity,
    color: "text-black dark:text-white",
  },
  {
    icon: travel,
    color: "text-blue-500",
  },
  {
    icon: read,
    color: "text-green-600",
  },
];

const WelcomeBanner = () => {
  return (
    <div className="overflow-x-hidden rounded-xl border border-slate-300/50 bg-slate-100 dark:border-slate-600/50 dark:bg-slate-800">
      <div className="grid grid-cols-1 items-center gap-2 space-y-4 p-4 md:grid-cols-2 md:gap-10">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-blue-500">WELCOME</h1>
            <button
              className="cursor-pointer select-none rounded-full bg-black text-3xl text-yellow-300 hover:text-yellow-200"
              aria-label="Close"
            >
              <FaSmile />
            </button>
          </div>
          <WelcomeMessage />
        </div>
        <div className="">
          <div className="grid grid-cols-4 gap-5 text-7xl md:text-7xl">
            {ICONS.map((icon, index) => (
              <div
                key={index}
                className={`flex aspect-square items-center justify-center rounded-lg bg-white/20 ${icon.color ? icon.color : "text-black"} shadow-lg`}
              >
                <img src={icon.icon} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
