/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import RegularBtn from "./RegularBtn";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Comment = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex flex-col w-full">
      {currentUser ? (
        <div className="flex flex-col sm:flex-row gap-2">
          <img
            src={currentUser.image}
            alt=""
            className="h-[35px] w-[35px] rounded-full border-dashed border-orange-400 object-cover object-center hover:border-2"
          />
          <textarea
            name="comment"
            id=""
            rows={3}
            maxLength={250}
            className="w-full rounded-lg p-2 dark:bg-slate-600 dark:border-slate-500 border"
            placeholder="Type Your Comment Here ...."
          ></textarea>

          <RegularBtn fill={1} label={<IoIosSend />} textSize={"3xl"} />
        </div>
      ) : (
        <div className="flex flex-col justify-center gap-2">
          <h3 className="dark:text-slate-300 text-neutral-700">
            Login First to Make a Comment
          </h3>
          <span>
            <Link to={"/login"}>
              <RegularBtn label={"Login"} />
            </Link>
          </span>
        </div>
      )}
      <br />

      <div className="py-2 flex flex-col sm:flex-row gap-4 ">
        <img
          src={"/"}
          alt=""
          className="h-[35px] w-[35px] rounded-full border-dashed border-orange-400 object-cover object-center hover:border-2"
        />
        <div className="flex flex-col ">
          <p className="text-neutral-700 dark:text-neutral-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a
            rutrum velit, eget commodo neque. Nullam a pharetra leo. Maecenas
            ullamcorper eget ligula in rutrum. Morbi facilisis ligula nulla, at
            egestas ante accumsan a.
          </p>
          <span className="text-neutral-500 dark:text-neutral-300">
            1 minute ago
          </span>
        </div>
        <span>
          <RegularBtn fill={1} label={<MdDelete />} textSize={"3xl"} />
        </span>
      </div>
      <div className="py-2 flex flex-col sm:flex-row gap-4 ">
        <img
          src={"/"}
          alt=""
          className="h-[35px] w-[35px] rounded-full border-dashed border-orange-400 object-cover object-center hover:border-2"
        />
        <div className="flex flex-col ">
          <p className="text-neutral-700 dark:text-neutral-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a
            rutrum velit, eget commodo neque. Nullam a pharetra leo. Maecenas
            ullamcorper eget ligula in rutrum. Morbi facilisis ligula nulla, at
            egestas ante accumsan a.
          </p>
          <span className="text-neutral-500 dark:text-neutral-300">
            1 minute ago
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
