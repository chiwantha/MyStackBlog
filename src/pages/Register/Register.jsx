import { useState } from "react";
import RegisterImg from "../../assets/blog/4.jpg";
import RegularBtn from "../../components/RegularBtn";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { Link } from "react-router-dom";

const Register = () => {
  const [isShow, setisShow] = useState(false);
  const [isConfirmShow, setisConfirmShow] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <div className="mx-4 flex max-w-4xl flex-wrap overflow-hidden rounded-xl shadow-xl md:h-[600px]">
        {/* left */}
        <div
          className="flex flex-1 flex-col justify-center space-y-4 bg-black p-6 text-white md:space-y-6"
          style={{
            background: `linear-gradient(rgba(238, 90, 36, 0.9) , rgba(39,11,96,0.9)),url(${RegisterImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-2xl font-bold md:text-6xl lg:text-7xl">
            STACK FOR SHARING
          </h1>
          <p className="text-[13px] md:text-[15px]">
            {`Join My-Stack today! Register to access insightful articles and
            expert advice on tech, coding, and software development. Share your
            knowledge, collaborate with other developers, and explore
            cutting-edge content. Let's grow together, one stack at a time!`}
          </p>
          <div>
            <span className="text-sm">{`Already have an account?`}</span>
          </div>
          <div>
            <Link to="/login">
              <RegularBtn label={"Login Now"} fill={1} />
            </Link>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-1 flex-col justify-center gap-5 bg-white p-6">
          <h3 className="text-3xl font-medium text-blue-900 md:text-4xl">
            Register
          </h3>
          <form className="flex flex-col gap-3 md:gap-8">
            <input
              type="email"
              placeholder="Email"
              className="border-b border-blue-200 px-4 py-2 outline-none focus:border-blue-600 md:py-3"
            />
            <div className="relative flex items-center justify-between">
              <input
                type={isShow ? "text" : "password"}
                placeholder="Password"
                className="w-full border-b border-blue-200 px-4 py-2 outline-none focus:border-blue-600 md:py-3"
              />
              <div
                className="absolute right-0 cursor-pointer rounded-full px-1"
                onClick={() => setisShow(!isShow)}
              >
                {isShow ? <LuEyeOff /> : <LuEye />}
              </div>
            </div>
            <div className="relative flex items-center justify-between">
              <input
                type={isConfirmShow ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full border-b border-blue-200 px-4 py-2 outline-none focus:border-blue-600 md:py-3"
              />
              <div
                className="absolute right-0 cursor-pointer rounded-full px-1"
                onClick={() => setisConfirmShow(!isConfirmShow)}
              >
                {isConfirmShow ? <LuEyeOff /> : <LuEye />}
              </div>
            </div>
          </form>
          <div>
            <RegularBtn label={"Let's Start"} fill={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
