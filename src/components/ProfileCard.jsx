import moment from "moment";
import { AuthContext } from "../context/authContext";
import { useContext, useMemo } from "react";
import ProfileDefault from "../assets/images/defaultprofile.png";
import { Link } from "react-router-dom";
import RegularBtn from "./RegularBtn";

/* eslint-disable react/prop-types */
const ProfileCard = ({ data, onList }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const colors = [
    "bg-red-300/50",
    "bg-blue-300/50",
    "bg-green-300/50",
    "bg-yellow-300/50",
    "bg-purple-300/50",
    "bg-pink-300/50",
    "bg-gray-300/50",
    "bg-slate-300/50",
    "bg-orange-300/50",
    "bg-cyan-300/50",
    "bg-violet-300/50",
    "bg-rose-300/50",
  ];

  // Memoize the random colors to avoid recalculating on each render
  const randomColorClass1 = useMemo(
    () => colors[Math.floor(Math.random() * colors.length)],
    [colors],
  );
  const randomColorClass2 = useMemo(
    () => colors[Math.floor(Math.random() * colors.length)],
    [colors],
  );

  const { currentUser, userlogout } = useContext(AuthContext);

  return (
    <div
      className="border border-slate-300/50 bg-slate-100 dark:border-slate-600/50
     dark:bg-slate-800 p-2 rounded-xl flex-col sm:flex-row flex gap-3 shadow-lg overflow-hidden"
    >
      {data.image ? (
        <img
          src={data.image}
          alt=""
          className={`${onList == 1 ? `w-full sm:w-[200px]` : `w-full sm:w-[320px]`} object-cover  aspect-square rounded-lg border-4 border-orange-500`}
        />
      ) : (
        <img
          src={ProfileDefault}
          alt=""
          className={`${onList == 1 ? `w-full sm:w-[200px]` : `w-full sm:w-[320px]`} object-cover aspect-square rounded-lg border-4 border-orange-500`}
        />
      )}

      <div className="w-full flex flex-col justify-center space-y-2">
        <div>
          {currentUser && currentUser.id === data.id && (
            <span
              className={`py-1 px-4 w-[70px] ${onList == 1 && "text-xs"} flex justify-center font-bold bg-green-500 text-white rounded-lg`}
            >
              YOU
            </span>
          )}
          <h2
            className={`${onList == 1 ? "text-2xl" : "text-3xl md:text-5xl"} font-bold text-orange-500 hover:border-b border-orange-300`}
          >
            <Link to={`/profile/${data.slug}`}>{data.name}</Link>
          </h2>
          <div className="text-neutral-500 dark:text-neutral-200">
            <span>{data.subtitle}</span>
            {" / "}
            <span>{moment(data.createdAt).fromNow()}</span>
          </div>
        </div>
        <hr className="dark:border-neutral-100/20" />
        <div
          className={`flex pt-1 ${onList == 1 ? "text-[15px]" : `text-3xl`} gap-2 dark:text-slate-200`}
        >
          {/* Tota; */}
          <div
            className={`min-w-[40px] py-2 px-4 min-h-[20px] space-y-1 rounded-lg ${randomColorClass1}`}
          >
            <div className="text-sm">Blogs</div>
            <div className="flex justify-center items-center font-bold">
              {data.blogcount}
            </div>
          </div>
          {/* Batch */}
          <div
            className={`min-w-[40px] py-2 px-4 min-h-[20px] space-y-1 rounded-lg ${randomColorClass2}`}
          >
            <div className="text-sm">Badge</div>
            <div className="flex justify-center items-center font-bold uppercase">
              {data.badge}
            </div>
          </div>
        </div>
        {onList != 1 && currentUser && currentUser.id === data.id && (
          <div className="space-y-3">
            <hr className="dark:border-neutral-100/20" />{" "}
            <div className="">
              <span onClick={userlogout}>
                <RegularBtn fill={1} label={"Logout"} />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
