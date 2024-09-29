import Friends from "../assets/leftbar/1.png";
import Groups from "../assets/leftbar/2.png";
import Market from "../assets/leftbar/3.png";
import Watch from "../assets/leftbar/4.png";
import Memories from "../assets/leftbar/5.png";
import Events from "../assets/leftbar/6.png";
import Gaming from "../assets/leftbar/7.png";
import Gallery from "../assets/leftbar/8.png";
import Videos from "../assets/leftbar/9.png";
import Messages from "../assets/leftbar/10.png";
import Tutorials from "../assets/leftbar/11.png";
import Courses from "../assets/leftbar/12.png";
import Fund from "../assets/leftbar/13.png";

const LEFT_BAR_MENU = [
  {
    separator: "Menu",
  },
  {
    item: "Friends",
    icon: Friends,
  },
  {
    item: "Groups",
    icon: Groups,
  },
  {
    item: "Market",
    icon: Market,
  },
  {
    item: "Watch",
    icon: Watch,
  },
  {
    item: "Memories",
    icon: Memories,
  },
  {
    separator: "Your Shortcuts",
  },
  {
    item: "Events",
    icon: Events,
  },
  {
    item: "Gaming",
    icon: Gaming,
  },
  {
    item: "Gallery",
    icon: Gallery,
  },
  {
    item: "Videos",
    icon: Videos,
  },
  {
    item: "Messages",
    icon: Messages,
  },
  {
    separator: "Other",
  },
  {
    item: "Tutorials",
    icon: Tutorials,
  },
  {
    item: "Courses",
    icon: Courses,
  },
  {
    item: "Fund",
    icon: Fund,
  },
];

const Sidebar = () => {
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
              <div
                key={index}
                className="flex items-center gap-4 hover:font-bold dark:text-white"
              >
                <img src={item.icon} alt="menuIco" />
                <span className="text-[15px]">{item.item}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
