/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState } from "react";
import LoginImg from "../../assets/blog/4.jpg";
import RegularBtn from "../../components/RegularBtn";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/authContext";

const login = () => {
  const [isShow, setisShow] = useState(false);
  const { userlogin } = useContext(AuthContext);
  const [err, seterr] = useState(null);
  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    username: "",
    password: "",
  });

  const handleInputs = (e) => {
    setinputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { username, password } = inputs;

    if (!username) {
      toast.error("Username Cannot be Empty");
      return;
    }

    if (!password) {
      toast.error("Password Cannot Be Empty");
      return;
    }

    try {
      await userlogin(inputs);
      navigate("/");
    } catch (err) {
      seterr(err.response.data);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <div className="mx-4 flex max-w-4xl flex-wrap overflow-hidden rounded-xl shadow-xl md:h-[600px]">
        {/* left */}
        <div
          className="flex flex-1 flex-col justify-center space-y-4 bg-black p-6 text-white md:space-y-6"
          style={{
            background: `linear-gradient(rgba(238, 90, 36, 0.9) , rgba(39,11,96,0.9)),url(${LoginImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-2xl font-bold md:text-6xl lg:text-7xl">
            STACK FOR SHARING
          </h1>
          <p className="text-[13px] md:text-[15px]">
            Welcome to My-Stack, your gateway to insightful articles and expert
            advice on tech, coding, and software development. Log in to stay
            connected, share ideas, and explore cutting-edge content tailored
            for developers. Let’s grow together, one stack at a time!
          </p>
          <div>
            <span className="text-sm">{`Dont't you have an Account ?`}</span>
          </div>
          <div>
            <Link to="/register">
              <RegularBtn label={"Register Now"} fill={1} />
            </Link>
          </div>
        </div>
        {/* right */}
        <div className="flex flex-1 flex-col justify-center gap-6 bg-white p-6">
          <h3 className="text-3xl font-medium text-blue-900 md:text-4xl">
            Login
          </h3>
          <form className="flex flex-col gap-4 md:gap-8">
            <input
              type="text"
              placeholder="username"
              className="border-b border-blue-200 px-4 py-2 outline-none focus:border-blue-600 md:py-3"
              name="username"
              onChange={handleInputs}
            />
            <div className="relative flex items-center justify-between">
              <input
                type={isShow ? "text" : "password"}
                placeholder="password"
                className="w-full border-b border-blue-200 px-4 py-2 outline-none focus:border-blue-600 md:py-3"
                name="password"
                onChange={handleInputs}
              />
              <div
                className="absolute right-0 cursor-pointer rounded-full px-1"
                onClick={() => {
                  setisShow(!isShow);
                }}
              >
                {isShow ? <LuEyeOff /> : <LuEye />}
              </div>
            </div>
          </form>
          {err && err}
          <div className="flex gap-3  flex-col flex-wrap">
            <div className="flex gap-3 flex-wrap">
              <div className="" onClick={handleLogin}>
                <RegularBtn label={"LogIn"} fill={1} />
              </div>
              <Link to="/home">
                <RegularBtn label={"Back to home"} />
              </Link>
            </div>
            <span>
              Fogot Password ?{" "}
              <Link to={"/reset"}>
                <span className="text-blue-500 font-bold">Yes, I Fogot !</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default login;
