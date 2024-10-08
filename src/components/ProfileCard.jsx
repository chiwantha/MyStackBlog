import moment from "moment";
import { AuthContext } from "../context/authContext";
import { useContext, useMemo } from "react";
import RegularBtn from "./RegularBtn";
import { FaUser } from "react-icons/fa";

/* eslint-disable react/prop-types */
const ProfileCard = ({ data }) => {
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

  const { userlogout, currentUser } = useContext(AuthContext);

  return (
    <div className="border border-slate-300/50 bg-slate-100 dark:border-slate-600/50 dark:bg-slate-800 p-2 rounded-xl flex-col sm:flex-row flex gap-3 shadow-lg">
      {data.image ? (
        <img
          src={data.image}
          alt=""
          className="w-full sm:w-[320px] aspect-square rounded-lg border-4 border-orange-500"
        />
      ) : (
        <div className="flex items-center justify-center rounded-lg bg-orange-500  w-full sm:w-[480px] aspect-square text-9xl text-white">
          <FaUser />
        </div>
      )}

      <div className="w-full flex flex-col justify-center space-y-3">
        <div>
          {currentUser.id === data.id && (
            <span className="py-1 px-4 w-[70px] flex justify-center font-bold bg-green-500 text-white rounded-lg">
              YOU
            </span>
          )}
          <h2 className="text-3xl md:text-5xl font-bold text-orange-500">
            {data.name}
          </h2>
          <div className="text-neutral-500 dark:text-neutral-200">
            <span>{data.subtitle}</span>
            {" / "}
            <span>{moment(data.createdAt).fromNow()}</span>
          </div>
        </div>
        <hr className="dark:border-neutral-100/20" />
        <div className="flex pt-1 text-3xl gap-2 flex-wrap dark:text-slate-200">
          <div
            className={`min-w-[80px] py-2 px-4 min-h-[80px] space-y-1 rounded-lg ${randomColorClass1}`}
          >
            <div className="text-sm">Total Blogs</div>
            <div className="flex justify-center items-center font-bold">
              {data.blogcount}
            </div>
          </div>
          <div
            className={`min-w-[80px] py-2 px-4 min-h-[80px] space-y-1 rounded-lg ${randomColorClass2}`}
          >
            <div className="text-sm">Author Badge</div>
            <div className="flex justify-center items-center font-bold uppercase">
              {data.badge}
            </div>
          </div>
        </div>
        {currentUser.id === data.id && (
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
