import { LuEye, LuEyeOff } from "react-icons/lu";
import RegularBtn from "../../components/RegularBtn";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";

const RstPass = () => {
  const [isShow, setisShow] = useState(false);
  const checkuserdiv = document.getElementById("checkuserdiv");
  const reqotpdiv = document.getElementById("reqotpdiv");
  const checkotpdiv = document.getElementById("checkotpdiv");
  const setpassdiv = document.getElementById("setpassdiv");
  const backtoHome = document.getElementById("backtoHome");

  const [username, setUsername] = useState("");
  const [systemPoneNumber, setsystemPoneNumber] = useState("");
  const [userPoneNumber, setuserPoneNumber] = useState("");
  const [systemOtp, setSystemOtp] = useState("");
  const [userOtp, setuserOtp] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setrePassword] = useState("");

  const sendOtp = async (number, otp) => {
    const apiToken = "2102|xXnGJh3z6CBhVam9Jr3rgeD3M42iWLNh5iX7arqe"; // Replace with your API token
    const response = await axios.post(
      "https://sms.send.lk/api/v3/sms/send",
      {
        recipient: number,
        sender_id: "K-Chord Grp", // Replace with your sender ID or number
        message: `Your MY-STACK OTP is: ${otp}`, // Customize your message
      },
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: "application/json",
        },
      },
    );
    return response.data;
  };

  const checkUser = useMutation({
    mutationKey: ["checkuser"],
    mutationFn: async (username) => {
      return await makeRequest.post("/auth/ckeckuser", username);
    },
    onSuccess: (response) => {
      toast.success("User Found !");
      setsystemPoneNumber(response?.data?.[0]?.number);
      checkuserdiv.classList.add("hidden");
      reqotpdiv.classList.remove("hidden");
    },
    onError: (err) => {
      // Display error toast
      toast.error(err.response?.data || "user not found !");
      setsystemPoneNumber("");
    },
  });

  const handleCheckUserBtn = (e) => {
    e.preventDefault();
    if (!username) {
      toast.error("Username Cannot Be Empty !");
      return;
    } else {
      checkUser.mutate({ username: username });
    }
  };

  const getOpt = useMutation({
    mutationKey: ["genOtp"],
    mutationFn: async (number) => {
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      // Send the OTP using the SMS API
      const smsResponse = await sendOtp(number, otp);
      return { otp, smsResponse }; // Return OTP and SMS response
    },
    onSuccess: (response) => {
      // Show success message
      toast.success("OTP Sent to Your Number!");
      setSystemOtp(response.otp); // Store the generated OTP
      reqotpdiv.classList.add("hidden"); // Hide request OTP div
      checkotpdiv.classList.remove("hidden"); // Show check OTP div
    },
    onError: (err) => {
      // Display error toast in case of failure
      toast.error(err.response?.data || "OTP send Error!");
      setSystemOtp(""); // Clear OTP on error
    },
  });

  const handleGetOtp = (e) => {
    e.preventDefault();

    // Validation for phone number and system number
    if (!userPoneNumber) {
      toast.error("Number Cannot Be Empty!");
      return;
    } else if (!systemPoneNumber) {
      toast.error("Something Wrong with the System!");
      return;
    } else if (systemPoneNumber !== userPoneNumber) {
      toast.error("Doesn't Match!");
      return;
    } else {
      getOpt.mutate(systemPoneNumber); // Trigger the mutation with the phone number
    }
  };

  const handleCheckOtp = (e) => {
    e.preventDefault();

    if (!systemOtp) {
      toast.error("Something Wrong with the System !");
      return;
    } else if (!userOtp) {
      toast.error("Please Enter the OTP you Got to your phone number !");
      return;
    } else if (systemOtp != userOtp) {
      toast.error("Invalid Otp !");
      return;
    } else {
      checkotpdiv.classList.add("hidden");
      setpassdiv.classList.remove("hidden");
    }
  };

  const passMutate = useMutation({
    mutationKey: ["rstPwd"],
    mutationFn: async (pwd) => {
      return makeRequest.post("/auth/rstPassword", pwd);
    },
    onSuccess: (data) => {
      toast.success("Password Reset Successfully!");
      setpassdiv.classList.add("hidden"); // Hide request OTP div
      backtoHome.classList.remove("hidden"); // Show check OTP div
      console.log(data);
    },
    onError: (err) => {
      // Handle errors here
      const errorMessage =
        err.response?.data?.message || "Error resetting password!";
      toast.error(errorMessage);
    },
  });

  const handleResetPassword = (e) => {
    e.preventDefault();

    // Input validation
    if (!username) {
      toast.error("Username Missing!");
      return;
    }
    if (!password) {
      toast.error("Password Cannot Be Empty!");
      return;
    }
    if (!repassword) {
      toast.error("Re-entered Password Cannot Be Empty!");
      return;
    }
    if (password !== repassword) {
      toast.error("Passwords Don't Match!");
      return;
    }

    // Trigger the mutation
    passMutate.mutate({ username: username, password: password });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <div className="mx-4 flex max-w-4xl flex-wrap overflow-hidden rounded-xl shadow-xl">
        <div className="bg-slate-200 px-10 py-10 space-y-2">
          <h1 className="text-xl">RESET YOUR PASSWORD</h1>
          {/* checkuserdiv */}
          <div className="flex flex-wrap gap-2" id="checkuserdiv">
            <input
              type="text"
              placeholder="username"
              className="border-b border-blue-200 w-full px-4 py-2 outline-none focus:border-blue-600 md:py-2 rounded-xl"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
            <span className="w-full" onClick={handleCheckUserBtn}>
              <RegularBtn label={"Check"} width={"full"} />
            </span>
          </div>
          {/* reqotpdiv */}
          <div className="mt-3 space-y-2 hidden" id="reqotpdiv">
            <span className="text-neutral-400">
              Enter The Number Ends With{" "}
              <span className="text-orange-600">
                - {systemPoneNumber.slice(-4)}
              </span>
            </span>
            <input
              type="text"
              placeholder="078xxxXX80"
              className="border-b border-blue-200 w-full px-4 py-2 outline-none focus:border-blue-600 md:py-2 rounded-xl"
              name="number"
              value={userPoneNumber}
              onChange={(e) => {
                setuserPoneNumber(e.target.value);
              }}
            />
            <div className="" onClick={handleGetOtp}>
              <RegularBtn label={"Get OTP"} width={"full"} />
            </div>
          </div>
          {/* checkotpdiv */}
          <div className="mt-3 space-y-2 hidden" id="checkotpdiv">
            <span className="text-neutral-400">Enter The 6 Digit OTP</span>{" "}
            <input
              type="text"
              placeholder="XXXXXX"
              className="border-b border-blue-200 w-full px-4 py-2 outline-none focus:border-blue-600 md:py-2 rounded-xl"
              name="otp"
              value={userOtp}
              onChange={(e) => {
                setuserOtp(e.target.value);
              }}
            />
            <div onClick={handleCheckOtp}>
              <RegularBtn label={"Set New Password"} width={"full"} />
            </div>
          </div>
          {/* setpassdiv */}
          <div className="mt-3 space-y-2 hidden" id="setpassdiv">
            <div className="relative flex items-center justify-between">
              <input
                type={isShow ? "text" : "password"}
                placeholder="enter new password"
                className="w-full border-b border-blue-200 px-4 py-2 outline-none focus:border-blue-600 md:py-3 rounded-xl"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div
                className="absolute right-2 cursor-pointer rounded-full px-1"
                onClick={() => {
                  setisShow(!isShow);
                }}
              >
                {isShow ? <LuEyeOff /> : <LuEye />}
              </div>
            </div>
            <div className="relative flex items-center justify-between">
              <input
                type={isShow ? "text" : "password"}
                placeholder="confirm password"
                className="w-full border-b border-blue-200 px-4 py-2 outline-none focus:border-blue-600 md:py-3 rounded-xl"
                name="repassword"
                value={repassword}
                onChange={(e) => {
                  setrePassword(e.target.value);
                }}
              />
              <div
                className="absolute right-2 cursor-pointer rounded-full px-1"
                onClick={() => {
                  setisShow(!isShow);
                }}
              >
                {isShow ? <LuEyeOff /> : <LuEye />}
              </div>
            </div>
            <div onClick={handleResetPassword}>
              <RegularBtn label={"SAVE"} width={"full"} fill={1} />
            </div>
          </div>
          {/* backtoHome */}
          <div className=" hidden" id="backtoHome">
            <div className="flex flex-wrap gap-2 flex-col items-center">
              <h1 className="text-xl text-green-500">SUCCESS</h1>
              <Link to={"/login"}>
                <RegularBtn label={"Back to Login"} width={"full"} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RstPass;
