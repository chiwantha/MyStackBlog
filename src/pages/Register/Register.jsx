/* eslint-disable no-useless-escape */
import { useState } from "react";
import RegisterImg from "../../assets/blog/4.jpg";
import RegularBtn from "../../components/RegularBtn";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import sucess from "../../assets/images/success.gif";

const Register = () => {
  const [isShow, setisShow] = useState(false);
  const regForm = document.getElementById("regForm");
  const successForm = document.getElementById("successReg");
  const queryClient = useQueryClient();
  // const [isConfirmShow, setisConfirmShow] = useState(false);

  const [inputs, setInputs] = useState({
    username: "",
    number: "",
    password: "",
    name: "",
    slug: "",
  });

  const generateSlug = (title) => {
    const timestamp = Date.now(); // Get current timestamp

    return `${
      title
        .toLowerCase() // Convert to lowercase
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-") // Replace multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, "") // Trim hyphens from start and end
    }-${timestamp}`; // Append timestamp
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
      slug: name === "name" ? generateSlug(value) : prev.slug, // Correct placement of slug update
    }));
  };

  const mutation = useMutation({
    mutationKey: ["RegisterUser"],
    mutationFn: async (newData) => {
      // Return axios post request to handle the response in onSuccess
      return await makeRequest.post("/auth/register", newData);
    },
    onSuccess: (response) => {
      // Show the success message from the server response
      toast.success(response.data || "Registration Successful!");
      regForm.classList.add("hidden");
      successForm.classList.remove("hidden");
      queryClient.invalidateQueries("userList");
    },
    onError: (err) => {
      // Handle and display error messages from the server
      const errorMessage = err.response?.data || "Registration Failed!";
      toast.error(errorMessage);
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    const { name, number, username, password, slug } = inputs;

    // Validate each field separately and show specific error messages
    if (!name) {
      toast.error("Name is required!");
      return;
    }

    if (!number) {
      toast.error("number is required!");
      return;
    }

    if (number.length !== 10) {
      toast.error("number nust have 10 numbers!");
      return;
    }

    if (!username) {
      toast.error("Username is required!");
      return;
    }

    if (!password) {
      toast.error("Password is required!");
      return;
    }

    if (!slug) {
      toast.error("Slug is required!");
      return;
    }

    // If all fields are valid, trigger the mutation
    mutation.mutate(inputs);
  };

  return (
    <div className="flex  h-screen items-center justify-center bg-slate-100">
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
          <p className="text-[13px] md:text-[15px] hidden md:block">
            {`Join My-Stack today! Register to access insightful articles and
            expert advice on tech, coding, and software development. Share your
            knowledge, collaborate with other developers, and explore
            cutting-edge content. Let's grow together, one stack at a time!`}
          </p>
          <p className="text-[13px] md:text-[15px] md:hidden">
            {`Join My-Stack to access expert tech advice, 
            coding tips, and insightful articles. Collaborate with
             developers and explore cutting-edge content!`}
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
          <div id="regForm" className="space-y-3 ">
            <h3 className="text-3xl font-medium text-blue-900 md:text-4xl">
              Register
            </h3>
            <form className="flex flex-col gap-3 md:gap-8">
              <input
                type="text"
                placeholder="name"
                className="border-b border-blue-200 px-4 py-2 outline-none focus:border-blue-600 md:py-3"
                name="name"
                onChange={handleInput}
                maxLength={100}
              />
              <input
                type="text"
                placeholder="078xxxXXXX"
                className="border-b border-blue-200 px-4 py-2 outline-none focus:border-blue-600 md:py-3"
                name="number"
                onChange={handleInput}
                maxLength={10}
              />
              <input
                type="text"
                placeholder="username"
                className="border-b border-blue-200 px-4 py-2 outline-none focus:border-blue-600 md:py-3"
                name="username"
                onChange={handleInput}
                maxLength={15}
              />
              <div className="relative flex items-center justify-between">
                <input
                  type={isShow ? "text" : "password"}
                  placeholder="password"
                  className="w-full border-b border-blue-200 px-4 py-2 outline-none focus:border-blue-600 md:py-3"
                  name="password"
                  onChange={handleInput}
                  maxLength={10}
                />
                <div
                  className="absolute right-0 cursor-pointer rounded-full px-1"
                  onClick={() => setisShow(!isShow)}
                >
                  {isShow ? <LuEyeOff /> : <LuEye />}
                </div>
              </div>
            </form>
            <br />
            <div onClick={handleClick} className="">
              <RegularBtn label={"Let's Start"} fill={1} />
            </div>
          </div>
          <div className="hidden" id="successReg">
            <div className="flex-col flex items-center justify-center ">
              <img src={sucess} alt="" />
              <div>
                <Link to="/login">
                  <RegularBtn label={"Back To Login"} fill={1} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
